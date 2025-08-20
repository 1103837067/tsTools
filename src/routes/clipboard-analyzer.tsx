import { ClipboardViewer } from '@/components/common/ClipboardViewer';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/clipboard-analyzer')({
  component: ClipboardAnalyzerPage,
});

function ClipboardAnalyzerPage() {
  const { t } = useTranslation();

  // 根据当前语言设置页面标题
  useEffect(() => {
    document.title = t('剪贴板检测器');
  }, [t]);

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">剪贴板内容检测器</h1>

      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">使用说明</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>复制任何内容到您的剪贴板（文本、HTML、图片等）</li>
          <li>点击下方"检测剪贴板"按钮</li>
          <li>
            或直接按{' '}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">
              Ctrl
            </kbd>
            +
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">
              V
            </kbd>{' '}
            粘贴内容
          </li>
          <li>查看解析后的剪贴板内容，包括各种格式</li>
        </ol>
      </div>

      <ClipboardViewer />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          注意：由于浏览器安全限制，某些内容可能需要您手动粘贴（Ctrl+V 或
          ⌘+V）。 此工具仅用于检测剪贴板内容，不会上传或存储您的数据。
        </p>
      </div>
    </div>
  );
}
