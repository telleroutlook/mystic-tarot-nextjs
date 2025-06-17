# SEO Setup Guide for Mystic Tarot Reading

本指南将帮助您配置和优化塔罗牌应用的SEO设置。

## 环境变量配置

在您的 `.env.local` 文件中添加以下配置：

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://teller.eu.org

# SEO Verification Codes
GOOGLE_SITE_VERIFICATION=your_google_verification_code
BING_VERIFICATION=your_bing_verification_code
YANDEX_VERIFICATION=your_yandex_verification_code
YAHOO_VERIFICATION=your_yahoo_verification_code
```

## 搜索引擎验证

### 1. Google Search Console
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加您的网站
3. 选择"HTML tag"验证方法
4. 复制 content 属性值到 `GOOGLE_SITE_VERIFICATION`

### 2. Bing Webmaster Tools
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加您的网站
3. 选择"Meta tag"验证方法
4. 复制 content 属性值到 `BING_VERIFICATION`

### 3. Yandex Webmaster
1. 访问 [Yandex Webmaster](https://webmaster.yandex.com)
2. 添加您的网站
3. 选择"Meta tag"验证方法
4. 复制 content 属性值到 `YANDEX_VERIFICATION`

## SEO 优化检查清单

### ✅ 已实现的优化

#### 基础SEO优化
- [x] **Metadata API**: 使用Next.js 15的新Metadata API
- [x] **多语言SEO**: 支持5种语言的hreflang标签
- [x] **结构化数据**: JSON-LD schema标记（Website, Organization, Application, FAQ, Breadcrumb）
- [x] **动态sitemap**: 自动生成XML站点地图，包含所有语言版本
- [x] **动态robots.txt**: 智能爬虫控制，环境感知配置
- [x] **Open Graph**: 社交媒体分享优化
- [x] **Twitter Cards**: Twitter分享卡片
- [x] **搜索引擎验证**: 支持Google, Bing, Yandex等验证

#### 技术SEO优化
- [x] **安全头部**: X-Frame-Options, CSP, Referrer-Policy等
- [x] **性能优化**: 图片优化、压缩、缓存策略
- [x] **Web Vitals监控**: 自动追踪LCP, FID, CLS等性能指标
- [x] **语义HTML**: 正确使用header, main, section, aside等语义标签
- [x] **无障碍访问**: ARIA标签、屏幕阅读器支持
- [x] **面包屑导航**: 带结构化数据的导航
- [x] **错误页面**: 优化的404页面
- [x] **重定向策略**: SEO友好的URL重定向

### 📋 额外建议

#### 1. 图片优化
确保您有以下SEO图片：
```
public/
├── images/
│   ├── og-image.png (1200x630px)
│   ├── twitter-card.png (1200x630px)
│   └── logo.png (512x512px)
└── favicon/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── safari-pinned-tab.svg
```

#### 2. 内容优化
- 为每个塔罗牌页面添加独特的元描述
- 使用结构化的H1, H2, H3标签
- 添加图片的alt属性
- 创建内容丰富的FAQ页面

#### 3. 技术SEO
- 设置Google Analytics和Search Console
- 监控Core Web Vitals性能指标
- 定期检查404错误页面
- 实现面包屑导航

#### 4. 本地化SEO
每种语言的metadata已经配置，但建议：
- 为每种语言创建独特的内容
- 本地化所有UI元素
- 考虑地区性的关键词

## 性能监控

### 推荐工具
1. **Google PageSpeed Insights**: 检查页面性能
2. **Google Search Console**: 监控搜索表现
3. **Google Analytics**: 分析用户行为
4. **Schema Markup Validator**: 验证结构化数据

### 关键指标
- **Core Web Vitals**: LCP, FID, CLS
- **Mobile Usability**: 移动端友好性
- **Indexing Status**: 索引状态
- **Search Queries**: 搜索查询表现

## 部署前检查清单

### ✅ 环境配置
- [ ] 设置正确的 `NEXT_PUBLIC_SITE_URL`
- [ ] 配置搜索引擎验证码（Google, Bing, Yandex等）
- [ ] 准备所需的图片文件（OG图片、logo、favicon等）
- [ ] 检查robots.ts和sitemap.ts配置

### ✅ 内容审核
- [ ] 确认所有语言的元数据翻译准确
- [ ] 检查内容的可访问性（ARIA标签、alt文本等）
- [ ] 验证所有链接正常工作
- [ ] 确保移动端体验良好

### ✅ 技术测试
- [ ] 使用 `npm run build` 测试构建过程
- [ ] 检查控制台是否有Web Vitals报告
- [ ] 验证结构化数据格式正确
- [ ] 测试404页面和错误处理

## 部署后的步骤

### 1. 搜索引擎提交
```bash
# 站点地图URL
https://teller.eu.org/sitemap.xml

# 提交到：
# - Google Search Console
# - Bing Webmaster Tools  
# - Yandex Webmaster
```

### 2. 验证和测试
- **结构化数据验证**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **页面速度测试**: [PageSpeed Insights](https://pagespeed.web.dev/)
- **移动友好性**: [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- **多语言设置**: 确认hreflang标签和canonical URL正确

### 3. 性能监控设置
- 在Google Analytics中设置Web Vitals监控
- 配置Search Console的性能报告
- 设置Core Web Vitals alerts

### 4. 索引监控
- 提交所有语言版本的页面进行索引
- 监控crawl errors和index coverage
- 检查robots.txt是否按预期工作

## 故障排除

### 常见问题

1. **站点地图不更新**
   - 检查 `NEXT_PUBLIC_SITE_URL` 是否正确设置
   - 重新构建并部署应用

2. **验证失败**
   - 确认环境变量正确设置
   - 检查HTML源码中是否有验证标签

3. **多语言问题**
   - 验证hreflang标签格式
   - 确认canonical URL设置正确

### 联系支持
如有技术问题，请检查：
- Next.js官方文档
- Google Search Console帮助中心
- 本项目的GitHub Issues

---

*最后更新: 2024年1月* 