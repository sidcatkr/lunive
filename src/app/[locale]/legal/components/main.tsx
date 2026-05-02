import type { Locale } from "@/i18n/routing";

type Content = {
  eyebrow: string;
  headingNode: React.ReactNode;
  sub: string;
  body: React.ReactNode;
};

const TRADEMARK_BADGE_LABEL = {
  en: {
    appNo: "Application No.",
    classes: "Class 9 & 42 (KIPO)",
    status: "Pending — Priority Rights Established",
  },
  ko: {
    appNo: "출원번호",
    classes: "제 9 류 · 제 42 류 (KIPO)",
    status: "출원 완료 — 우선권 확보",
  },
} as const;

function TrademarkBadge({ locale }: { locale: Locale }) {
  const labels = TRADEMARK_BADGE_LABEL[locale];
  return (
    <div className="not-prose my-6 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-[var(--essay-border)] bg-[var(--essay-overlay)] px-4 py-3 font-[family-name:var(--font-sans)] text-[13px]">
      <span className="font-mono font-semibold tracking-wide text-[var(--essay-text-strong)]">
        {labels.appNo} 40-2026-0034321
      </span>
      <span className="text-[var(--essay-faint)]">·</span>
      <span className="text-[var(--essay-muted)]">{labels.classes}</span>
      <span className="text-[var(--essay-faint)]">·</span>
      <span className="inline-flex items-center gap-1.5 font-medium text-[var(--hero-accent)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--hero-accent)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--hero-accent)]" />
        </span>
        {labels.status}
      </span>
    </div>
  );
}

function ScamCallout({ locale }: { locale: Locale }) {
  return (
    <div className="not-prose my-6 rounded-md border border-[var(--essay-border)] bg-[var(--essay-overlay)] px-5 py-4 font-[family-name:var(--font-sans)]">
      <p className="text-[14px] leading-relaxed text-[var(--essay-text)]">
        {locale === "ko" ? (
          <>
            <strong className="font-semibold">⚠ 주의:</strong> 누군가 「Lunive」를 사칭하며 연애·투자·금전을 요구하는 연락을 받았다면 사기일 가능성이 높습니다.{" "}
            <strong className="font-semibold">
              Lunive는 해당 분야에서 일절 활동하지 않습니다.
            </strong>{" "}
            피해 발생 시 즉시 관계 기관에 신고해 주세요.
          </>
        ) : (
          <>
            <strong className="font-semibold">Warning:</strong> If someone claiming to represent &quot;Lunive&quot; has contacted you about dating, personal relationships, or investment, it is likely a scam.{" "}
            <strong className="font-semibold">
              Lunive does not operate in those domains.
            </strong>{" "}
            Please report any such encounters to your local authorities.
          </>
        )}
      </p>
    </div>
  );
}

function buildContent(locale: Locale): Content {
  if (locale === "ko") {
    return {
      eyebrow: "Legal",
      headingNode: (
        <>
          법적 고지 및{" "}
          <span className="anthropic-underline">지식재산권</span> 안내.
        </>
      ),
      sub: "마지막 업데이트 — 2026년 2월 20일.",
      body: (
        <>
          <h2>상표</h2>
          <p>
            <strong>&quot;Lunive&quot;</strong>라는 명칭, 로고, 그리고 이와 관련된 모든 디자인과 슬로건은 Lunive의 배타적 자산입니다. Lunive 브랜드는 2025년부터 소프트웨어 개발, 게임 제작, AI 서비스, SaaS 플랫폼 제공 분야에서 사용되어 왔습니다.
          </p>
          <TrademarkBadge locale={locale} />
          <p>
            당사는 특허청(KIPO)에 상표를 출원함으로써 출원일을 기준으로 대한민국 내{" "}
            <strong>「Lunive」 상표에 대한 법적 우선권(Priority Rights)</strong>을 확보하였습니다. 등록 완료 이전이라도 출원 사실 자체가 법적 보호의 근거가 됩니다.
          </p>

          <h2>타 브랜드와의 관계 부인</h2>
          <p>
            <strong>Lunive</strong>는 오직 <strong>소프트웨어(제 9 류)</strong> 및 <strong>IT 개발·서비스업(제 42 류)</strong> — 게임, AI, SaaS — 분야에서만 활동하는 독립 기술 브랜드입니다. 당사는 다음과 <strong>일체 무관</strong>합니다:
          </p>
          <ul>
            <li>
              유사 명칭을 사용해 데이트 사기, 피싱, 금전 편취 등 불법 행위를 벌이는 것으로 의심되는 외부 애플리케이션 및 서비스
            </li>
            <li>
              당사의 공식 카테고리(게임·AI·SaaS)와 무관한 소셜 미디어 계정, 메신저 채널, 외부 플랫폼 등 Lunive를 사칭하는 모든 경로
            </li>
          </ul>
          <ScamCallout locale={locale} />

          <h2>저작권</h2>
          <p>
            <strong>Copyright © 2025–2026 Lunive. All Rights Reserved.</strong>
          </p>
          <p>
            본 웹사이트 및 당사가 제공하는 모든 서비스에 포함된 텍스트, 그래픽, 로고, 아이콘, 이미지, 소스 코드, 소프트웨어 등에 대한 저작권은 Lunive에 귀속되며, 대한민국 저작권법 및 국제 조약에 의해 보호됩니다. 당사의 서면 동의 없는 무단 복제·배포·전송·변형 행위는 민형사상 법적 책임을 질 수 있습니다.
          </p>

          <h2>부정경쟁행위 금지 및 경고</h2>
          <p>
            타인의 상표와 유사한 명칭을 사용해 소비자를 혼동하게 하거나 브랜드 가치를 훼손하는 행위는{" "}
            <strong>「부정경쟁방지 및 영업비밀보호에 관한 법률」</strong> 위반에 해당합니다. 당사는 Lunive 브랜드를 도용하거나 교묘하게 변경해 사용하는 행위에 대해 엄중히 모니터링하고 있으며, 적발 시 예고 없이 강력한 법적 조치를 취할 수 있습니다.
          </p>
        </>
      ),
    };
  }

  return {
    eyebrow: "Legal",
    headingNode: (
      <>
        Legal notice &{" "}
        <span className="anthropic-underline">intellectual property</span>{" "}
        rights.
      </>
    ),
    sub: "Last updated — February 20, 2026.",
    body: (
      <>
        <h2>Trademark</h2>
        <p>
          The name <strong>&quot;Lunive&quot;</strong>, the Lunive logo, and all related names, design marks, and slogans are the trademarks or service marks of Lunive (&quot;the Company&quot;). The Lunive brand has been in commercial use since 2025, engaging in software development, game development, AI services, and SaaS products.
        </p>
        <TrademarkBadge locale={locale} />
        <p>
          By filing with the Korean Intellectual Property Office (KIPO), Lunive has established <strong>legal priority rights</strong> over the &quot;Lunive&quot; mark in the territory of the Republic of Korea as of the filing date. All rights are reserved pending registration.
        </p>

        <h2>Non-affiliation</h2>
        <p>
          <strong>Lunive</strong> is an independent technology brand operating exclusively in the fields of <strong>software (Class 9)</strong> and <strong>IT development services (Class 42)</strong> — including games, AI products, and SaaS platforms. We are <strong>not</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with:
        </p>
        <ul>
          <li>
            Any third-party applications using a similar name suspected of operating dating scams, romance fraud, phishing schemes, or other deceptive or criminal activities.
          </li>
          <li>
            Any social media accounts, messaging platforms, or external services impersonating Lunive for purposes unrelated to our official product categories.
          </li>
        </ul>
        <ScamCallout locale={locale} />

        <h2>Copyright</h2>
        <p>
          <strong>Copyright © 2025–2026 Lunive. All Rights Reserved.</strong>
        </p>
        <p>
          All content included on this website — text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software — is the property of Lunive and is protected by international copyright laws. Any unauthorized reproduction, modification, distribution, transmission, republication, display, or performance of the content on this site is strictly prohibited.
        </p>

        <h2>Unfair competition & typosquatting</h2>
        <p>
          We actively monitor the marketplace for unauthorized use of our intellectual property. Using a name confusingly similar to &quot;Lunive&quot; to mislead consumers or damage our brand reputation constitutes a violation of <strong>Unfair Competition Prevention</strong> laws. We reserve the right to take necessary legal action against any such infringements to protect our brand identity and our users.
        </p>
      </>
    ),
  };
}

export default function LegalMain({ locale }: { locale: Locale }) {
  const c = buildContent(locale);

  return (
    <div className="stories-layout">
      {/* ─── Masthead ──────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <h1 className="font-[family-name:var(--font-serif)] font-medium tracking-tight leading-[1.04] text-[clamp(2.5rem,5.4vw,4.75rem)] text-[var(--essay-text-strong)]">
            {c.headingNode}
          </h1>
          <p className="text-[var(--essay-muted)] text-base md:text-[17px] leading-[1.6] max-w-md md:pb-3">
            {c.sub}
          </p>
        </div>
      </section>

      {/* ─── Body — prose flow ─────────────────────────────────────────── */}
      <section className="max-w-[720px] mx-auto px-6 pb-32">
        <article className="prose-essay">{c.body}</article>
      </section>
    </div>
  );
}
