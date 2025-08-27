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
    document.title = t('clipboardPage.pageTitle');
  }, [t]);

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">{t('clipboardPage.title')}</h1>



      <ClipboardViewer />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          {t('clipboardPage.notice.securityAlt')}{' '}
          {t('clipboardPage.notice.privacy')}
        </p>
      </div>
    </div>
  );
}
