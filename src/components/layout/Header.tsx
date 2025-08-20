import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import logo from '../../logo.svg';
import LanguageToggle from '../common/LanguageToggle';
import ThemeToggle from '../common/ThemeToggle';

/**
 * Header组件
 * 在flex布局中的顶部固定区域
 */
export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="w-full h-full p-4 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <nav className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
          aria-label={t('header.backToHome')}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-8 animate-[spin_20s_linear_infinite]"
          />
          {t('common.home')}
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
