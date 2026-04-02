# 部署说明

## 目标架构

推荐的首版架构是：

`GitHub -> Vercel -> Custom Domain on Cloudflare`

这适合：

- 简历站
- 作品集
- 个人品牌站
- 内容量不大、但希望部署体验很顺的站点

## 为什么很多人会用 Vercel + Cloudflare

### Vercel 负责什么

- 对 Next.js 的构建和部署支持最好
- Preview 部署体验成熟
- 自带基础缓存和全球边缘分发能力
- 个人项目上手成本低

### Cloudflare 负责什么

- DNS 托管方便
- 代理层、WAF、证书和安全策略方便
- 可在域名层补充缓存规则、重定向、机器人防护等能力

## 标准上线步骤

### 1. 先在本地改成你的真实资料

- `src/data/resume.ts`
- `siteConfig.website`
- 联系方式、项目链接、经历、技能

### 2. 推到 GitHub

### 3. 在 Vercel 导入仓库

- 创建新项目
- Framework 选择 Next.js
- 保持默认构建设置即可

### 4. 绑定自定义域名

- 在 Vercel 里添加你的域名，例如 `resume.yourdomain.com`

### 5. 在 Cloudflare 配 DNS

- 如果使用子域名，通常会配置一个指向 Vercel 的 `CNAME`
- 如果使用根域名，按 Vercel 后台给出的记录配置
- 代理开关是否开启，需要结合你自己的缓存和安全策略决定

## 我对这个组合的实际建议

### 建议 1

先把 Cloudflare 当成 DNS + 代理 + 安全层来用，不要第一天就写很激进的缓存规则。

### 建议 2

如果你不确定 Cloudflare 缓存策略，先让 HTML 页面主要交给 Vercel 控制缓存，避免更新后页面陈旧。

### 建议 3

静态资源、图片、字体再逐步加 Cloudflare 规则，比一开始“全站 Cache Everything”更稳。

上面两条属于工程经验判断，不是某一条官方文档的直接原句。

## 国内访问要特别知道的事

`Vercel + Cloudflare` 很常见，但它不是“中国大陆极稳访问”的万能解。

原因是：

- 你的源站依然大概率在海外网络
- Cloudflare 可以优化 DNS、TLS、代理和边缘层体验
- 但跨境链路波动并不会因为“前面套了 Cloudflare”就完全消失

如果你的目标是：

- 面向招聘方浏览
- 面向海外客户
- 面向国内外都能访问，但允许偶发波动

那么这套已经很够用。

如果你的目标是：

- 中国大陆长期稳定、低延迟、可商用级保障

那就要额外考虑：

- 备案
- 国内对象存储 / CDN
- 大陆镜像站
- 双域名或双源站策略

## 可继续升级的方向

- 接入 Analytics
- 增加简历 PDF 导出
- 增加中英文切换
- 给项目案例做单独详情页
- 增加表单或预约咨询入口

## 参考资料

- Vercel custom domain docs: https://vercel.com/docs/domains/set-up-custom-domain
- Cloudflare Proxy Status docs: https://developers.cloudflare.com/dns/proxy-status/
- Cloudflare China Network overview: https://developers.cloudflare.com/china-network/
