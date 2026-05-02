import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  BRAND,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
  breadcrumbJsonLd,
  localeAwareAlternates,
  safeJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Content = {
  eyebrow: string;
  headingNode: React.ReactNode;
  sub: string;
  ctaCadenza: string;
  ctaStories: string;
  body: React.ReactNode;
};

function buildContent(locale: Locale): Content {
  if (locale === "ko") {
    return {
      eyebrow: "About",
      headingNode: (
        <>
          사용자를{" "}
          <span className="anthropic-underline">중심</span>에 두고 만드는{" "}
          <span className="anthropic-underline">소프트웨어</span>.
        </>
      ),
      sub: "Lunive는 사용자를 존중하는 도구를 만드는 1인 소프트웨어 브랜드입니다.",
      ctaCadenza: "Cadenza 보기",
      ctaStories: "스토리 읽기",
      body: (
        <>
          <h2>Lunive에 대해</h2>
          <p>
            Lunive는 1인 소프트웨어 브랜드입니다. 이 이름으로 나오는 모든 것은 한 사람이 직접 디자인하고, 만들고, 운영합니다. 사용자를 존중하는 도구를 만드는 것이 이 브랜드의 존재 이유입니다. 똑똑해 보이는 화면보다 명료한 화면을, 기능을 모으는 방식보다 함께 지내기 편한 방식을 우선합니다.
          </p>

          <h2>왜 1인인지</h2>
          <p>
            만드는 사람이 적으면 결정이 일관되게 유지됩니다. 위원회가 짜는 로드맵이 없고, 회의에서 결정됐다는 이유로 출시되는 제품도 없습니다. 모든 릴리스는 한 사람이 진심으로 시간을 들일 만하다고 믿는 무엇입니다. 그것이 곧 한계이기도 합니다 — 더 큰 팀이라면 만들었을 것보다 늘 더 적게 만들 것이고, 그건 의도된 결과입니다.
          </p>

          <h2>첫 번째 제품</h2>
          <p>
            첫 번째 제품은{" "}
            <Link href="/cadenza" locale="ko">
              Cadenza
            </Link>
            입니다. 채팅 명령어 안에서 살게 하는 대신 진짜 잘 다듬어진 웹 대시보드를 함께 제공하는 디스코드 음악 봇입니다. 슬래시 명령어로 세션을 시작하면, 그 이후부터는 큐·검색·가사·재생이 한 번에 보이는 비공개 URL이 주어집니다. 봇은 봇 자체를 위해 존재하는 게 아닙니다. 대시보드가 핵심입니다.
          </p>
          <p>
            <Link href="/stories/building-cadenza" locale="ko">
              Cadenza를 만들면서 →
            </Link>
          </p>

          <h2>상표</h2>
          <p>
            <strong>Lunive™</strong>을 식별하는 명칭·로고·아이콘은 고유 마크로,{" "}
            <strong>한국특허청(KIPO)</strong>에 출원번호 40-2026-0034321(상품류 9·42)로 출원되어 우선권을 확보한 상태로 등록 심사 중입니다.
          </p>

          <h2>찾을 수 있는 곳</h2>
          <ul>
            <li>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                GitHub — github.com/lunivehq
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram — @lunivehq
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter) — @lunivehq
              </a>
            </li>
          </ul>
        </>
      ),
    };
  }

  return {
    eyebrow: "About",
    headingNode: (
      <>
        Software <span className="anthropic-underline">designed</span> around
        the <span className="anthropic-underline">people</span> who use it.
      </>
    ),
    sub: "Lunive is a one-person software brand making tools that respect their users.",
    ctaCadenza: "Meet Cadenza",
    ctaStories: "Read the stories",
    body: (
      <>
        <h2>What Lunive is</h2>
        <p>
          Lunive — pronounced <em>루나이브</em> in Korean — is a one-person software brand. Everything that ships under this name is designed, built, and operated by a single person. The brand exists to make tools that respect the people who use them: software that prefers a clear surface over a clever one, and that earns its place by being pleasant to live with rather than by collecting features.
        </p>

        <h2>Why one person</h2>
        <p>
          A small surface lets a lot of decisions stay coherent. There is no roadmap by committee. No product is shipped because a meeting decided it should be. Each release is something one person actually believes is worth your time. That is also the constraint: there will always be fewer products than a larger team could ship, and that is on purpose.
        </p>

        <h2>The first product</h2>
        <p>
          The first product is{" "}
          <Link href="/cadenza" locale="en">
            Cadenza
          </Link>{" "}
          — a Discord music bot that comes with a real, polished web dashboard instead of asking you to live inside chat commands. You start a session with a slash command, and from that point on you have a private URL where queue, search, lyrics, and playback are all visible at once. The bot does not exist for itself; the dashboard is the point.
        </p>
        <p>
          <Link href="/stories/building-cadenza" locale="en">
            Building Cadenza →
          </Link>
        </p>

        <h2>The trademark</h2>
        <p>
          The names, logos, and icons identifying <strong>Lunive™</strong> are proprietary marks, filed with the{" "}
          <strong>Korean Intellectual Property Office (KIPO)</strong> under Application No. 40-2026-0034321 (Class 9 & 42). The application is currently pending registration with priority rights established.
        </p>

        <h2>Where to find us</h2>
        <ul>
          <li>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
              GitHub — github.com/lunivehq
            </a>
          </li>
          <li>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram — @lunivehq
            </a>
          </li>
          <li>
            <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer">
              X (Twitter) — @lunivehq
            </a>
          </li>
        </ul>
      </>
    ),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ko" ? "Lunive 소개" : "About Lunive";
  const description =
    locale === "ko"
      ? "Lunive는 사용자 경험을 우선하는 1인 소프트웨어 브랜드입니다. 1인 운영, 상표, 첫 제품 Cadenza에 대해 소개합니다."
      : "Lunive is a one-person software brand focused on user experience. About the founder, the trademark, and the first product Cadenza.";
  return {
    title,
    description,
    alternates: localeAwareAlternates("/about", locale),
    openGraph: {
      title,
      description,
      url: absoluteUrl("/about", locale),
      type: "profile",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = buildContent(locale);

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "ko" ? "Lunive 소개" : "About Lunive",
    inLanguage: locale,
    url: absoluteUrl("/about", locale),
    mainEntity: {
      "@type": "Organization",
      name: BRAND.name,
      alternateName: BRAND.altName,
      url: SITE_URL,
      founder: { "@type": "Person", name: BRAND.founder },
    },
  };

  const breadcrumbsLd = breadcrumbJsonLd(
    [
      { name: t("nav.home"), path: "/" },
      { name: t("nav.about"), path: "/about" },
    ],
    locale,
  );

  return (
    <div className="stories-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(aboutLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbsLd) }}
      />

      {/* ─── Masthead — Stories-style typographic hero ─────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <h1 className="font-[family-name:var(--font-serif)] font-medium tracking-tight leading-[1.04] text-[clamp(2.75rem,6vw,5.5rem)] text-[var(--essay-text-strong)]">
            {c.headingNode}
          </h1>
          <p className="text-[var(--essay-muted)] text-base md:text-[17px] leading-[1.6] max-w-md md:pb-3">
            {c.sub}
          </p>
        </div>
        <div className="mt-10 md:mt-14 flex flex-wrap gap-3">
          <Link
            href="/cadenza"
            locale={locale}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--essay-text)] text-[var(--essay-bg)] text-sm font-medium hover:opacity-90 transition"
          >
            {c.ctaCadenza}
          </Link>
          <Link
            href="/stories"
            locale={locale}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
          >
            {c.ctaStories}
          </Link>
        </div>
      </section>

      {/* ─── Body — prose flow, no rigid grid ──────────────────────────── */}
      <section className="max-w-[720px] mx-auto px-6 pb-32">
        <article className="prose-essay">{c.body}</article>
      </section>
    </div>
  );
}
