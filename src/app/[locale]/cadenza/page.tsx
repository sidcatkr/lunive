import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  ENTITY_ID,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
  breadcrumbJsonLd,
  localeAwareAlternates,
  publisherRef,
  safeJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CADENZA_GITHUB = "https://github.com/lunivehq/cadenza";
const CADENZA_DASHBOARD = "https://cadenza.lunive.app";
const CADENZA_INVITE =
  "https://discord.com/oauth2/authorize?client_id=1485472045171998901";

type Content = {
  eyebrow: string;
  headingNode: React.ReactNode;
  sub: string;
  ctas: {
    invite: string;
    dashboard: string;
    story: string;
    github: string;
  };
  body: React.ReactNode;
};

function buildContent(locale: Locale): Content {
  if (locale === "ko") {
    return {
      eyebrow: "Cadenza",
      headingNode: (
        <>
          디스코드 음악, 진짜{" "}
          <span className="anthropic-underline">인터페이스</span>로.
        </>
      ),
      sub: "슬래시 명령어 하나로 시작하면, 그다음부터는 검색·큐·가사·재생이 한눈에 보이는 비공개 대시보드에서 듣습니다.",
      ctas: {
        invite: "디스코드에 추가하기",
        dashboard: "대시보드 열기",
        story: "어떻게 만들었는지 →",
        github: "GitHub",
      },
      body: (
        <>
          <h2>한 줄 명령어, 별도 설정 없음</h2>
          <p>
            디스코드에서 <code>/play</code>를 치면 Cadenza가 음성 채널에 들어오고 비공개 대시보드 링크를 돌려줍니다. 권한 설정도, 접두어 기억도 필요 없습니다.
          </p>

          <h2>가사를 누르면 그 시점으로</h2>
          <p>
            곡에 맞춰 가사가 흘러가고, 모든 줄이 인터랙티브합니다. 누르면 재생 위치가 그 순간으로 점프합니다.
          </p>

          <h2>분위기를 만드는 앨범 아트</h2>
          <p>
            대시보드 배경이 지금 재생 중인 곡에 맞춰 색조를 바꿉니다. 곡을 조작하는 화면이 아니라, 곡 자체처럼 느껴집니다.
          </p>

          <h2>여러 출처를 동시에 검색</h2>
          <p>
            곡 이름을 치거나 URL을 붙여넣으면, YouTube와 SoundCloud에서 결과가 즉시 나옵니다. 가장 잘 들리는 쪽을 골라 재생할 수 있습니다.
          </p>

          <h2>오디오 이펙트 내장</h2>
          <p>
            5밴드 EQ와 Bass Boost, Nightcore, Vaporwave 같은 프리셋이 대시보드 안에 그대로 들어 있습니다.
          </p>

          <h2>어디서나 따라오는 라이브러리</h2>
          <p>
            디스코드로 로그인하면 좋아요와 플레이리스트가 서버와 기기를 넘나들며 유지됩니다.
          </p>

          <h2>프리미엄 마감, 무료 사용</h2>
          <p>Cadenza는 오픈 소스이며 무료입니다. 음악 사이에 결제 벽은 없습니다.</p>

          <h2>왜 만들었는지</h2>
          <p>
            Cadenza는{" "}
            <Link href="/about" locale="ko">
              Lunive
            </Link>
            의 첫 번째 제품입니다. 시작은 단순한 불편함이었습니다 — 채팅 명령어로 음악을 다루는 건 경험이 아니라 우회로입니다. 슬래시 명령어는 세션을 시작하는 방식이고, 대시보드는 실제로 머무는 곳입니다.
          </p>
          <p>
            <Link href="/stories/building-cadenza" locale="ko">
              Cadenza를 만들면서 →
            </Link>
          </p>
        </>
      ),
    };
  }

  return {
    eyebrow: "Cadenza",
    headingNode: (
      <>
        Discord music with a real{" "}
        <span className="anthropic-underline">interface</span>.
      </>
    ),
    sub: "Start with one slash command. From there, listen inside a private dashboard where search, queue, lyrics, and playback are all visible at once.",
    ctas: {
      invite: "Add to Discord",
      dashboard: "Open the dashboard",
      story: "Read how we built it →",
      github: "GitHub",
    },
    body: (
      <>
        <h2>One slash command, zero setup</h2>
        <p>
          Type <code>/play</code> in Discord. Cadenza joins your voice channel and hands you back a private dashboard URL. No roles to configure. No prefix to remember.
        </p>

        <h2>Click a lyric, jump there</h2>
        <p>
          Synced lyrics scroll alongside the song, and every line is interactive — tap one to seek playback to that moment.
        </p>

        <h2>Album art sets the mood</h2>
        <p>
          The dashboard background tints to whatever is currently playing, so the room feels like the song instead of a control panel for it.
        </p>

        <h2>Search across sources</h2>
        <p>
          Type a song name or paste a URL. Results appear instantly across YouTube and SoundCloud — pick whichever sounds best.
        </p>

        <h2>Audio effects built in</h2>
        <p>
          A 5-band EQ and presets like Bass Boost, Nightcore, and Vaporwave are right there in the dashboard.
        </p>

        <h2>Your library follows you</h2>
        <p>
          Sign in with Discord and your liked songs and playlists are persistent across servers and devices.
        </p>

        <h2>Premium polish, free</h2>
        <p>
          Cadenza is open and free. No paywalls in the way of the music.
        </p>

        <h2>Why it exists</h2>
        <p>
          Cadenza is the first product from{" "}
          <Link href="/about" locale="en">
            Lunive
          </Link>
          . It started from a simple frustration: managing music through chat commands is a workaround, not an experience. The slash commands are how you start a session; the dashboard is where you actually live.
        </p>
        <p>
          <Link href="/stories/building-cadenza" locale="en">
            Building Cadenza →
          </Link>
        </p>
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
  const title =
    locale === "ko"
      ? "Cadenza — 디스코드 음악, 진짜 인터페이스로"
      : "Cadenza — Discord music with a real interface";
  const description =
    locale === "ko"
      ? "Cadenza는 채팅 명령어 대신 비공개 웹 대시보드에서 검색·큐·가사·재생을 한눈에 다루는 디스코드 음악 봇입니다. Lunive의 첫 번째 제품."
      : "Cadenza is a Discord music bot with a private web dashboard for search, queue, lyrics, and playback — all visible at once. Lunive's first product.";

  return {
    title,
    description,
    alternates: localeAwareAlternates("/cadenza", locale),
    openGraph: {
      title,
      description,
      url: absoluteUrl("/cadenza", locale),
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitterHandle,
      creator: SOCIAL.twitterHandle,
      title,
      description,
    },
  };
}

export default async function CadenzaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = buildContent(locale);

  const breadcrumbsLd = breadcrumbJsonLd(
    [
      { name: t("nav.home"), path: "/" },
      { name: t("nav.cadenza"), path: "/cadenza" },
    ],
    locale,
  );

  // Locale-aware feature bullets — Google reads these into the SoftwareApp
  // rich product card. Each phrase is short and scannable (no full sentences)
  // because Google truncates around the comma in product carousel snippets.
  const featureList =
    locale === "ko"
      ? [
          "슬래시 명령어 한 줄, 별도 설정 없음",
          "동기화된 가사 — 줄을 누르면 그 시점으로 이동",
          "재생 곡에 맞춰 색조가 바뀌는 대시보드",
          "YouTube · SoundCloud 동시 검색",
          "5밴드 EQ · Bass Boost · Nightcore · Vaporwave",
          "디스코드 로그인으로 라이브러리 자동 동기화",
          "오픈 소스 · 무료 · 결제 벽 없음",
        ]
      : [
          "One slash command, zero setup",
          "Synced lyrics — tap a line to seek there",
          "Album-art tinted dashboard background",
          "Search across YouTube and SoundCloud at once",
          "5-band EQ, Bass Boost, Nightcore, Vaporwave",
          "Discord login syncs library across devices",
          "Open source, free, no paywalls",
        ];

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": ENTITY_ID.cadenza,
    name: "Cadenza",
    description:
      locale === "ko"
        ? "Cadenza는 디스코드 음악 봇과 실시간 웹 대시보드입니다. 검색, 큐, 가사, 재생을 한눈에."
        : "Cadenza is a Discord music bot paired with a real-time web dashboard for search, queue, lyrics, and playback.",
    applicationCategory: "MusicApplication",
    applicationSubCategory: "Discord Bot",
    operatingSystem: "Web, Discord",
    inLanguage: locale,
    url: absoluteUrl("/cadenza", locale),
    installUrl: CADENZA_INVITE,
    downloadUrl: CADENZA_INVITE,
    sameAs: [CADENZA_DASHBOARD, CADENZA_GITHUB],
    image: `${SITE_URL}/${locale}/opengraph-image`,
    screenshot: `${SITE_URL}/${locale}/opengraph-image`,
    featureList,
    creator: publisherRef(),
    publisher: publisherRef(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  // FAQPage — extract Q/A pairs from the body copy. Eligible for the FAQ
  // rich result (a vertically-stacked accordion of questions directly in
  // SERP), which is high-value SERP real estate for low-competition brand
  // queries like "Cadenza Discord bot lyrics", "Cadenza free?", etc.
  const faqs =
    locale === "ko"
      ? [
          {
            q: "어떻게 시작하나요?",
            a: "디스코드에서 /play 명령어를 입력하면 Cadenza가 음성 채널에 입장하고 비공개 대시보드 URL을 돌려줍니다. 권한 설정도, 접두어 기억도 필요 없습니다.",
          },
          {
            q: "가사를 누르면 그 시점으로 점프하나요?",
            a: "네. 곡과 동기화된 가사가 흘러가고, 모든 줄이 인터랙티브합니다. 누르면 재생 위치가 그 순간으로 이동합니다.",
          },
          {
            q: "어떤 음악 출처를 검색하나요?",
            a: "곡 이름을 입력하거나 URL을 붙여넣으면 YouTube와 SoundCloud에서 결과가 즉시 나옵니다.",
          },
          {
            q: "오디오 이펙트가 있나요?",
            a: "5밴드 EQ와 Bass Boost, Nightcore, Vaporwave 같은 프리셋이 대시보드에 그대로 들어 있습니다.",
          },
          {
            q: "유료인가요?",
            a: "Cadenza는 오픈 소스이며 완전 무료입니다. 음악 사이에 결제 벽은 없습니다.",
          },
          {
            q: "내 라이브러리는 어디에 저장되나요?",
            a: "디스코드로 로그인하면 좋아요와 플레이리스트가 서버와 기기를 넘나들며 동기화됩니다.",
          },
        ]
      : [
          {
            q: "How do I get started with Cadenza?",
            a: "Type /play in Discord. Cadenza joins your voice channel and hands you back a private dashboard URL. No roles to configure, no prefix to remember.",
          },
          {
            q: "Can I jump to a specific point in a lyric?",
            a: "Yes. Synced lyrics scroll alongside the song, and every line is interactive — tap one to seek playback to that exact moment.",
          },
          {
            q: "Where does Cadenza search for music?",
            a: "Type a song name or paste a URL. Results appear instantly across YouTube and SoundCloud — pick whichever sounds best.",
          },
          {
            q: "Does Cadenza have audio effects?",
            a: "Yes — a 5-band EQ and presets like Bass Boost, Nightcore, and Vaporwave are built into the dashboard.",
          },
          {
            q: "Is Cadenza free?",
            a: "Cadenza is open source and completely free. There are no paywalls between you and the music.",
          },
          {
            q: "Where is my library stored?",
            a: "Sign in with Discord. Your liked songs and playlists are persistent across servers and devices.",
          },
        ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="stories-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqLd) }}
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
          <a
            href={CADENZA_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5865F2] text-white text-sm font-medium hover:opacity-90 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09a.09.09 0 0 0-.07-.03c-1.5.26-2.93.71-4.27 1.33a.07.07 0 0 0-.03.03C2.18 9.31 1.45 13.18 1.81 17a.1.1 0 0 0 .03.07 19.55 19.55 0 0 0 5.85 2.96.07.07 0 0 0 .08-.03c.45-.62.85-1.27 1.2-1.96.02-.04 0-.09-.05-.1a13 13 0 0 1-1.83-.87.07.07 0 0 1-.01-.13l.36-.28a.07.07 0 0 1 .07 0 14 14 0 0 0 11.99 0c.02-.01.05-.01.07 0l.36.28c.03.03.03.08-.01.13-.59.34-1.2.64-1.83.87a.07.07 0 0 0-.04.1c.36.69.77 1.34 1.2 1.96.01.02.05.03.08.03 1.92-.6 3.86-1.5 5.85-2.96a.07.07 0 0 0 .03-.07c.43-4.4-.72-8.24-3.05-11.64a.06.06 0 0 0-.03-.03zM8.52 14.91c-1.18 0-2.16-1.08-2.16-2.4 0-1.32.96-2.4 2.16-2.4 1.21 0 2.18 1.09 2.16 2.4 0 1.32-.96 2.4-2.16 2.4zm6.97 0c-1.18 0-2.16-1.08-2.16-2.4 0-1.32.96-2.4 2.16-2.4 1.21 0 2.18 1.09 2.16 2.4 0 1.32-.95 2.4-2.16 2.4z" />
            </svg>
            {c.ctas.invite}
          </a>
          <a
            href={CADENZA_DASHBOARD}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--essay-text)] text-[var(--essay-bg)] text-sm font-medium hover:opacity-90 transition"
          >
            {c.ctas.dashboard}
          </a>
          <Link
            href="/stories/building-cadenza"
            locale={locale}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
          >
            {c.ctas.story}
          </Link>
          <a
            href={CADENZA_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-[var(--essay-muted)] text-sm font-medium hover:text-[var(--essay-text)] transition"
          >
            {c.ctas.github}
          </a>
        </div>
      </section>

      {/* ─── Body — prose flow ─────────────────────────────────────────── */}
      <section className="max-w-[720px] mx-auto px-6 pb-32">
        <article className="prose-essay">{c.body}</article>
      </section>
    </div>
  );
}
