# 贡献指南

感谢您对这个项目的兴趣！我们欢迎所有形式的贡献。

## 🚀 快速开始

1. Fork 这个仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📋 开发规范

### 代码风格

- 使用 TypeScript 进行开发
- 遵循 ESLint 和 Prettier 配置
- 使用函数式组件和 Hooks
- 组件名使用 PascalCase
- 文件名使用 camelCase

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 分支命名规范

- `feature/功能名称` - 新功能
- `fix/问题描述` - 修复bug
- `docs/文档更新` - 文档更新
- `refactor/重构描述` - 代码重构

## 🧪 测试

在提交之前，请确保：

```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 运行测试
pnpm test
```

## 📝 添加新功能

### 添加新的UI组件

1. 使用 shadcn/ui 添加组件：

```bash
pnpm dlx shadcn@canary add [component-name]
```

2. 在 `src/components/` 目录下创建自定义组件

### 添加新的翻译

1. 在 `src/locales/zh-CN.json` 和 `src/locales/en-US.json` 中添加翻译键值
2. 在组件中使用 `useTranslation` Hook

### 添加新的路由

1. 在 `src/routes/` 目录下创建新的路由文件
2. 使用 TanStack Router 的文件路由约定
