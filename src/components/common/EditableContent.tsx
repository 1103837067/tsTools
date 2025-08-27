import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/useToast';
import { useTranslation } from '@/hooks/useTranslation';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface EditableContentProps {
  content: string;
  type: string;
  isImage?: boolean;
  isFile?: boolean;
}

export function EditableContent({ 
  content, 
  type,
  isImage = false 
}: EditableContentProps) {
  const { t } = useTranslation();
  const [editedContent, setEditedContent] = useState(content);

  const handleCopyWithMimeType = async () => {
    try {
      // 根据不同的 MIME 类型进行复制
      if (isImage && type.startsWith('image/') && editedContent.startsWith('data:')) {
        // 对于图片，尝试复制为 Blob
        try {
          const response = await fetch(editedContent);
          const blob = await response.blob();
          const clipboardItem = new ClipboardItem({
            [type]: blob
          });
          await navigator.clipboard.write([clipboardItem]);
          toast.success(t('clipboard.edit.copiedAsImage'));
          return;
        } catch (err) {
          console.warn('复制为图片失败，降级为文本:', err);
        }
      }

      // 尝试以原始 MIME 类型复制
      if (type && type !== 'text/plain') {
        try {
          const blob = new Blob([editedContent], { type });
          const clipboardItem = new ClipboardItem({
            [type]: blob,
            'text/plain': new Blob([editedContent], { type: 'text/plain' })
          });
          await navigator.clipboard.write([clipboardItem]);
          toast.success(t('clipboard.edit.copiedWithType', { type }));
          return;
        } catch (err) {
          console.warn('复制为原始类型失败，降级为文本:', err);
        }
      }

      // 降级为文本复制
      await navigator.clipboard.writeText(editedContent);
      toast.success(t('clipboard.edit.copied'));
    } catch (err) {
      toast.error(t('clipboard.edit.copyError'));
      console.error('复制失败:', err);
    }
  };

    // 图片内容的特殊处理
  if (isImage && content.startsWith('data:image')) {
    return (
      <div className="space-y-3">
        <div className="flex justify-center">
          <img 
            src={editedContent} 
            alt={t('clipboard.content.imageAlt')} 
            className="max-h-48 max-w-full rounded border object-contain"
            onError={(e) => {
              console.error('图片加载失败:', e);
            }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t('clipboard.content.viewBase64')} ({editedContent.length} {t('clipboard.content.characters')})
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyWithMimeType}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {t('clipboard.edit.copy')} {type}
            </Button>
          </div>
          
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[120px] font-mono text-xs"
            placeholder={t('clipboard.edit.placeholder')}
          />
        </div>
      </div>
    );
  }

  // 文本内容的处理 - 直接可编辑
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground">
          {editedContent.length} {t('clipboard.content.characters')}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyWithMimeType}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          {t('clipboard.edit.copy')} {type}
        </Button>
      </div>
      
      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="min-h-[120px] font-mono text-xs"
        placeholder={t('clipboard.edit.placeholder')}
      />
    </div>
  );
}
