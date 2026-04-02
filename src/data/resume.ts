export type Locale = "zh" | "en";

type LocalizedText = Record<Locale, string>;

type LocalizedLink = {
  label: LocalizedText;
  href: string;
  display: string | LocalizedText;
};

const t = (zh: string, en: string): LocalizedText => ({ zh, en });
const same = (value: string): LocalizedText => ({ zh: value, en: value });
const pick = (value: LocalizedText, locale: Locale) => value[locale];
const pickMaybe = (value: string | LocalizedText, locale: Locale) =>
  typeof value === "string" ? value : value[locale];
const clean = (value: string) => value.trim();
const hasValue = (value: string) => clean(value).length > 0;
const hasAnyValue = (...values: Array<string | undefined>) =>
  values.some((value) => hasValue(value ?? ""));
const getProfileUsername = (url: string) =>
  clean(url)
    .replace(/^https?:\/\/(www\.)?/i, "")
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/^@/, "") ?? "";
const toKeywords = (value: string) =>
  clean(value)
    .split(/[\n,，、/;；]+/)
    .map(clean)
    .filter(hasValue);

export const defaultLocale: Locale = "zh";

export function resolveLocale(input?: string | null): Locale {
  return input === "en" ? "en" : defaultLocale;
}

export const localeOptions = [
  {
    code: "zh" as const,
    shortLabel: same("中"),
    label: t("中文", "Chinese"),
  },
  {
    code: "en" as const,
    shortLabel: same("EN"),
    label: t("英文", "English"),
  },
] as const;

export const siteSettings = {
  names: {
    zh: "黎润华",
    en: "Richard",
  },
  role: t("软件开发工程师", "Product Engineer / Digital Storyteller"),
  location: t("中国上海 · 可远程协作", "Shanghai, China · Remote-friendly"),
  email: "undercurre@163.com",
  phone: "+86 159-1360-9821",
  website: "",
  github: "",
  linkedin: "",
  subtitle: t(
    "AI 时代的技术与商业追逐者，迎接新时代的新生。",
    "I ship digital products and brand experiences with clear storytelling, careful performance, and a complete delivery mindset."
  ),
  description: t(
    "一个适合国内外访问的双语电子简历模板，强调个人品牌、项目表达和 Vercel 部署友好性。",
    "A bilingual online resume starter built for global access, personal branding, project storytelling, and Vercel-friendly deployment."
  ),
  availability: t(
    "2026 年参与国内AI相关软硬件开发，正在打造跨时代的AI产品。",
    "Open to selected remote roles and freelance projects in 2026."
  ),
} as const;

export const publicWebsite = clean(siteSettings.website);
export const publicGithub = clean(siteSettings.github);
export const publicLinkedin = clean(siteSettings.linkedin);

const resumeSource = {
  ui: {
    metaTitle: t("电子简历", "Global Resume"),
    metaKeywords: [
      "online resume",
      "personal site",
      "next.js resume",
      "vercel cloudflare",
      "bilingual portfolio",
    ],
    brandKicker: t("个人电子简历", "Bilingual Resume"),
    brandIntro: t(
      "国内外访问、兼顾个人品牌与AI机器可读性",
      "An online resume starter shaped for global reach, strong personal branding, and machine-readable resume output."
    ),
    heroKicker: t("个人定位", "Positioning"),
    navigation: [
      { href: "#experience", label: t("经历", "Experience") },
      { href: "#projects", label: t("项目", "Projects") },
      { href: "#capabilities", label: t("能力", "Capabilities") },
      { href: "#contact", label: t("联系", "Contact") },
    ],
    languageLabel: t("语言", "Language"),
    actions: {
      primary: t("联系我", "Start a conversation"),
      secondary: t("查看 JSON 简历", "View JSON Resume"),
    },
    availability: {
      kicker: t("当前状态", "Availability"),
      badge: t("目前", "Currently"),
    },
    infoRows: {
      base: t("所在地", "Base"),
      email: t("邮箱", "Email"),
      focus: t("关注方向", "Focus"),
      focusValue: t(
        "AI Agent、软硬件结合、AIOT、混合开发",
        "Personal branding, landing pages, product storytelling, and polished launch delivery"
      ),
    },
    stackRadar: {
      kicker: t("技术雷达", "Stack radar"),
    },
    sections: {
      experience: {
        kicker: t("经历", "Experience"),
        title: t("把设计、工程与商业连接起来", "Connecting strategy, design, and delivery"),
        description: t(
          "用户第一，把产品设计做好；精益求精，尽全力把技术做好；负责到底，落地商业目标。",
          "The content below is placeholder data. Edit `src/data/resume.ts` once, and the whole site updates with it."
        ),
      },
      projects: {
        kicker: t("项目", "Projects"),
        title: t("", "Selected work and how it is framed"),
        description: t(
          "",
          "A resume site should not feel like a dump of facts. It should read like a concise statement of your work."
        ),
      },
      capabilities: {
        kicker: t("能力", "Capabilities"),
        title: t("全能多面手 + 主观能动性", "Not just building pages, but delivering the whole experience"),
        description: t(
          "从产品设计到项目落地就是一条完整交付链路，主动在这条路上寻求突破和结果 ",
          "From visual direction and information hierarchy to deployment, this template is designed around an end-to-end delivery workflow."
        ),
      },
      contact: {
        kicker: t("联系", "Contact"),
        title: t("如果有兴趣就联系我吧", "Ready to turn this starter into your own site"),
        description: t(
          "",
          ""
        ),
        bestForLabel: t("", ""),
        bestForText: t(
          "",
          ""
        ),
      },
    },
    footer: t(
      "",
      "Built for fast customization, SEO readiness, and Vercel + Cloudflare deployment."
    ),
  },
  profile: {
    summary: t(
      "我擅长把复杂信息整理成易读、可信、能打动人的数字表达。从产品设计到前端实现，再到服务搭建、上线部署和性能治理，并行 AI，提效创新，我更关注“如何让技术落地，赋能商业”。",
      "I turn complex information into digital experiences that feel readable, credible, and memorable. From product thinking and frontend implementation to launch readiness and performance, I care about the full experience people actually feel."
    ),
    metrics: [
      {
        value: "5+",
        label: t("年 Web 产品经验", "Years building web products"),
        detail: t(
          "从品牌官网到 SaaS 控制台，都能独立推进到上线。",
          "From brand sites to SaaS dashboards, I can drive work from concept to launch."
        ),
      },
      {
        value: "20+",
        label: t("个已上线项目", "Launches shipped"),
        detail: t(
          "覆盖企业站、活动页、内容中心、产品增长页、IOT中台、品牌APP、AI Agent等项目。",
          "Across company websites, campaign pages, content hubs, and product growth surfaces."
        ),
      },
      {
        value: "3",
        label: t("种协作模式", "Working modes"),
        detail: t(
          "独立交付、嵌入团队协作、短周期顾问式支持。",
          "Independent delivery, embedded team collaboration, and short consulting sprints."
        ),
      },
    ],
  },
  experience: [
    {
      period: t("2026 — 至今", "2026 — Now"),
      role: t("AI开发工程师", "Lead Frontend Engineer"),
      company: "",
      description: t(
        "负责面向全球市场的品牌站、AI 产品与可持续迭代的系统。",
        "Led brand experiences for global audiences, AI product surfaces, and a design system built for sustainable iteration."
      ),
      points: [
        t(
          "AI Agent以及相关前沿探索性工程",
          "Built a reusable page module system so marketing and design could expand new pages with a shared component language."
        ),
        t(
          "AI 消费级硬件产品设计",
          "Turned Lighthouse performance, SEO, and accessibility into launch criteria to reduce late-stage rework."
        ),
      ],
    },
    {
      period: t("2024 — 2026", "2024 — 2026"),
      role: t("IOT前端负责人", "Interactive Designer → Frontend Engineer"),
      company: "Dreame",
      description: t(
        "负责协调品牌IOT需求落地，协调供应商和各模块资源实现产品智能化。",
        "Started from visual storytelling and moved into engineering, building a lasting sensitivity to detail and interaction rhythm."
      ),
      points: [
        t(
          "设计IOT中台，提供智能化能力给品类业务单元",
          "Worked on campaign pages, editorial features, and brand refreshes, building strong narrative UI instincts."
        ),
        t(
          "预研AI方案，赋能各业务单元",
          "Translated design output into maintainable frontend modules with better consistency and delivery speed."
        ),
      ],
    },
    {
      period: t("2021 — 2024", "2021 — 2024"),
      role: t("软件开发工程师", "Senior Product Engineer"),
      company: "Midea",
      description: t(
        "美的集团IOT先行研究项目-软件开发工程师",
        "Shipped growth pages, dashboards, and merchant tooling for cross-border commerce and B2B brands."
      ),
      points: [
        t(
          "跨事业部沟通",
          "Unified marketing surfaces and in-product experiences within the same design language."
        ),
        t(
          "公共基建开发",
          "Moved the frontend architecture toward stronger typing and component layering, speeding up feature delivery."
        ),
        t(
          "前沿技术探索",
          "Worked with content, brand, and growth teams to frame product value clearly instead of piling on feature lists."
        ),
      ],
    },
  ],
  projects: [
    {
      title: t("MOVA-IoT 后台管理系统", "MOVA IoT Admin Console"),
      subtitle: t("追觅 IoT 管理后台与交付推进", "IoT operations console and delivery leadership"),
      description: t(
        "参与 IoT 研究院的服务架构设计和系统搭建，负责前端组开发进度把控、调度和难点攻坚，承接多业务单元的需求开发与进度管理，支撑设备服务、用户服务、日志监控、二维码交互和 RPC 协议协同落地。",
        "Contributed to the IoT institute's service architecture and system setup, leading frontend execution, scheduling, and hard-problem solving across multiple business units while supporting device services, user services, log monitoring, QR workflows, and RPC coordination."
      ),
      stack: ["Vue", "TypeScript", "IoT Platform", "Project Delivery", "RPC"],
      href: "https://zhicv.cn/glAJYb",
      hrefLabel: t("图文作品集", "Portfolio"),
    },
    {
      title: t("边缘网关控制系统", "Edge Gateway Control System"),
      subtitle: t("脱网可用的局域网设备控制", "Offline-capable local device control"),
      description: t(
        "使用 NestJS + Vue 实现脱网控制系统，让边缘网关在联网与断网之间无缝连接本地化资源，完成周边智能设备的控制、鉴权与局域网内联动，满足复杂 IoT 场景下的稳定可用性要求。",
        "Built an offline-first control system with NestJS and Vue so an edge gateway could switch seamlessly between online and offline states, enabling local resource access, device control, authentication, and orchestration across nearby smart devices."
      ),
      stack: ["Vue", "NestJS", "Edge Gateway", "Offline-first", "LAN"],
      href: "",
      hrefLabel: same(""),
    },
    {
      title: t("Homlux 美的智慧园区管理系统", "Homlux Smart Campus Console"),
      subtitle: t("园区级数字孪生与场景编排", "Campus-scale digital twin and scene orchestration"),
      description: t(
        "负责基于 Vue 的 PC Web 前端与微信小程序场景模块开发，实现项目列表渲染、ECharts 地图与统计、Three.js WebGL 数字孪生，以及数千设备的集控、场景构建、权限分配、空间归属划分和拓扑分析。",
        "Developed the Vue-based web console and WeChat Mini Program scene modules, delivering ECharts maps and analytics, a Three.js WebGL digital twin, large-scale device orchestration, scene building, permission modeling, spatial assignment, and topology analysis."
      ),
      stack: ["Vue", "ECharts", "Three.js", "WeChat Mini Program", "Digital Twin"],
      href: "",
      hrefLabel: same(""),
    },
    {
      title: t("美的美居 App / Lite / 智慧屏", "Midea M-Smart App Suite"),
      subtitle: t("多端设备控制与插件交付", "Cross-platform device control and plugin delivery"),
      description: t(
        "覆盖 Hybrid 与 Flutter 两套技术路线，对接不同品类和型号的物模型技术文档，梳理模型差异，完成数据适配层与 UI 组件库开发，实现设备实时监听、控制和插件交付，覆盖灯具、体脂秤、网关及其子设备等多类产品。",
        "Delivered cross-platform control surfaces across Hybrid and Flutter stacks, normalized device-model differences across product lines, and built the data adaptation layer plus UI component library for real-time monitoring, control, and plugin delivery across lighting products, scales, gateways, and related sub-devices."
      ),
      stack: ["Flutter", "Hybrid", "IoT Plugins", "Device Modeling", "UI Kit"],
      href: "",
      hrefLabel: same(""),
    },
  ],
  capabilities: [
    {
      title: t("构建", "Build"),
      body: t(
        "我会把产品方向、信息架构、交互路径和工程实现连成一条线来推进。常用 Next.js App Router、React 19、TypeScript、Tailwind CSS 与 Motion 来完成从原型到上线的全过程，也会结合 AI 工作流提升设计、开发和交付效率。",
        "I connect product direction, information architecture, interaction design, and engineering into one delivery flow. My core toolkit includes Next.js App Router, React 19, TypeScript, Tailwind CSS, and Motion, and I also use AI workflows to speed up design, development, and launch."
      ),
    },
    {
      title: t("设计", "Design"),
      body: t(
        "我更关注页面如何表达价值，而不只是把信息堆上去。无论是品牌感、编辑感、落地页叙事、设计令牌还是可访问性交互，我都会围绕“用户是否看得懂、记得住、愿意继续行动”来组织内容与视觉节奏。",
        "I care less about stacking information and more about expressing value clearly. Whether the task is editorial art direction, landing-page storytelling, design tokens, or accessible interactions, I shape the content and visual rhythm around what users can understand, remember, and act on."
      ),
    },
    {
      title: t("交付", "Operate"),
      body: t(
        "我能把最后一公里一起做完，包括 Vercel 部署、Cloudflare DNS 与代理策略、性能预算、SEO 与元信息，以及跨团队联调和上线协作。对我来说，交付不是页面写完，而是结果真的稳定可访问、可传播、可持续维护。",
        "I also take ownership of the last mile: Vercel deployment, Cloudflare DNS and proxy strategy, performance budgets, SEO metadata, and cross-team launch coordination. To me, delivery is not just finishing the page, but making sure the result is stable, reachable, shareable, and maintainable."
      ),
    },
  ],
  contactLinks: [
    {
      label: t("邮箱", "Email"),
      href: `mailto:${siteSettings.email}`,
      display: siteSettings.email,
    },
    {
      label: t("手机", "Phone"),
      href: siteSettings.phone,
      display: siteSettings.phone,
    },
    {
      label: same("GitHub"),
      href: siteSettings.github,
      display: "@yourname",
    },
    {
      label: same("LinkedIn"),
      href: siteSettings.linkedin,
      display: "linkedin.com/in/yourname",
    },
  ] satisfies readonly LocalizedLink[],
  stackRadar: [
    {
      name: "产品设计和前端工程",
      note: t(
        "AARRR、MVP、MCP、Vue、React、Flutter、Nextjs、Android、IOS、Shopify、PhotoShop、Pencil、Figma",
        "AARRR、MVP、MCP、Vue、React、Flutter、Nextjs、Android、IOS、Shopify、PhotoShop、Pencil、Figma"
      ),
    },
    {
      name: "后端工程和系统运维",
      note: t(
        "Go、Java、Python、Nodejs、Kubernetes",
        "Go、Java、Python、Nodejs、Kubernetes"
      ),
    },
    {
      name: "AI Agent",
      note: t(
        "openclaw、skill、mcp、TTS、Nano Banana、Seedance",
        "openclaw、skill、mcp、TTS、Nano Banana、Seedance"
      ),
    },
    {
      name: "嵌入式和供应链",
      note: t(
        "Espressif、Midea、Tuya",
        "Espressif、Midea、Tuya"
      ),
    },
  ],
} as const;

export function getResumeContent(locale: Locale) {
  const secondaryLocale: Locale = locale === "zh" ? "en" : "zh";

  return {
    locale,
    secondaryLocale,
    localeOptions: localeOptions
      .map((item) => ({
        code: item.code,
        shortLabel: clean(pick(item.shortLabel, locale)),
        label: clean(pick(item.label, locale)),
      }))
      .filter((item) => hasValue(item.shortLabel) && hasValue(item.label)),
    siteConfig: {
      primaryName: clean(siteSettings.names[locale]),
      secondaryName: clean(siteSettings.names[secondaryLocale]),
      role: clean(pick(siteSettings.role, locale)),
      location: clean(pick(siteSettings.location, locale)),
      email: clean(siteSettings.email),
      phone: clean(siteSettings.phone),
      website: publicWebsite,
      github: publicGithub,
      linkedin: publicLinkedin,
      subtitle: clean(pick(siteSettings.subtitle, locale)),
      description: clean(pick(siteSettings.description, locale)),
      availability: clean(pick(siteSettings.availability, locale)),
    },
    ui: {
      metaTitle: clean(pick(resumeSource.ui.metaTitle, locale)),
      metaKeywords: resumeSource.ui.metaKeywords,
      brandKicker: clean(pick(resumeSource.ui.brandKicker, locale)),
      brandIntro: clean(pick(resumeSource.ui.brandIntro, locale)),
      heroKicker: clean(pick(resumeSource.ui.heroKicker, locale)),
      navigation: resumeSource.ui.navigation
        .map((item) => ({
          href: clean(item.href),
          label: clean(pick(item.label, locale)),
        }))
        .filter((item) => hasValue(item.href) && hasValue(item.label)),
      languageLabel: clean(pick(resumeSource.ui.languageLabel, locale)),
      actions: {
        primary: clean(pick(resumeSource.ui.actions.primary, locale)),
        secondary: clean(pick(resumeSource.ui.actions.secondary, locale)),
      },
      availability: {
        kicker: clean(pick(resumeSource.ui.availability.kicker, locale)),
        badge: clean(pick(resumeSource.ui.availability.badge, locale)),
      },
      infoRows: {
        base: clean(pick(resumeSource.ui.infoRows.base, locale)),
        email: clean(pick(resumeSource.ui.infoRows.email, locale)),
        focus: clean(pick(resumeSource.ui.infoRows.focus, locale)),
        focusValue: clean(pick(resumeSource.ui.infoRows.focusValue, locale)),
      },
      stackRadar: {
        kicker: clean(pick(resumeSource.ui.stackRadar.kicker, locale)),
      },
      sections: {
        experience: {
          kicker: clean(pick(resumeSource.ui.sections.experience.kicker, locale)),
          title: clean(pick(resumeSource.ui.sections.experience.title, locale)),
          description: clean(pick(resumeSource.ui.sections.experience.description, locale)),
        },
        projects: {
          kicker: clean(pick(resumeSource.ui.sections.projects.kicker, locale)),
          title: clean(pick(resumeSource.ui.sections.projects.title, locale)),
          description: clean(pick(resumeSource.ui.sections.projects.description, locale)),
        },
        capabilities: {
          kicker: clean(pick(resumeSource.ui.sections.capabilities.kicker, locale)),
          title: clean(pick(resumeSource.ui.sections.capabilities.title, locale)),
          description: clean(pick(resumeSource.ui.sections.capabilities.description, locale)),
        },
        contact: {
          kicker: clean(pick(resumeSource.ui.sections.contact.kicker, locale)),
          title: clean(pick(resumeSource.ui.sections.contact.title, locale)),
          description: clean(pick(resumeSource.ui.sections.contact.description, locale)),
          bestForLabel: clean(pick(resumeSource.ui.sections.contact.bestForLabel, locale)),
          bestForText: clean(pick(resumeSource.ui.sections.contact.bestForText, locale)),
        },
      },
      footer: clean(pick(resumeSource.ui.footer, locale)),
    },
    profile: {
      summary: clean(pick(resumeSource.profile.summary, locale)),
      metrics: resumeSource.profile.metrics
        .map((item) => ({
          value: clean(item.value),
          label: clean(pick(item.label, locale)),
          detail: clean(pick(item.detail, locale)),
        }))
        .filter((item) => hasAnyValue(item.value, item.label, item.detail)),
    },
    experience: resumeSource.experience
      .map((item) => ({
        period: clean(pick(item.period, locale)),
        role: clean(pick(item.role, locale)),
        company: clean(item.company),
        description: clean(pick(item.description, locale)),
        points: item.points.map((point) => clean(pick(point, locale))).filter(hasValue),
      }))
      .filter((item) =>
        hasAnyValue(item.period, item.role, item.company, item.description) ||
        item.points.length > 0,
      ),
    projects: resumeSource.projects
      .map((item) => ({
        title: clean(pick(item.title, locale)),
        subtitle: clean(pick(item.subtitle, locale)),
        description: clean(pick(item.description, locale)),
        stack: item.stack.map(clean).filter(hasValue),
        href: clean(item.href),
        hrefLabel: clean(pick(item.hrefLabel, locale)),
      }))
      .filter((item) =>
        hasAnyValue(item.title, item.subtitle, item.description, item.href, item.hrefLabel) ||
        item.stack.length > 0,
      ),
    capabilities: resumeSource.capabilities
      .map((group) => ({
        title: clean(pick(group.title, locale)),
        body: clean(pick(group.body, locale)),
      }))
      .filter((group) => hasValue(group.title) || hasValue(group.body)),
    contactLinks: resumeSource.contactLinks
      .map((item) => ({
        label: clean(pick(item.label, locale)),
        href: clean(item.href),
        display: clean(pickMaybe(item.display, locale)),
      }))
      .filter((item) => hasValue(item.href) && hasAnyValue(item.label, item.display)),
    stackRadar: resumeSource.stackRadar
      .map((item) => ({
        name: clean(item.name),
        note: clean(pick(item.note, locale)),
      }))
      .filter((item) => hasAnyValue(item.name, item.note)),
  };
}

export function getJsonResume(locale: Locale = "en") {
  const content = getResumeContent(locale);

  const profiles = [
    {
      network: "GitHub",
      username: getProfileUsername(content.siteConfig.github),
      url: content.siteConfig.github,
    },
    {
      network: "LinkedIn",
      username: getProfileUsername(content.siteConfig.linkedin),
      url: content.siteConfig.linkedin,
    },
  ]
    .filter((item) => hasValue(item.url))
    .map((item) => ({
      network: item.network,
      ...(hasValue(item.username) ? { username: item.username } : {}),
      url: item.url,
    }));

  return {
    basics: {
      ...(hasValue(content.siteConfig.primaryName)
        ? { name: content.siteConfig.primaryName }
        : {}),
      ...(hasValue(content.siteConfig.role) ? { label: content.siteConfig.role } : {}),
      ...(hasValue(content.siteConfig.email) ? { email: content.siteConfig.email } : {}),
      ...(hasValue(content.siteConfig.phone) ? { phone: content.siteConfig.phone } : {}),
      ...(hasValue(content.siteConfig.website)
        ? { url: content.siteConfig.website }
        : {}),
      ...(hasValue(content.profile.summary) ? { summary: content.profile.summary } : {}),
      location: {
        city: locale === "zh" ? "深圳" : "Shanghai",
        region: locale === "zh" ? "江门" : "Shanghai",
        countryCode: "CN",
      },
      ...(profiles.length > 0 ? { profiles } : {}),
    },
    work: content.experience.map((item) => ({
      ...(hasValue(item.company) ? { name: item.company } : {}),
      ...(hasValue(item.role) ? { position: item.role } : {}),
      startDate: item.period.split(" — ")[0],
      endDate: item.period.split(" — ")[1] === "Now" || item.period.split(" — ")[1] === "至今" ? "" : item.period.split(" — ")[1],
      ...(hasValue(item.description) ? { summary: item.description } : {}),
      ...(item.points.length > 0 ? { highlights: item.points } : {}),
    }))
      .map((item) =>
        Object.fromEntries(
          Object.entries(item).filter(([, value]) => {
            if (typeof value === "string") {
              return hasValue(value);
            }

            return Array.isArray(value) ? value.length > 0 : value != null;
          }),
        ),
      ),
    projects: content.projects.map((item) => {
      const projectUrl = item.href.startsWith("http")
        ? item.href
        : hasValue(content.siteConfig.website)
          ? `${content.siteConfig.website}${item.href}`
          : item.href;

      return {
        ...(hasValue(item.title) ? { name: item.title } : {}),
        ...(hasValue(item.description) ? { description: item.description } : {}),
        ...(item.stack.length > 0 ? { highlights: item.stack } : {}),
        ...(hasValue(projectUrl) ? { url: projectUrl } : {}),
      };
    }),
    skills: content.capabilities.map((group) => ({
      ...(hasValue(group.title) ? { name: group.title } : {}),
      ...(toKeywords(group.body).length > 0 ? { keywords: toKeywords(group.body) } : {}),
    })),
    languages: [
      {
        language: "Chinese",
        fluency: "Native speaker",
      },
      {
        language: "English",
        fluency: "Professional working proficiency",
      },
    ],
  };
}
