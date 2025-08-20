import { useEffect, useState } from 'react';

interface ClipboardItem {
  type: string;
  data: string;
  size?: number;
  isImage?: boolean;
  isFile?: boolean;
}

interface ClipboardData {
  text: string;
  html: string | null;
  items: ClipboardItem[];
  hasRichText: boolean;
  hasHiddenData: boolean;
}

export function useClipboard() {
  const [clipboardData, setClipboardData] = useState<ClipboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 清理函数，确保事件监听器被移除
  const cleanup = (pasteHandler?: (e: ClipboardEvent) => void) => {
    if (pasteHandler) {
      document.removeEventListener('paste', pasteHandler);
    }
  };

  const readClipboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 检查是否支持navigator.clipboard API
      if (!navigator.clipboard) {
        throw new Error('当前浏览器不支持剪贴板API');
      }

      // 创建结果对象
      let result: ClipboardData = {
        text: '',
        html: null,
        items: [],
        hasRichText: false,
        hasHiddenData: false,
      };

      // 首先尝试使用现代的 clipboard.read() API 来获取所有数据
      try {
        const clipboardItems = await navigator.clipboard.read();
        console.log('获取到剪贴板项目:', clipboardItems);

        for (const clipboardItem of clipboardItems) {
          console.log('剪贴板项目类型:', clipboardItem.types);

          for (const type of clipboardItem.types) {
            try {
              const blob = await clipboardItem.getType(type);
              const isImage = type.startsWith('image/');
              const isFile = type.startsWith('application/') || type.includes('file');

              let data: string;
              let size = blob.size;

              if (isImage) {
                // 对于图片，转换为 base64
                const arrayBuffer = await blob.arrayBuffer();
                const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                data = `data:${type};base64,${base64}`;
              } else if (type.includes('text') || type.includes('html') || type.includes('json')) {
                // 对于文本类型，直接读取文本内容
                data = await blob.text();
              } else {
                // 对于其他二进制数据，也转换为 base64
                const arrayBuffer = await blob.arrayBuffer();
                const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                data = `data:${type};base64,${base64}`;
              }

              result.items.push({
                type,
                data,
                size,
                isImage,
                isFile
              });

              // 设置基本属性
              if (type === 'text/plain') {
                result.text = data;
              } else if (type === 'text/html') {
                result.html = data;
                result.hasRichText = true;
              } else if (type !== 'text/plain' && type !== 'text/html') {
                result.hasHiddenData = true;
              }

            } catch (typeError) {
              console.warn(`无法读取类型 ${type}:`, typeError);
            }
          }
        }

        // 如果成功获取数据，直接返回
        if (result.items.length > 0) {
          setClipboardData(result);
          setIsLoading(false);
          return;
        }
      } catch (readError) {
        console.warn('clipboard.read() 失败，尝试备用方法:', readError);
      }

      // 备用方法：使用传统的 readText API
      try {
        const text = await navigator.clipboard.readText();
        result.text = text;
        if (text) {
          result.items.push({ type: 'text/plain', data: text });
        }
      } catch (err) {
        console.warn('无法通过API直接读取剪贴板文本:', err);
      }

      // 设置超时处理
      const timeoutId = setTimeout(() => {
        console.log('剪贴板操作超时，尝试使用备用方法');
        // 如果有文本数据，至少返回这部分内容
        if (result.text || result.items.length > 0) {
          setClipboardData(result);
        } else {
          setError(
            '读取剪贴板超时，请确保允许网站访问剪贴板或手动粘贴（Ctrl+V/Cmd+V）'
          );
        }
        setIsLoading(false);
      }, 2000);

      // 使用粘贴事件来获取更多格式（作为最后的备用方法）
      const handlePaste = (e: ClipboardEvent) => {
        // 清除超时
        clearTimeout(timeoutId);

        // 防止默认行为
        e.preventDefault();
        e.stopPropagation();

        if (e.clipboardData) {
          // 重置结果（如果之前的方法已经获取了一些数据，保留它们）
          const newItems: ClipboardItem[] = [...result.items];

          // 检查文本内容
          const textData = e.clipboardData.getData('text/plain');
          if (textData && !result.text) {
            result.text = textData;
            if (!newItems.some(item => item.type === 'text/plain')) {
              newItems.push({ type: 'text/plain', data: textData });
            }
          }

          // 检查HTML内容
          const htmlContent = e.clipboardData.getData('text/html');
          if (htmlContent) {
            result.html = htmlContent;
            result.hasRichText = true;
            if (!newItems.some(item => item.type === 'text/html')) {
              newItems.push({ type: 'text/html', data: htmlContent });
            }
          }

          // 检查文件
          const files = e.clipboardData.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const reader = new FileReader();
              reader.onload = (event) => {
                const base64Data = event.target?.result as string;
                newItems.push({
                  type: file.type || 'application/octet-stream',
                  data: base64Data,
                  size: file.size,
                  isImage: file.type.startsWith('image/'),
                  isFile: true
                });
                result.items = newItems;
                result.hasHiddenData = true;
                setClipboardData({ ...result });
              };
              reader.readAsDataURL(file);
            }
          }

          // 检查所有可用的格式
          const formats = e.clipboardData.types || [];
          for (let i = 0; i < formats.length; i++) {
            const format = formats[i];
            if (format !== 'Files') { // Files 已经在上面处理了
              const data = e.clipboardData.getData(format);
              if (data && !newItems.some(item => item.type === format)) {
                newItems.push({ type: format, data });

                // 检查是否有隐藏数据（非标准文本/HTML格式）
                if (format !== 'text/plain' && format !== 'text/html') {
                  result.hasHiddenData = true;
                }
              }
            }
          }

          result.items = newItems;
        }

        // 设置最终结果
        setClipboardData(result);
        setIsLoading(false);

        // 移除事件监听器
        cleanup(handlePaste);
      };

      // 添加临时paste事件监听器
      document.addEventListener('paste', handlePaste);

      // 提示用户手动粘贴
      console.log('请按 Ctrl+V 或 Cmd+V 粘贴内容');

      // 尝试执行粘贴命令 (注意：此方法在许多现代浏览器中已被弃用)
      try {
        const success = document.execCommand('paste');
        if (!success) {
          console.log('自动粘贴失败，请手动按 Ctrl+V/Cmd+V');
        }
      } catch (e) {
        console.warn("execCommand('paste') 失败:", e);
      }

    } catch (err) {
      cleanup();
      setError(err instanceof Error ? err.message : '读取剪贴板失败');
      setIsLoading(false);
    }
  };

  // 组件卸载时清理事件监听器
  useEffect(() => {
    return () => {
      // 清理可能的任何事件监听器
      document.removeEventListener('paste', () => {});
    };
  }, []);

  return {
    clipboardData,
    isLoading,
    error,
    readClipboard,
  };
}
