import { Button } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Clipboard } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { t } = useTranslation();

  // 根据当前语言设置页面标题
  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="mb-8 text-4xl font-bold">工具集</h1>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Link to="/clipboard-analyzer" className="block">
          <Button variant="outline" className="h-32 w-full flex-col gap-4">
            <Clipboard className="h-8 w-8" />
            <div>
              <div className="text-lg font-medium">剪贴板检测器</div>
              <div className="text-xs text-muted-foreground">
                检测剪贴板中的文本、样式和隐藏数据
              </div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
