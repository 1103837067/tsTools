import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface ScrollToTopProps {
  scrollAreaRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * 滚动到顶部按钮组件
 * 支持ScrollArea和普通window滚动
 */
export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollAreaRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  // 检查滚动位置的函数
  const checkScrollPosition = useCallback((element: HTMLElement | Window) => {
    let scrollTop = 0;

    if (element instanceof Window) {
      scrollTop = window.pageYOffset;
    } else {
      scrollTop = element.scrollTop;
    }

    setIsVisible(scrollTop > 300);
  }, []);

  // 监听滚动事件
  useEffect(() => {
    let scrollElement: HTMLElement | Window = window;

    // 如果有ScrollArea的ref，使用它；否则使用window
    if (scrollAreaRef?.current) {
      const scrollAreaElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      ) as HTMLElement;
      if (scrollAreaElement) {
        scrollElement = scrollAreaElement;
      }
    }

    const handleScroll = () => {
      checkScrollPosition(scrollElement);
    };

    // 添加滚动监听器
    scrollElement.addEventListener('scroll', handleScroll);

    // 初始检查
    checkScrollPosition(scrollElement);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [scrollAreaRef, checkScrollPosition]);

  /**
   * 滚动到顶部的函数
   */
  const scrollToTop = useCallback(() => {
    if (scrollAreaRef?.current) {
      const scrollAreaElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      ) as HTMLElement;
      if (scrollAreaElement) {
        scrollAreaElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return;
      }
    }

    // 回退到window滚动
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [scrollAreaRef]);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-6 right-6 z-40 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
      aria-label="滚动到顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTop;
