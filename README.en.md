# React + TypeScript + Theme Toggle + Multi-language Template

**Language / 语言**: English | [中文简体](./README.md)

A modern React application template with complete theme switching functionality and multi-language support.

## 🚀 Quick Start

### Using this template

1. **Click "Use this template" button** or clone the repository:

```bash
git clone https://github.com/1103837067/vite-react-tanstackRouter-shadcn-eslint-prettier-template.git
cd vite-react-tanstackRouter-shadcn-eslint-prettier-template
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start development server**:

```bash
pnpm dev
```

4. **Visit the application**: Open [http://localhost:3000](http://localhost:3000)

## ✨ Key Features

### 🎨 Theme Switching System

- **☀️ Light Mode**: Clean light theme
- **🌙 Dark Mode**: Eye-friendly dark theme
- **💻 Follow System**: Automatically follows OS theme settings
- **Persistent Storage**: Theme settings automatically saved to local storage
- **Smooth Transitions**: Smooth animation effects when switching themes

### 🌐 Multi-language Support

- **Simplified Chinese**: Complete Chinese interface
- **English**: Complete English interface
- **Auto Detection**: Automatically selects based on browser language
- **Persistent Storage**: Language settings automatically saved to local storage
- **Type Safety**: Complete TypeScript type support

### 🛠️ Tech Stack

- **React 19** - Latest version of React framework
- **TypeScript** - Type-safe JavaScript
- **TanStack Router** - Modern routing system
- **shadcn/ui** - High-quality UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **i18next** - Powerful internationalization framework
- **Vite** - Fast build tool

## 🎯 How to Use

### Theme Switching

1. **Find the theme button**: Located in the Header at the top right of the page
2. **Click to switch**: Click the button to open the theme selection menu
3. **Select theme**:
   - Light ☀️
   - Dark 🌙
   - Follow System 💻

### Language Switching

1. **Find the language button**: Located in the Header at the top right of the page (globe icon)
2. **Click to switch**: Click the button to open the language selection menu
3. **Select language**:
   - Simplified Chinese
   - English

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   │   └── Header.tsx   # Page header component
│   └── common/          # Common components
│       ├── ThemeToggle.tsx    # Theme toggle button
│       └── LanguageToggle.tsx # Language toggle button
├── lib/                 # Utility libraries
│   ├── theme-context.tsx # Theme context management
│   └── i18n.ts          # Internationalization configuration
├── locales/             # Multi-language files
│   ├── zh-CN.json       # Chinese translations
│   └── en-US.json       # English translations
├── types/               # Type definitions
│   └── i18next.d.ts     # i18next type definitions
├── hooks/               # Custom Hooks
│   └── useTranslation.ts # Translation Hook
├── routes/              # Route pages
│   ├── __root.tsx       # Root route
│   └── index.tsx        # Home page
├── styles.css           # Global styles and theme variables
└── main.tsx            # Application entry point
```

## 🔧 Custom Configuration

### Adding New Languages

1. **Create translation file**:

```bash
# Create new language files in src/locales/ directory
src/locales/fr-FR.json  # French
src/locales/ja-JP.json  # Japanese
```

2. **Update i18n configuration**:

```typescript
// src/lib/i18n.ts
import frFR from '../locales/fr-FR.json';

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
  'fr-FR': { translation: frFR }, // Add new language
};
```

3. **Update language toggle component**:

```typescript
// src/components/common/LanguageToggle.tsx
const languages = [
  { code: 'zh-CN', name: '中文简体' },
  { code: 'en-US', name: 'English' },
  { code: 'fr-FR', name: 'Français' }, // Add new language
];
```

### Modifying Theme Colors

Modify CSS variables in `src/styles.css`:

```css
:root {
  --background: oklch(1 0 0); /* Background color */
  --foreground: oklch(0.141 0.005 285.823); /* Foreground color */
  --primary: oklch(0.21 0.006 285.885); /* Primary color */
  /* ... more variables */
}

.dark {
  --background: oklch(0.141 0.005 285.823); /* Dark background */
  --foreground: oklch(0.985 0 0); /* Dark foreground */
  /* ... dark theme variables */
}
```

### Using Theme and Translation in Components

```typescript
import { useTheme } from '@/lib/theme-context'
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <p>{t('common.currentTheme')}: {actualTheme}</p>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="bg-primary text-primary-foreground"
      >
        {t('common.toggleTheme')}
      </button>
    </div>
  )
}
```

## 📱 Responsive Design

The application is fully responsive and works perfectly on:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🧪 Testing

```bash
npm run test
# or
pnpm test
```

## 🏗️ Build

```bash
npm run build
# or
pnpm build
```

## 📦 Deployment

### GitHub Pages (Recommended)

The project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages**:

   - Go to repository Settings → Pages
   - Select "GitHub Actions" as Source

2. **Automatic Deployment**:
   - Pushing to `main` branch automatically triggers deployment
   - Visit: `https://your-username.github.io/your-repository-name/`

### Other Platforms

- **Vercel**: Uses `vercel.json` configuration in root directory
- **Netlify**: Drag and drop `dist` folder to Netlify
- **Manual Deployment**: After building, `dist` directory contains all static files

## 🛠️ Development Tools

The project is configured with the following development tools:

- **ESLint** - Code quality checking
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **VSCode Configuration** - Out-of-the-box editor settings

## 📖 Related Documentation

- [React Official Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [i18next](https://www.i18next.com)

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License - Copyright (c) 2024 1103837067

---

**Enjoy your development experience!** 🎉
