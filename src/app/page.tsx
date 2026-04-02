import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import {
  defaultLocale,
  getResumeContent,
  resolveLocale,
  type Locale,
} from "@/data/resume";

type HomeProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const content = getResumeContent(locale);
  const infoRows = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: content.ui.infoRows.base,
      value: content.siteConfig.location,
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: content.ui.infoRows.email,
      value: content.siteConfig.email,
    },
    {
      icon: <BriefcaseBusiness className="h-4 w-4" />,
      label: content.ui.infoRows.focus,
      value: content.ui.infoRows.focusValue,
    },
  ].filter((item) => hasText(item.value));
  const showMetrics = content.profile.metrics.length > 0;
  const showAvailabilityCard = hasAnyText(
    content.ui.availability.badge,
    content.siteConfig.availability,
  );
  const showAvailabilityPanel =
    hasAnyText(content.ui.availability.kicker) || showAvailabilityCard || infoRows.length > 0;
  const showStackRadarPanel =
    hasAnyText(content.ui.stackRadar.kicker) || content.stackRadar.length > 0;
  const showRightRail = showAvailabilityPanel || showStackRadarPanel;
  const showExperienceSection =
    hasSectionHeading(content.ui.sections.experience) || content.experience.length > 0;
  const showProjectsSection =
    hasSectionHeading(content.ui.sections.projects) || content.projects.length > 0;
  const showCapabilitiesSection =
    hasSectionHeading(content.ui.sections.capabilities) || content.capabilities.length > 0;
  const showBestFor = hasAnyText(
    content.ui.sections.contact.bestForLabel,
    content.ui.sections.contact.bestForText,
  );
  const showContactLinks = content.contactLinks.length > 0;
  const showContactSection =
    hasSectionHeading(content.ui.sections.contact) || showBestFor || showContactLinks;
  const navigationItems = content.ui.navigation.filter((item) => {
    if (item.href === "#experience") {
      return showExperienceSection;
    }

    if (item.href === "#projects") {
      return showProjectsSection;
    }

    if (item.href === "#capabilities") {
      return showCapabilitiesSection;
    }

    if (item.href === "#contact") {
      return showContactSection;
    }

    return true;
  });
  const showTopBar =
    hasAnyText(content.ui.brandKicker, content.ui.brandIntro) ||
    content.localeOptions.length > 0 ||
    navigationItems.length > 0;
  const showPrimaryAction = hasText(content.ui.actions.primary) && showContactSection;

  return (
    <main className="relative isolate overflow-hidden">
      <Backdrop />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-3 pb-16 pt-4 sm:gap-6 sm:px-5 sm:pb-20 sm:pt-6 lg:gap-8 lg:px-8">
        {showTopBar ? (
          <FadeIn className="section-frame fine-grid flex flex-col gap-4 rounded-[1.6rem] px-4 py-4 sm:rounded-[2rem] sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {hasAnyText(content.ui.brandKicker, content.ui.brandIntro) ? (
                <div className="max-w-2xl">
                  {hasText(content.ui.brandKicker) ? (
                    <p className="kicker">{content.ui.brandKicker}</p>
                  ) : null}
                  {hasText(content.ui.brandIntro) ? (
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                      {content.ui.brandIntro}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {content.localeOptions.length > 0 || navigationItems.length > 0 ? (
                <div className="flex flex-col gap-3 xl:items-end">
                  <LanguageSwitch
                    currentLocale={locale}
                    label={content.ui.languageLabel}
                    options={content.localeOptions}
                  />

                  {navigationItems.length > 0 ? (
                    <div className="no-scrollbar -mx-1 flex overflow-x-auto px-1">
                      <nav className="flex min-w-max items-center gap-2 text-sm text-[color:var(--muted)]">
                        {navigationItems.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="rounded-full border border-[color:var(--border)] px-3 py-2 transition hover:border-[color:var(--accent)] hover:text-[color:var(--foreground)]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </nav>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </FadeIn>
        ) : null}

        <section
          className={`grid gap-4 ${showRightRail ? "lg:grid-cols-[1.35fr_0.95fr] lg:gap-6" : ""}`}
        >
          <FadeIn className="section-frame relative overflow-hidden rounded-[1.6rem] px-4 py-6 sm:rounded-[2rem] sm:px-8 sm:py-10">
            <div className="absolute right-3 top-3 h-14 w-14 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] blur-2xl sm:right-4 sm:top-4 sm:h-16 sm:w-16" />
            {hasText(content.ui.heroKicker) ? <p className="kicker">{content.ui.heroKicker}</p> : null}

            <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
              <div className="space-y-3">
                {hasText(content.siteConfig.role) ? (
                  <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)] sm:text-sm">
                    {content.siteConfig.role}
                  </p>
                ) : null}

                {hasAnyText(content.siteConfig.primaryName, content.siteConfig.secondaryName) ? (
                  <h1 className="max-w-4xl font-display text-4xl leading-[0.94] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
                    {hasText(content.siteConfig.primaryName) ? content.siteConfig.primaryName : null}
                    {hasText(content.siteConfig.secondaryName) ? (
                      <span className="mt-2 block text-[0.42em] font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
                        {content.siteConfig.secondaryName}
                      </span>
                    ) : null}
                  </h1>
                ) : null}
              </div>

              {hasText(content.siteConfig.subtitle) ? (
                <p className="max-w-2xl text-base leading-8 text-[color:var(--foreground-soft)] sm:text-xl">
                  {content.siteConfig.subtitle}
                </p>
              ) : null}

              {hasText(content.profile.summary) ? (
                <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
                  {content.profile.summary}
                </p>
              ) : null}

              {showPrimaryAction ? (
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                  <a
                    href="#contact"
                    style={{ color: "#fffaf2" }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-[color:var(--inverse-foreground)] transition hover:translate-y-[-1px] hover:bg-[color:var(--accent-strong)] sm:w-auto"
                  >
                    {content.ui.actions.primary}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : null}
            </div>

            {showMetrics ? (
              <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
                {content.profile.metrics.map((item, index) => (
                  <FadeIn
                    key={`${item.label}-${item.value}-${index}`}
                    delay={0.08 * index}
                    className="paper-tint rounded-[1.35rem] border border-[color:var(--border)] p-4 sm:rounded-[1.5rem] sm:p-5"
                  >
                    {hasText(item.value) ? (
                      <p className="font-display text-4xl text-[color:var(--foreground)]">
                        {item.value}
                      </p>
                    ) : null}
                    {hasText(item.label) ? (
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground-soft)]">
                        {item.label}
                      </p>
                    ) : null}
                    {hasText(item.detail) ? (
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                        {item.detail}
                      </p>
                    ) : null}
                  </FadeIn>
                ))}
              </div>
            ) : null}
          </FadeIn>

          {showRightRail ? (
            <FadeIn delay={0.12} className="space-y-4 sm:space-y-6">
              {showAvailabilityPanel ? (
                <aside className="section-frame rounded-[1.6rem] px-4 py-5 sm:rounded-[2rem] sm:px-6 sm:py-6">
                  {hasText(content.ui.availability.kicker) ? (
                    <p className="kicker">{content.ui.availability.kicker}</p>
                  ) : null}
                  <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
                    {showAvailabilityCard ? (
                      <div className="rounded-[1.35rem] border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] p-4 sm:rounded-[1.5rem] sm:p-5">
                        {hasText(content.ui.availability.badge) ? (
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] sm:text-sm">
                            {content.ui.availability.badge}
                          </p>
                        ) : null}
                        {hasText(content.siteConfig.availability) ? (
                          <p className="mt-3 text-base leading-8 text-[color:var(--foreground)] sm:text-lg">
                            {content.siteConfig.availability}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {infoRows.length > 0 ? (
                      <div className="space-y-3 text-sm text-[color:var(--foreground-soft)]">
                        {infoRows.map((item) => (
                          <InfoRow
                            key={`${item.label}-${item.value}`}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </aside>
              ) : null}

              {showStackRadarPanel ? (
                <aside className="section-frame rounded-[1.6rem] px-4 py-5 sm:rounded-[2rem] sm:px-6 sm:py-6">
                  {hasText(content.ui.stackRadar.kicker) ? (
                    <p className="kicker">{content.ui.stackRadar.kicker}</p>
                  ) : null}
                  {content.stackRadar.length > 0 ? (
                    <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                      {content.stackRadar.map((item) => (
                        <div
                          key={`${item.name}-${item.note}`}
                          className="paper-tint rounded-[1.2rem] border border-[color:var(--border)] p-4 sm:rounded-[1.35rem]"
                        >
                          {hasText(item.name) ? (
                            <p className="font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
                              {item.name}
                            </p>
                          ) : null}
                          {hasText(item.note) ? (
                            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                              {item.note}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </aside>
              ) : null}
            </FadeIn>
          ) : null}
        </section>

        {showExperienceSection ? (
          <FadeIn
            id="experience"
            className="section-frame rounded-[1.6rem] px-4 py-6 sm:rounded-[2rem] sm:px-8 sm:py-8"
          >
            <SectionHeading
              kicker={content.ui.sections.experience.kicker}
              title={content.ui.sections.experience.title}
              description={content.ui.sections.experience.description}
            />

            {content.experience.length > 0 ? (
              <div className="mt-6 space-y-4 sm:mt-8">
                {content.experience.map((item, index) => (
                  <FadeIn
                    key={`${item.company}-${item.period}-${index}`}
                    delay={0.06 * index}
                    className="paper-tint rounded-[1.4rem] border border-[color:var(--border)] p-4 sm:rounded-[1.6rem] sm:p-6"
                  >
                    <div className="grid gap-4 lg:grid-cols-[160px_1fr] lg:gap-6">
                      {hasText(item.period) ? (
                        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)] sm:text-sm">
                          {item.period}
                        </div>
                      ) : null}

                      <div>
                        {hasText(item.role) ? (
                          <h3 className="font-display text-2xl text-[color:var(--foreground)] sm:text-3xl">
                            {item.role}
                          </h3>
                        ) : null}
                        {hasText(item.company) ? (
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--foreground-soft)] sm:text-sm">
                            {item.company}
                          </p>
                        ) : null}
                        {hasText(item.description) ? (
                          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
                            {item.description}
                          </p>
                        ) : null}
                        {item.points.length > 0 ? (
                          <ul className="mt-4 grid gap-3 text-sm leading-7 text-[color:var(--foreground-soft)] sm:grid-cols-2 xl:grid-cols-3">
                            {item.points.map((point) => (
                              <li
                                key={point}
                                className="rounded-[1.1rem] border border-[color:var(--border)] bg-white/55 px-4 py-3"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : null}
          </FadeIn>
        ) : null}

        {showProjectsSection || showCapabilitiesSection ? (
          <section
            id={showProjectsSection ? "projects" : undefined}
            className={`grid gap-4 ${
              showProjectsSection && showCapabilitiesSection
                ? "xl:grid-cols-[1.08fr_0.92fr] xl:gap-6"
                : ""
            }`}
          >
            {showProjectsSection ? (
              <FadeIn className="section-frame rounded-[1.6rem] px-4 py-6 sm:rounded-[2rem] sm:px-8 sm:py-8">
                <SectionHeading
                  kicker={content.ui.sections.projects.kicker}
                  title={content.ui.sections.projects.title}
                  description={content.ui.sections.projects.description}
                />

                {content.projects.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:mt-8">
                    {content.projects.map((project, index) => (
                      <FadeIn
                        key={`${project.title}-${index}`}
                        delay={0.08 * index}
                        className="paper-tint rounded-[1.4rem] border border-[color:var(--border)] p-4 sm:rounded-[1.6rem] sm:p-6"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            {hasAnyText(project.subtitle, project.title) ? (
                              <div>
                                {hasText(project.subtitle) ? (
                                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] sm:text-sm">
                                    {project.subtitle}
                                  </p>
                                ) : null}
                                {hasText(project.title) ? (
                                  <h3 className="mt-2 font-display text-2xl text-[color:var(--foreground)] sm:text-3xl">
                                    {project.title}
                                  </h3>
                                ) : null}
                              </div>
                            ) : null}

                            {hasText(project.href) && hasText(project.hrefLabel) ? (
                              <a
                                href={project.href}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-white/65 px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:bg-white/90 sm:w-auto"
                                target={project.href.startsWith("http") ? "_blank" : undefined}
                                rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                              >
                                {project.hrefLabel}
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            ) : null}
                          </div>

                          {hasText(project.description) ? (
                            <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
                              {project.description}
                            </p>
                          ) : null}

                          {project.stack.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-[color:var(--border)] bg-white/65 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[color:var(--foreground-soft)]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                ) : null}
              </FadeIn>
            ) : null}

            {showCapabilitiesSection ? (
              <FadeIn
                delay={0.12}
                id="capabilities"
                className="section-frame rounded-[1.6rem] px-4 py-6 sm:rounded-[2rem] sm:px-8 sm:py-8"
              >
                <SectionHeading
                  kicker={content.ui.sections.capabilities.kicker}
                  title={content.ui.sections.capabilities.title}
                  description={content.ui.sections.capabilities.description}
                />

                {content.capabilities.length > 0 ? (
                  <div className="mt-6 space-y-4 sm:mt-8">
                    {content.capabilities.map((group, index) => (
                      <div
                        key={`${group.title}-${index}`}
                        className="paper-tint rounded-[1.3rem] border border-[color:var(--border)] p-4 sm:rounded-[1.5rem] sm:p-5"
                      >
                        {hasText(group.title) ? (
                          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] sm:text-sm">
                            {group.title}
                          </h3>
                        ) : null}
                        {hasText(group.body) ? (
                          <div className="mt-4 border-l border-[color:var(--accent)]/20 pl-4 sm:pl-5">
                            {getTextParagraphs(group.body).map((paragraph) => (
                              <p
                                key={paragraph}
                                className="text-sm leading-8 text-[color:var(--foreground-soft)] sm:text-base"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </FadeIn>
            ) : null}
          </section>
        ) : null}

        {showContactSection ? (
          <FadeIn
            id="contact"
            className="section-frame rounded-[1.6rem] px-4 py-6 sm:rounded-[2rem] sm:px-8 sm:py-10"
          >
            <SectionHeading
              kicker={content.ui.sections.contact.kicker}
              title={content.ui.sections.contact.title}
              description={content.ui.sections.contact.description}
            />

            {showBestFor || showContactLinks ? (
              <div
                className={`mt-6 grid gap-4 sm:mt-8 ${
                  showBestFor && showContactLinks ? "xl:grid-cols-[1.1fr_0.9fr] xl:gap-4" : ""
                }`}
              >
                {showBestFor ? (
                  <div className="rounded-[1.4rem] border border-[color:var(--accent)]/25 bg-[color:var(--accent-soft)] p-4 sm:rounded-[1.7rem] sm:p-6">
                    {hasText(content.ui.sections.contact.bestForLabel) ? (
                      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)] sm:text-sm">
                        {content.ui.sections.contact.bestForLabel}
                      </p>
                    ) : null}
                    {hasText(content.ui.sections.contact.bestForText) ? (
                      <p className="mt-4 text-base leading-8 text-[color:var(--foreground)] sm:max-w-2xl sm:text-lg">
                        {content.ui.sections.contact.bestForText}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {showContactLinks ? (
                  <div className="grid gap-3">
                    {content.contactLinks.map((item) => (
                      <div
                        key={`${item.label}-${item.href}`}
                        className="paper-tint rounded-[1.25rem] border border-[color:var(--border)] p-4 sm:rounded-[1.4rem]"
                      >
                        <div className="min-w-0">
                          {hasText(item.label) ? (
                            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                              {item.label}
                            </p>
                          ) : null}
                          {hasText(item.display) ? (
                            <p className="mt-2 break-all text-base text-[color:var(--foreground)] sm:break-normal">
                              {item.display}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </FadeIn>
        ) : null}

        {hasText(content.ui.footer) ? (
          <footer className="px-1 pb-2 text-sm leading-7 text-[color:var(--muted)]">
            {content.ui.footer}
          </footer>
        ) : null}
      </div>
    </main>
  );
}

function getLocaleHref(locale: Locale) {
  return locale === defaultLocale ? "/" : `/?lang=${locale}`;
}

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

function hasAnyText(...values: Array<string | undefined | null>) {
  return values.some((value) => hasText(value));
}

function hasSectionHeading(section: {
  kicker: string;
  title: string;
  description: string;
}) {
  return hasAnyText(section.kicker, section.title, section.description);
}

function getTextParagraphs(value: string) {
  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-8rem] top-[-6rem] h-[18rem] w-[18rem] rounded-full bg-[color:var(--accent-soft)] blur-3xl sm:left-[-14rem] sm:top-[-10rem] sm:h-[34rem] sm:w-[34rem]" />
      <div className="absolute right-[-8rem] top-12 h-[14rem] w-[14rem] rounded-full bg-sky-300/20 blur-3xl sm:right-[-12rem] sm:top-24 sm:h-[28rem] sm:w-[28rem]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[14rem] w-[14rem] rounded-full bg-amber-300/15 blur-3xl sm:bottom-[-12rem] sm:h-[24rem] sm:w-[24rem]" />
    </div>
  );
}

function LanguageSwitch({
  currentLocale,
  label,
  options,
}: {
  currentLocale: Locale;
  label: string;
  options: {
    code: Locale;
    shortLabel: string;
    label: string;
  }[];
}) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 self-start xl:self-auto">
      {hasText(label) ? (
        <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          {label}
        </span>
      ) : null}
      <div className="inline-flex rounded-full border border-[color:var(--border)] bg-white/65 p-1">
        {options.map((option) => {
          const isActive = option.code === currentLocale;

          return (
            <Link
              key={option.code}
              href={getLocaleHref(option.code)}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              style={isActive ? { color: "#fffaf2" } : undefined}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[color:var(--foreground)] text-[color:var(--inverse-foreground)]"
                  : "text-[color:var(--foreground-soft)] hover:text-[color:var(--foreground)]"
              }`}
              title={option.label}
            >
              {option.shortLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  if (!hasSectionHeading({ kicker, title, description })) {
    return null;
  }

  return (
    <header className="max-w-3xl">
      {hasText(kicker) ? <p className="kicker">{kicker}</p> : null}
      {hasText(title) ? (
        <h2 className="mt-4 font-display text-3xl leading-tight text-[color:var(--foreground)] sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {hasText(description) ? (
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
          {description}
        </p>
      ) : null}
    </header>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  if (!hasText(value)) {
    return null;
  }

  return (
    <div className="paper-tint flex items-start gap-3 rounded-[1.1rem] border border-[color:var(--border)] px-4 py-3 sm:rounded-[1.2rem]">
      <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">{icon}</span>
      <div className="min-w-0">
        {hasText(label) ? (
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {label}
          </p>
        ) : null}
        <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)] sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}
