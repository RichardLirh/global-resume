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
  role: t("软件开发工程师", "Software Engineer"),
  location: t("中国上海 · 可远程协作", "Shanghai, China · Available for remote collaboration"),
  email: "undercurre@163.com",
  phone: "+86 159-1360-9821",
  website: "",
  github: "",
  linkedin: "",
  subtitle: t(
    "AI 时代的技术与商业追逐者，迎接新时代的新生。",
    "A technologist and business builder in the age of AI, embracing what this new era can make possible."
  ),
  description: t(
    "一个适合国内外访问的双语电子简历模板，强调个人品牌、项目表达和 Vercel 部署友好性。",
    "A bilingual online resume built for audiences in China and abroad, with an emphasis on personal branding, project storytelling, and Vercel-friendly deployment."
  ),
  availability: t(
    "2026 年参与国内AI相关软硬件开发，正在打造跨时代的AI产品。",
    "In 2026, I am focused on AI-related software and hardware development in China and on building next-generation AI products."
  ),
} as const;

export const publicWebsite = clean(siteSettings.website);
export const publicGithub = clean(siteSettings.github);
export const publicLinkedin = clean(siteSettings.linkedin);

const resumeSource = {
  ui: {
    metaTitle: t("电子简历", "Online Resume"),
    metaKeywords: [
      "online resume",
      "personal site",
      "next.js resume",
      "vercel cloudflare",
      "bilingual portfolio",
    ],
    brandKicker: t("复合型产品工程履历", "A Multidisciplinary Product Engineering Profile"),
    brandIntro: t(
      "给懂行的招聘者与合作方看：这不是经历堆砌，而是产品判断、工程落地、商业意识与产业资源的集中表达。",
      "Built for experienced hiring managers and operators: not a stack of credentials, but a concentrated view of product judgment, technical execution, commercial sense, and industrial leverage."
    ),
    heroKicker: t("个人定位", "Profile"),
    navigation: [
      { href: "#experience", label: t("经历", "Experience") },
      { href: "#projects", label: t("项目", "Projects") },
      { href: "#capabilities", label: t("能力", "Capabilities") },
      { href: "#contact", label: t("联系", "Contact") },
    ],
    languageLabel: t("语言", "Language"),
    actions: {
      primary: t("联系我", "Get in Touch"),
      secondary: t("查看 JSON 简历", "View JSON Resume"),
    },
    availability: {
      kicker: t("当前状态", "Current Status"),
      badge: t("目前", "Now"),
    },
    infoRows: {
      base: t("所在地", "Location"),
      email: t("邮箱", "Email"),
      focus: t("关注方向", "Focus"),
      focusValue: t(
        "AI Agent、软硬件结合、AIOT、混合开发",
        "AI agents, software-hardware integration, AIoT, and hybrid development"
      ),
    },
    stackRadar: {
      kicker: t("技术雷达", "Technology Radar"),
    },
    sections: {
      experience: {
        kicker: t("经历", "Experience"),
        title: t("在哪里？我做过什么？", "Where I've Worked and What I've Built"),
        description: t(
          "用户第一，把产品设计做好；精益求精，尽全力把技术做好；负责到底，落地商业目标。",
          "Put users first and get the product right. Pursue technical excellence with discipline. Stay accountable through delivery and turn the work into business results."
        ),
      },
      projects: {
        kicker: t("项目", "Projects"),
        title: t("", ""),
        description: t(
          "",
          ""
        ),
      },
      capabilities: {
        kicker: t("能力", "Capabilities"),
        title: t("我可以为你做什么？", "What I Can Do for You"),
        description: t(
          "从产品设计到项目落地就是一条完整交付链路，主动在这条路上寻求突破和结果 ",
          "From product design to project delivery, I see the whole journey as one continuous delivery chain, and I stay proactive in pushing for breakthroughs and results along the way."
        ),
      },
      contact: {
        kicker: t("联系", "Contact"),
        title: t("如果有兴趣就联系我吧", "If You're Interested, Let's Talk"),
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
      ""
    ),
  },
  profile: {
    summary: t(
      "我擅长把复杂信息整理成易读、可信、能打动人的数字表达。从产品设计到前端实现，再到服务搭建、上线部署和性能治理，并行 AI，提效创新，我更关注“如何让技术落地，赋能商业”。",
      "I am good at turning complex information into digital experiences that are clear, credible, and persuasive. From product design and frontend implementation to service setup, launch, and performance optimization, and increasingly with AI to improve efficiency and unlock new possibilities, I care most about how technology lands in the real world and creates business value."
    ),
    metrics: [
      {
        value: "5+",
        label: t("年 Web 产品经验", "Years of Web Product Experience"),
        detail: t(
          "从品牌官网到 SaaS 控制台，都能独立推进到上线。",
          "From branded websites to SaaS dashboards, I can independently drive work all the way through launch."
        ),
      },
      {
        value: "20+",
        label: t("个已上线项目", "Projects Launched"),
        detail: t(
          "覆盖企业站、活动页、内容中心、产品增长页、IOT中台、品牌APP、AI Agent等项目。",
          "Across corporate websites, campaign pages, content hubs, product-growth pages, IoT platforms, branded apps, AI agents, and more."
        ),
      },
      {
        value: "3",
        label: t("种协作模式", "Collaboration Models"),
        detail: t(
          "独立交付、嵌入团队协作、短周期顾问式支持。",
          "Independent delivery, embedded team collaboration, and short-cycle advisory support."
        ),
      },
    ],
  },
  experience: [
    {
      period: t("2026 — 至今", "2026 — Now"),
      role: t("AI开发工程师", "AI Engineer"),
      company: "",
      description: t(
        "负责面向全球市场的品牌站、AI 产品与可持续迭代的系统。",
        "Responsible for global-facing brand sites, AI products, and systems designed for continuous iteration."
      ),
      points: [
        t(
          "AI Agent以及相关前沿探索性工程",
          "AI agents and related frontier exploratory engineering."
        ),
        t(
          "AI 消费级硬件产品设计",
          "AI consumer hardware product design."
        ),
      ],
    },
    {
      period: t("2024 — 2026", "2024 — 2026"),
      role: t("IOT前端负责人", "IoT Frontend Lead"),
      company: "Dreame",
      description: t(
        "负责协调品牌IOT需求落地，协调供应商和各模块资源实现产品智能化。",
        "Led the implementation of brand IoT initiatives, coordinating suppliers and cross-functional resources to drive product intelligence."
      ),
      points: [
        t(
          "设计IOT中台，提供智能化能力给品类业务单元",
          "Designed an IoT platform to provide intelligent capabilities to business units."
        ),
        t(
          "预研AI方案，赋能各业务单元",
          "Researched AI solutions to empower different business units."
        ),
      ],
    },
    {
      period: t("2021 — 2024", "2021 — 2024"),
      role: t("软件开发工程师", "Software Engineer"),
      company: "Midea",
      description: t(
        "美的集团IOT先行研究项目-软件开发工程师",
        "Software Engineer for Midea Group's advanced IoT research program."
      ),
      points: [
        t(
          "跨事业部沟通",
          "Cross-business-unit coordination."
        ),
        t(
          "公共基建开发",
          "Shared infrastructure development."
        ),
        t(
          "前沿技术探索",
          "Exploration of emerging technologies."
        ),
      ],
    },
  ],
  projects: [
    {
      title: t("AI Agent 工作流与 OpenClaw 能力体系", "AI Agent Workflow and OpenClaw Capability Framework"),
      subtitle: t("围绕 OpenClaw、Skill、MCP 的智能体工程", "AI agent engineering centered on OpenClaw, Skills, and MCP"),
      description: t(
        "围绕 OpenClaw 这类新一代智能体协作方式，持续搭建并迭代可复用的 Skill 体系、MCP 工具接入和任务编排流程，把提示词设计、上下文管理、工具调用、输出结构化和多步骤执行沉淀成一套可持续扩展的 AI Agent 生产力框架，服务于代码生成、文档整理、信息抽取、自动化操作和复杂任务拆解。",
        "Centered on new collaborative agent patterns such as OpenClaw, I continuously built and iterated reusable Skill systems, MCP tool integrations, and task orchestration flows, turning prompt design, context management, tool invocation, structured output, and multi-step execution into an extensible AI agent productivity framework for code generation, documentation, information extraction, automation, and complex task decomposition."
      ),
      stack: ["OpenClaw", "Skills", "MCP", "Tool Calling", "Agent Workflow", "Structured Output"],
      href: "",
      hrefLabel: same(""),
    },
    {
      title: t("MOVA-IoT 后台管理系统", "MOVA IoT Admin Console"),
      subtitle: t("追觅 IoT 管理后台与交付推进", "Dreame IoT admin console and delivery execution"),
      description: t(
        "参与 IoT 研究院的服务架构设计和系统搭建，负责前端组开发进度把控、调度和难点攻坚，承接多业务单元的需求开发与进度管理，支撑设备服务、用户服务、日志监控、二维码交互和 RPC 协议协同落地。",
        "Participated in the architecture design and system build-out of the IoT research institute, taking ownership of frontend planning, coordination, and issue resolution. I also managed requirement delivery and schedules across multiple business units, supporting device services, user services, log monitoring, QR-code interactions, and RPC protocol implementation."
      ),
      stack: ["Vue", "TypeScript", "IoT Platform", "Project Delivery", "RPC"],
      href: "https://zhicv.cn/glAJYb",
      hrefLabel: same(""),
    },
    {
      title: t("边缘网关控制系统", "Edge Gateway Control System"),
      subtitle: t("脱网可用的局域网设备控制", "LAN device control that remains available offline"),
      description: t(
        "使用 NestJS + Vue 实现脱网控制系统，让边缘网关在联网与断网之间无缝连接本地化资源，完成周边智能设备的控制、鉴权与局域网内联动，满足复杂 IoT 场景下的稳定可用性要求。",
        "Built an offline control system with NestJS and Vue that allowed an edge gateway to switch seamlessly between online and offline states while continuing to use localized resources for device control, authentication, and LAN orchestration across nearby smart devices."
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
        "Developed the Vue-based PC web frontend and WeChat Mini Program scene modules, including project list rendering, ECharts maps and analytics, a Three.js/WebGL digital twin, and orchestration for thousands of devices, scene creation, permission assignment, spatial ownership, and topology analysis."
      ),
      stack: ["Vue", "ECharts", "Three.js", "WeChat Mini Program", "Digital Twin"],
      href: "",
      hrefLabel: same(""),
    },
    {
      title: t("美的美居 App / Lite / 智慧屏", "Midea SmartHome App / Lite / Smart Screen"),
      subtitle: t("多端设备控制与插件交付", "Cross-platform device control and plugin delivery"),
      description: t(
        "覆盖 Hybrid 与 Flutter 两套技术路线，对接不同品类和型号的物模型技术文档，梳理模型差异，完成数据适配层与 UI 组件库开发，实现设备实时监听、控制和插件交付，覆盖灯具、体脂秤、网关及其子设备等多类产品。",
        "Worked across both Hybrid and Flutter stacks, integrated device-model documentation across categories and models, sorted out model differences, and built the data adaptation layer and UI component library to support real-time monitoring, control, and plugin delivery for lighting products, body-composition scales, gateways, and related sub-devices."
      ),
      stack: ["Flutter", "Hybrid", "IoT Plugins", "Device Modeling", "UI Kit"],
      href: "",
      hrefLabel: same(""),
    },
  ],
  capabilities: [
    {
      title: t("全栈交付", "Full-stack Delivery"),
      body: t(
        "我是一个能够从 0 到 1 推进项目的人，既能做产品设计、信息架构、交互体验，也能完成前端、后端、AI 工作流、部署上线和后续迭代。无论是官网、App、IoT 控制台、AI Agent 还是软硬件结合的数字产品，我都能把“想法”真正落成可用、可上线、可持续维护的系统，而不是只交一个页面或者一个 Demo。",
        "I am a builder who can carry a project from zero to launch. I cover product design, information architecture, interaction design, frontend, backend, AI workflows, deployment, and ongoing iteration. Whether it is a website, app, IoT console, AI agent, or a hardware-software product, I turn ideas into systems that are usable, launch-ready, and maintainable instead of stopping at a demo or a UI mockup."
      ),
    },
    {
      title: t("商业与创业", "Business and Entrepreneurial Thinking"),
      body: t(
        "我不把自己只定位成工程师，也会站在创业者和经营者的视角思考问题。做产品时，我会同时考虑用户价值、差异化、成本结构、交付效率、增长路径和商业闭环，知道什么该快速验证、什么该长期投入，能帮助团队在资源有限的时候先打出结果，再逐步建立壁垒。",
        "I do not define myself only as an engineer. I also think from the perspective of a founder and an operator. When building products, I consider user value, differentiation, cost structure, delivery efficiency, growth paths, and commercial loops at the same time. I know what should be validated quickly, what deserves long-term investment, and how to help a team produce results first before gradually building stronger moats."
      ),
    },
    {
      title: t("行业资源", "Industry Network and Supply Chain Resources"),
      body: t(
        "我在中国软硬件行业打拼多年，长期接触消费电子、IoT、供应链、制造和渠道相关团队，除了写代码，也理解产品从研发到落地再到量产协同的真实约束。这让我不仅能解决技术问题，也更容易调动合适的人脉、行业经验和供应链资源，帮助项目更快进入可执行状态。",
        "After years in China’s software and hardware industries, I have built long-term exposure to consumer electronics, IoT, supply chains, manufacturing, and channel-side collaboration. That means I do more than solve technical problems: I also understand the real constraints from R&D to implementation to scaled delivery, and I can often connect the right people, industry experience, and supply-chain resources to move a project into execution faster."
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
      name: t("产品设计和前端工程", "Product Design and Frontend Engineering"),
      note: t(
        "AARRR、MVP、MCP、Vue、React、Flutter、Nextjs、Android、IOS、Shopify、PhotoShop、Pencil、Figma",
        "AARRR, MVP, MCP, Vue, React, Flutter, Next.js, Android, iOS, Shopify, Photoshop, Pencil, and Figma"
      ),
    },
    {
      name: t("后端工程和系统运维", "Backend Engineering and Systems Operations"),
      note: t(
        "Go、Java、Python、Nodejs、Kubernetes",
        "Go, Java, Python, Node.js, and Kubernetes"
      ),
    },
    {
      name: t("AI Agent", "AI Agents"),
      note: t(
        "openclaw、skill、mcp、TTS、Nano Banana、Seedance",
        "OpenClaw, Skills, MCP, TTS, Nano Banana, and Seedance"
      ),
    },
    {
      name: t("嵌入式和供应链", "Embedded Systems and Supply Chain"),
      note: t(
        "Espressif、Midea、Tuya",
        "Espressif, Midea, and Tuya"
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
        name: clean(pick(item.name, locale)),
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
