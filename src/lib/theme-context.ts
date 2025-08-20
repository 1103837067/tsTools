import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * 主题类型定义
 */
type Theme = 'light' | 'dark' | 'system';

/**
 * 主题上下文接口
 */
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

/**
 * 主题上下文
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题提供者组件属性
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * 主题提供者组件
 * 管理应用的主题状态，支持亮色、暗色和系统主题
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从localStorage获取保存的主题，如果没有则使用默认主题
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;

    // 移除之前的主题类
    root.classList.remove('light', 'dark');

    let resolvedTheme: 'light' | 'dark';

    if (theme === 'system') {
      // 系统主题：根据用户系统偏好设置
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      resolvedTheme = systemTheme;
    } else {
      resolvedTheme = theme;
    }

    // 应用主题类
    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);

    // 保存主题到localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = () => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        setActualTheme(systemTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
};

/**
 * 使用主题的Hook
 * @returns 主题上下文对象
 * @throws 如果在ThemeProvider外使用会抛出错误
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme必须在ThemeProvider内使用');
  }

  return context;
};
