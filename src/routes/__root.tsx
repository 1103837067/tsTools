import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useRef } from 'react';

import NotFound from '@/components/common/NotFound';
import Header from '@/components/layout/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScrollToTop from '@/components/ui/ScrollToTop';

/**
 * 根路由组件
 * 包含固定的Header、主要内容区域和滚动到顶部按钮
 */
const RootComponent = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
