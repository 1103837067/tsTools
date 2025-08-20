import { ClipboardViewer } from '@/components/common/ClipboardViewer';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/clipboard')({
  component: ClipboardPage,
});

function ClipboardPage() {
  const { t } = useTranslation();

  // 根据当前语言设置页面标题
  useEffect(() => {
    document.title = t('clipboardPage.pageTitle');
  }, [t]);

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">{t('clipboardPage.title')}</h1>

      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('clipboardPage.instructions.title')}</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>{t('clipboardPage.instructions.step1')}</li>
          <li>{t('clipboardPage.instructions.step2')}</li>
          <li>{t('clipboardPage.instructions.step3')}</li>
          <li>{t('clipboardPage.instructions.step4')}</li>
        </ol>
      </div>

      <ClipboardViewer />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          {t('clipboardPage.notice.security')}{' '}
          {t('clipboardPage.notice.privacy')}
        </p>
      </div>
    </div>
  );
}
