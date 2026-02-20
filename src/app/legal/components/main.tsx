"use client";

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <header className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Legal Notice &<br />
            Intellectual Property Rights
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: February 20, 2026
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Language Toggle */}
          <div className="flex gap-4 mb-16 pb-8 border-b border-gray-800/50">
            <a
              href="#english"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
            >
              English
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="#korean"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              한국어
            </a>
          </div>

          {/* English Version */}
          <article id="english" className="mb-24">
            <div className="space-y-16">
              {/* Section 1 */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Trademark Information
                  </h2>
                </div>
                <div className="pl-0 sm:pl-16 space-y-4">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    The name "<strong className="text-white">Lunive</strong>",
                    the Lunive logo, and all related names, design marks, and
                    slogans are the trademarks or service marks of Lunive ("the
                    Company"). The "Lunive" brand has been in commercial use
                    since 2025, engaging in software development, game
                    development, AI services, and SaaS products.
                  </p>
                  <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm">
                    <span className="font-mono font-semibold text-white tracking-wide">
                      Application No. 40-2026-0034321
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400">
                      Class 9 &amp; 42 (KIPO)
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                      </span>
                      Pending — Priority Rights Established
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    By filing with the Korean Intellectual Property Office
                    (KIPO), Lunive has established{" "}
                    <strong className="text-gray-300">
                      legal priority rights
                    </strong>{" "}
                    over the "Lunive" mark in the territory of the Republic of
                    Korea as of the filing date. All rights are reserved pending
                    registration.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Non-Affiliation Disclaimer
                  </h2>
                </div>
                <div className="pl-0 sm:pl-16 space-y-4">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    <strong className="text-white">Lunive</strong> is an
                    independent technology brand operating exclusively in the
                    fields of{" "}
                    <strong className="text-gray-300">
                      software (Class 9)
                    </strong>{" "}
                    and{" "}
                    <strong className="text-gray-300">
                      IT development services (Class 42)
                    </strong>
                    — including games, AI products, and SaaS platforms. We are{" "}
                    <strong className="text-white">NOT</strong> affiliated,
                    associated, authorized, endorsed by, or in any way
                    officially connected with:
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        Any third-party applications using a similar name that
                        are suspected of operating dating scams, romance fraud,
                        phishing schemes, or any other deceptive or criminal
                        activities.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        Any social media accounts, messaging platforms, or
                        external services impersonating Lunive for purposes
                        unrelated to our official product categories.
                      </span>
                    </li>
                  </ul>
                  <div className="rounded-md border border-red-900/50 bg-red-950/20 px-4 py-3">
                    <p className="text-sm text-red-400 leading-relaxed">
                      <strong className="text-red-300">Warning:</strong> If you
                      have been contacted by someone claiming to represent
                      "Lunive" in the context of dating apps, personal
                      relationships, or investment schemes, you are likely the
                      target of a scam.{" "}
                      <strong className="text-red-300">
                        Lunive does not operate in these domains.
                      </strong>{" "}
                      Please report such encounters to your local authorities.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Copyright Notice
                  </h2>
                </div>
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-4">
                    <strong className="text-gray-300">
                      Copyright © 2025-2026 Lunive. All Rights Reserved.
                    </strong>
                  </p>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    All content included on this website, such as text,
                    graphics, logos, button icons, images, audio clips, digital
                    downloads, data compilations, and software, is the property
                    of Lunive and is protected by international copyright laws.
                    Any unauthorized reproduction, modification, distribution,
                    transmission, republication, display, or performance of the
                    content on this site is strictly prohibited.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Unfair Competition & Typosquatting Warning
                  </h2>
                </div>
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    We actively monitor the marketplace for unauthorized use of
                    our intellectual property. Using a name confusingly similar
                    to "Lunive" to mislead consumers or damage our brand
                    reputation constitutes a violation of{" "}
                    <strong className="text-gray-300">
                      Unfair Competition Prevention
                    </strong>{" "}
                    laws. We reserve the right to take necessary legal action
                    against any such infringements to protect our brand identity
                    and our users.
                  </p>
                </div>
              </section>
            </div>
          </article>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-24" />

          {/* Korean Version */}
          <article id="korean">
            <div className="mb-12">
              <p className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">
                한국어
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                법적 고지 및 지식재산권 안내
              </h2>
            </div>

            <div className="space-y-16">
              {/* Section 1 - Korean */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    상표권 안내 (Trademark Notice)
                  </h3>
                </div>
                <div className="pl-0 sm:pl-16 space-y-4">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    &quot;<strong className="text-white">Lunive</strong>&quot;
                    라는 명칭, 로고, 그리고 이와 관련된 모든 디자인과 슬로건은
                    Lunive의 배타적 자산입니다. Lunive 브랜드는 2025년부터
                    소프트웨어 개발, 게임 제작, AI 서비스, SaaS 플랫폼 제공
                    분야에서 사용되어 왔습니다.
                  </p>
                  <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm">
                    <span className="font-mono font-semibold text-white tracking-wide">
                      출원번호 40-2026-0034321
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400">
                      제9류 및 제42류 (특허청, KIPO)
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                      </span>
                      출원 완료 — 심사 대기 중
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    당사는 특허청(KIPO)에 상표를 출원함으로써 출원일을 기준으로
                    대한민국 내「Lunive」상표에 대한{" "}
                    <strong className="text-gray-300">
                      법적 우선권(Priority Rights)
                    </strong>
                    을 확보하였습니다. 등록 완료 이전이라도 출원 사실 자체가
                    법적 보호의 근거가 됩니다.
                  </p>
                </div>
              </section>

              {/* Section 2 - Korean */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    타 브랜드 및 사칭 앱과의 관계 부인 (Disclaimer)
                  </h3>
                </div>
                <div className="pl-0 sm:pl-16 space-y-4">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    <strong className="text-white">Lunive</strong>는 오직{" "}
                    <strong className="text-gray-300">소프트웨어(제9류)</strong>{" "}
                    및{" "}
                    <strong className="text-gray-300">
                      IT 개발·서비스업(제42류)
                    </strong>
                    — 게임, AI, SaaS — 분야에서만 활동하는 독립적인 기술
                    브랜드입니다. 당사는 다음과 같은 타사 또는 서비스와
                    <strong className="text-white"> 일체 무관</strong>함을
                    단호히 밝힙니다:
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        유사 명칭을 사용하여 데이트 사기(로맨스 스캠), 피싱,
                        금전 편취 등 불법 행위를 벌이고 있는 것으로 의심되는
                        외부 애플리케이션 또는 서비스
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        당사의 공식 서비스 카테고리(게임·AI·SaaS)와 무관한 소셜
                        미디어 계정, 메신저 채널, 외부 플랫폼 등 Lunive를
                        사칭하는 모든 경로
                      </span>
                    </li>
                  </ul>
                  <div className="rounded-md border border-red-900/50 bg-red-950/20 px-4 py-3">
                    <p className="text-sm text-red-400 leading-relaxed">
                      <strong className="text-red-300">⚠ 주의:</strong> 누군가
                      「Lunive」를 사칭하며 연애·투자·금전을 요구하는 접촉을
                      받으셨다면, 이는 스캠일 가능성이 높습니다.{" "}
                      <strong className="text-red-300">
                        Lunive는 이러한 분야에서 일절 운영하지 않습니다.
                      </strong>{" "}
                      피해 발생 시 즉시 관련 기관에 신고하시기 바랍니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 - Korean */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    저작권 (Copyright)
                  </h3>
                </div>
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-4">
                    <strong className="text-gray-300">
                      Copyright © 2025-2026 Lunive. All Rights Reserved.
                    </strong>
                  </p>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    본 웹사이트 및 당사가 제공하는 모든 서비스에 포함된 텍스트,
                    그래픽, 로고, 아이콘, 이미지, 소스 코드, 소프트웨어 등에
                    대한 저작권은 Lunive에 귀속되며, 대한민국 저작권법 및 국제
                    조약에 의해 보호됩니다. 당사의 서면 동의 없는 무단 복제,
                    배포, 전송, 변형 행위는 민형사상 법적 책임을 질 수 있습니다.
                  </p>
                </div>
              </section>

              {/* Section 4 - Korean */}
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-gray-700">
                    04
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    부정경쟁행위 금지 및 경고
                  </h3>
                </div>
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    타인의 상표와 유사한 명칭을 사용하여 소비자를 혼동하게
                    하거나 브랜드 가치를 훼손하는 행위는{" "}
                    <strong className="text-gray-300">
                      '부정경쟁방지 및 영업비밀보호에 관한 법률'
                    </strong>{" "}
                    위반입니다. 당사는 Lunive 브랜드를 도용하거나 교묘하게
                    변경하여 사용하는 행위(사칭, 피싱 등)에 대해 엄중히
                    모니터링하고 있으며, 적발 시 예고 없이 강력한 법적 조치를
                    취할 수 있습니다.
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
