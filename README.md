# Global Resume

一个为“国内外都能访问”的电子简历准备的起步项目。它基于 `Next.js 16 + Tailwind CSS 4`，默认包含：

- 一页式双语感简历页面
- 机器可读的 `resume.json`
- `sitemap.xml` 和 `robots.txt`
- 适合 `Vercel + Cloudflare` 的部署思路
- 社区热门开源库调研文档和后续 TODO

## 快速开始

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 预览页面。

## 你最先要改的地方

1. 编辑 `src/data/resume.ts`
2. 把占位姓名、邮箱、链接、经历、项目换成你自己的内容
3. 把 `siteConfig.website` 改成你的正式域名

## 项目结构

```text
src/
  app/
    layout.tsx        # 全局 metadata、字体、SEO 基础配置
    page.tsx          # 简历首页
    resume.json/      # 机器可读简历路由
    robots.ts         # robots.txt
    sitemap.ts        # sitemap.xml
  components/
    fade-in.tsx       # 滚动进入动画
  data/
    resume.ts         # 你的简历内容数据源
docs/
  deployment.md       # Vercel + Cloudflare 部署说明
  library-research.md # 社区热门库调研
TODO.md               # 后续行动项
```

## 推荐部署路径

推荐先走下面这条最省心的路线：

1. 代码托管到 GitHub
2. 在 Vercel 导入仓库并自动部署
3. 域名放在 Cloudflare 管理 DNS
4. 把自定义域名接到 Vercel
5. 让 Cloudflare 负责 DNS、代理、WAF 和证书边缘层

这套组合的优点是：

- Vercel 对 Next.js 支持最好，上手最快
- Cloudflare 负责域名层、防护层和额外缓存策略时很方便
- 对个人简历、作品集和轻内容站来说，工程复杂度低

需要注意：

- Cloudflare 不能神奇地把“海外源站”变成“中国大陆源站”
- 如果你的目标是“中国大陆长期极稳访问”，还需要考虑备案、国内镜像或双站策略

详细说明见 [docs/deployment.md](./docs/deployment.md)。

## 文档

- [部署说明](./docs/deployment.md)
- [开源库调研](./docs/library-research.md)
- [TODO 行动项](./TODO.md)

## 当前已采用的核心库

- `next`
- `react`
- `tailwindcss`
- `motion`
- `lucide-react`

## 验证命令

```bash
npm run lint
npm run build
```
