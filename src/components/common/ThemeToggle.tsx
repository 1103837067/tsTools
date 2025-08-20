import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/lib/theme-context';
import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';

/**
 * 主题切换按钮组件
 * 提供亮色、暗色和系统主题切换功能
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useTranslation();

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
      label: t('theme.light'),
      icon: <Sun className="mr-2 h-4 w-4" />,
    },
    {
      value: 'dark' as const,
      label: t('theme.dark'),
      icon: <Moon className="mr-2 h-4 w-4" />,
    },
    {
      value: 'system' as const,
      label: t('theme.system'),
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
          aria-label={t('theme.toggle')}
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
