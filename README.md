# Mystic Tarot Reading

这是一个使用 [Next.js](https://nextjs.org) 构建的神秘塔罗牌占卜网站，支持多语言功能。

## 项目特性

- 🔮 多种塔罗牌排列方式（过去-现在-未来、凯尔特十字等）
- 🌍 支持5种语言（中文、英文、法文、阿拉伯文、印地文）
- 📱 响应式设计，完美适配移动端
- ⚡ 基于Next.js 15构建，性能优异
- 🎨 现代UI设计，用户体验佳
- 🔍 SEO优化，搜索引擎友好

## 域名配置

本项目已配置为使用域名 **https://teller.eu.org**

### 环境变量设置

创建 `.env.local` 文件并添加以下配置：

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://teller.eu.org

# SEO Verification Codes (可选)
GOOGLE_SITE_VERIFICATION=your_google_verification_code
BING_VERIFICATION=your_bing_verification_code
```

## 开始使用

首先，安装依赖：

```bash
npm install
```

然后运行开发服务器：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

您可以通过修改 `src/app/[locale]/page.tsx` 文件来编辑页面。文件保存后页面会自动更新。

## SEO 配置

本项目包含完整的SEO优化配置：

- 自动生成的sitemap.xml
- 智能robots.txt配置
- 结构化数据支持
- Open Graph标签
- 多语言hreflang标签

详细的SEO配置指南请参阅 [SEO_SETUP.md](./SEO_SETUP.md)

## 部署

推荐使用 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 部署，它是 Next.js 创建者提供的平台。

请查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## 了解更多

要了解更多关于Next.js的信息，请查看以下资源：

- [Next.js Documentation](https://nextjs.org/docs) - 学习 Next.js 特性和 API
- [Learn Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

您可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎您的反馈和贡献！
