import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@tanstack/react-router';
import { Home } from 'lucide-react';

/**
 * 404 页面组件
 * 当用户访问不存在的路由时显示
 */
export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-69px)] flex flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-8xl font-bold">{t('notFound.title')}</h1>
      <p className="text-muted-foreground">{t('notFound.message')}</p>

      <Button asChild>
        <Link to="/">
          <Home className="w-4 h-4 mr-2" />
          {t('notFound.backHome')}
        </Link>
      </Button>
    </div>
  );
}
