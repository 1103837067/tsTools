# React + TypeScript + 主题切换 + 多语言模板

**Language / 语言**: [English](./README.en.md) | 中文简体

这是一个现代化的React应用程序模板，集成了完整的主题切换功能和多语言支持。

## 🚀 快速开始

### 使用此模板

1. **点击 "Use this template" 按钮** 或克隆仓库：

```bash
git clone https://github.com/1103837067/vite-react-tanstackRouter-shadcn-eslint-prettier-template.git
cd vite-react-tanstackRouter-shadcn-eslint-prettier-template
```

2. **安装依赖**：

```bash
pnpm install
```

3. **启动开发服务器**：

```bash
pnpm dev
```

4. **访问应用**：打开 [http://localhost:3000](http://localhost:3000)

## ✨ 主要功能

### 🎨 主题切换系统

- **☀️ 亮色模式**: 清爽的浅色主题
- **🌙 暗色模式**: 护眼的深色主题
- **💻 跟随系统**: 自动跟随操作系统主题设置
- **持久化存储**: 主题设置自动保存到本地存储
- **平滑过渡**: 主题切换时有平滑的动画效果

### 🌐 多语言支持

- **中文简体**: 完整的中文界面
- **English**: 完整的英文界面
- **自动检测**: 根据浏览器语言自动选择
- **持久化存储**: 语言设置自动保存到本地存储
- **类型安全**: 完整的TypeScript类型支持

### 🛠️ 技术栈

- **React 19** - 最新版本的React框架
- **TypeScript** - 类型安全的JavaScript
- **TanStack Router** - 现代化的路由系统
- **shadcn/ui** - 高质量的UI组件库
- **Tailwind CSS** - 实用优先的CSS框架
- **i18next** - 强大的国际化框架
- **Vite** - 快速的构建工具

## 🎯 如何使用

### 主题切换

1. **找到主题按钮**: 位于页面右上角的Header中
2. **点击切换**: 点击按钮打开主题选择菜单
3. **选择主题**:
   - 亮色 ☀️
   - 暗色 🌙
   - 跟随系统 💻

### 语言切换

1. **找到语言按钮**: 位于页面右上角的Header中（地球图标）
2. **点击切换**: 点击按钮打开语言选择菜单
3. **选择语言**:
   - 中文简体
   - English

## 📂 项目结构

```
src/
├── components/           # React组件
│   ├── ui/              # shadcn/ui组件
│   ├── layout/          # 布局组件
│   │   └── Header.tsx   # 页面头部组件
│   └── common/          # 通用组件
│       ├── ThemeToggle.tsx    # 主题切换按钮
│       └── LanguageToggle.tsx # 语言切换按钮
├── lib/                 # 工具库
│   ├── theme-context.tsx # 主题上下文管理
│   └── i18n.ts          # 国际化配置
├── locales/             # 多语言文件
│   ├── zh-CN.json       # 中文翻译
│   └── en-US.json       # 英文翻译
├── types/               # 类型定义
│   └── i18next.d.ts     # i18next类型定义
├── hooks/               # 自定义Hooks
│   └── useTranslation.ts # 翻译Hook
├── routes/              # 路由页面
│   ├── __root.tsx       # 根路由
│   └── index.tsx        # 首页
├── styles.css           # 全局样式和主题变量
└── main.tsx            # 应用入口
```

## 🔧 自定义配置

### 添加新语言

1. **创建翻译文件**:

```bash
# 在 src/locales/ 目录下创建新的语言文件
src/locales/fr-FR.json  # 法语
src/locales/ja-JP.json  # 日语
```

2. **更新i18n配置**:

```typescript
// src/lib/i18n.ts
import frFR from '../locales/fr-FR.json';

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
  'fr-FR': { translation: frFR }, // 添加新语言
};
```

3. **更新语言切换组件**:

```typescript
// src/components/common/LanguageToggle.tsx
const languages = [
  { code: 'zh-CN', name: '中文简体' },
  { code: 'en-US', name: 'English' },
  { code: 'fr-FR', name: 'Français' }, // 添加新语言
];
```

### 修改主题颜色

在 `src/styles.css` 中修改CSS变量：

```css
:root {
  --background: oklch(1 0 0); /* 背景色 */
  --foreground: oklch(0.141 0.005 285.823); /* 前景色 */
  --primary: oklch(0.21 0.006 285.885); /* 主色调 */
  /* ... 更多变量 */
}

.dark {
  --background: oklch(0.141 0.005 285.823); /* 暗色背景 */
  --foreground: oklch(0.985 0 0); /* 暗色前景 */
  /* ... 暗色主题变量 */
}
```

### 在组件中使用主题和翻译

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

## 📱 响应式设计

应用程序完全响应式，在以下设备上都能完美工作：

- 📱 手机 (320px+)
- 📱 平板 (768px+)
- 💻 桌面 (1024px+)

## 🧪 测试

```bash
npm run test
# 或
pnpm test
```

## 🏗️ 构建

```bash
npm run build
# 或
pnpm build
```

## 📦 部署

### GitHub Pages (推荐)

项目已配置自动部署到GitHub Pages：

1. **启用GitHub Pages**：

   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

2. **自动部署**：
   - 推送到 `main` 分支自动触发部署
   - 访问：`https://your-username.github.io/your-repository-name/`

### 其他平台

- **Vercel**: 使用根目录的 `vercel.json` 配置
- **Netlify**: 拖拽 `dist` 文件夹到Netlify
- **手动部署**: 构建完成后，`dist` 目录包含所有静态文件

## 🛠️ 开发工具

项目已配置以下开发工具：

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **VSCode配置** - 开箱即用的编辑器设置

## 📖 相关文档

- [React 官方文档](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [i18next](https://www.i18next.com)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - Copyright (c) 2024 1103837067

---

**享受您的开发体验！** 🎉
