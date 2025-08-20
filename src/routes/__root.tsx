import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useEffect, useRef } from 'react';

import NotFound from '@/components/common/NotFound';
import Header from '@/components/layout/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * 根路由组件
 * 包含固定的Header、主要内容区域和滚动到顶部按钮
 */
const RootComponent = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // 设置默认页面标题
  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

  return (
    <div className="h-screen flex flex-col ">
      {/* 固定高度的Header */}
      <div className="h-[69px] flex-none">
        <Header />
      </div>

      {/* 主要内容区域,占满剩余高度 */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <Outlet />
        </ScrollArea>
      </div>

      {/* 滚动到顶部按钮，传递ScrollArea的ref */}
      <ScrollToTop scrollAreaRef={scrollAreaRef} />

      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
