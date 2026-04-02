# 开源库调研

更新时间：2026-04-02

这份清单聚焦“个人电子简历 / 作品简历 / 个人品牌站”场景，优先看社区热度、生态成熟度和是否适合 `Vercel + Cloudflare` 部署。

## 热度快照

以下热度数字主要参考 GitHub 仓库主页，日期均为 2026-04-02：

| 项目 | 热度快照 | 结论 |
| --- | --- | --- |
| Next.js | 约 139k stars | 个人站和内容站的主流 React 框架之一 |
| Tailwind CSS | 约 94.3k stars | 样式开发效率和社区资料都很强 |
| shadcn/ui | 约 111k stars | 组件组合思路很受欢迎，适合后续扩展 |
| Motion | 约 31.3k stars | React 动效方案里非常主流 |
| Lucide | 约 21.9k stars | 轻量图标库，适合信息展示型页面 |
| Reactive Resume | 约 36.1k stars | 简历生成器赛道里很成熟 |

## 这次已经采用

### 1. Next.js

- 推荐理由：React 生态里做 SEO 友好个人站、作品集、简历站的主流方案，和 Vercel 的集成最顺。
- 适合场景：一页简历、作品集、带博客的个人品牌站、MDX 内容站。
- 这次用途：首页、metadata、`resume.json`、`sitemap.xml`、部署基座。

### 2. Tailwind CSS

- 推荐理由：社区成熟，写高质量排版和页面节奏非常高效，适合做快速迭代的个人品牌页面。
- 适合场景：需要反复调样式、快速试视觉方向的项目。
- 这次用途：页面布局、色彩系统、响应式和细节样式。

### 3. Motion

- 推荐理由：React 动效里使用面广，适合做轻量但高级的入场动画和滚动显隐。
- 适合场景：想让简历页更有记忆点，但又不想引入过重交互框架。
- 这次用途：区块淡入与滚动揭示。

### 4. Lucide

- 推荐理由：图标统一、轻量、API 简单，适合信息型网站。
- 适合场景：简历、文档站、后台、产品官网。
- 这次用途：联系方式、状态信息、外链入口图标。

## 可选增强

### JSON Resume

- 推荐理由：如果你希望简历数据更标准化、未来可导出到别的简历生成器或招聘系统，这是很好的数据格式参考。
- 适合场景：想保留机器可读简历、未来要导出 PDF / ATS 兼容格式。
- 这次状态：本项目已经提供了 `/resume.json`，但没有完全绑定 JSON Resume 官方主题生态。

### shadcn/ui

- 推荐理由：如果后面你想把这个简历站继续扩展成博客、后台、留言板、案例库，shadcn/ui 很适合继续搭组件。
- 适合场景：需要更多交互组件，但又不想被重 UI 框架束缚。
- 这次状态：暂未引入，保持模板轻量。

### MDX

- 推荐理由：如果你想加英文版 / 中文版长文介绍、博客或案例研究，MDX 很适合内容型扩展。
- 适合场景：个人站从“简历页”升级为“内容型品牌站”。
- 这次状态：暂未引入，避免首版复杂度过高。

## 可参考的开源项目方向

### Reactive Resume

- 适合人群：更想要“表单式简历生成器”和多模板导出，而不是做自己的品牌站。
- 优点：成熟、功能多、可自托管。
- 取舍：它更像简历产品，不像个人品牌站。

### Vercel 的 Next.js Portfolio Starter

- 适合人群：想从官方 starter 开始，逐步长成作品集或个人站。
- 优点：路径清晰，和 Vercel 生态很贴合。
- 取舍：需要你自己再加“简历表达”和结构化内容。

## 关于 Vercel + Cloudflare 的判断

- 按 Vercel 官方文档，如果你的域名 DNS 放在外部供应商，比如 Cloudflare，就在 Vercel 添加域名后，再到外部 DNS 面板里补对应记录。
- 按 Cloudflare 官方文档，A / AAAA / CNAME 记录开启代理后，Cloudflare 可以在流量进入应用前提供 DDoS 防护、缓存和其他产品能力。
- 但如果你进一步追求 Cloudflare 中国网络，官方文档写得很明确：这是单独订阅能力，面向 Enterprise 计划客户，并且每个 apex 域名都需要有效 ICP 备案或许可证。

所以我的结论是：

- 对个人简历站，`Vercel + Cloudflare` 是很合理的首发组合。
- 对“中国大陆极稳访问”这个更高目标，不能只靠这两个名字叠加，还要单独做大陆合规和源站规划。

## 为什么这次选“自建模板”而不是直接套现成简历产品

- 电子简历本质上也是你的个人品牌触点，视觉与叙事很重要。
- 对求职、接单、海外客户背调来说，自定义品牌站通常比标准化模板更有辨识度。
- 用 Next.js 自建后，后续要扩展博客、案例研究、表单、埋点、A/B 测试都更自由。

## 资料来源

- Next.js GitHub: https://github.com/vercel/next.js
- Tailwind CSS GitHub: https://github.com/tailwindlabs/tailwindcss
- Lucide GitHub: https://github.com/lucide-icons/lucide
- shadcn/ui GitHub: https://github.com/shadcn-ui/ui
- Motion 官方网站: https://motion.dev/
- Motion GitHub: https://github.com/motiondivision/motion
- JSON Resume 官网: https://jsonresume.org/
- Reactive Resume GitHub: https://github.com/AmruthPillai/Reactive-Resume
- Vercel Portfolio Starter: https://github.com/vercel/nextjs-portfolio-starter
- Vercel 自定义域名文档: https://vercel.com/docs/domains/set-up-custom-domain
- Cloudflare Proxy Status 文档: https://developers.cloudflare.com/dns/proxy-status/
- Cloudflare China Network 文档: https://developers.cloudflare.com/china-network/
