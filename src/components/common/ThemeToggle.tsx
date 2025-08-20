import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/theme-context';
import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';

/**
 * 主题切换按钮组件
 * 提供亮色、暗色和系统主题切换功能
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  /**
   * 获取当前主题对应的图标
   */
  const getCurrentIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
    return actualTheme === 'dark' ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    );
  };

  /**
   * 获取主题选项配置
   */
  const themeOptions = [
    {
      value: 'light' as const,
      label: '亮色',
      icon: <Sun className="mr-2 h-4 w-4" />,
    },
    {
      value: 'dark' as const,
      label: '暗色',
      icon: <Moon className="mr-2 h-4 w-4" />,
    },
    {
      value: 'system' as const,
      label: '跟随系统',
      icon: <Monitor className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="切换主题"
        >
          {getCurrentIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {themeOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`cursor-pointer ${
              theme === option.value ? 'bg-accent' : ''
            }`}
          >
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
