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
            Last updated: February 12, 2026
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
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    The name "<strong className="text-white">Lunive</strong>",
                    the Lunive logo, and all related names, design marks, and
                    slogans are the trademarks or service marks (TM) of Lunive
                    ("the Company"). The "Lunive" brand has been in commercial
                    use since 2025, engaging in software development, game
                    development, and web services.
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
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6">
                    <strong className="text-white">Lunive</strong> is an
                    independent software development brand. We are{" "}
                    <strong className="text-white">NOT</strong> affiliated,
                    associated, authorized, endorsed by, or in any way
                    officially connected with:
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        Any third-party applications similarly named that are
                        currently suspected of fraudulent activities or scams.
                      </span>
                    </li>
                  </ul>
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
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    "<strong className="text-white">Lunive</strong>" 라는 명칭,
                    로고, 그리고 이와 관련된 모든 디자인과 슬로건은 Lunive 의
                    배타적 소유이며, 현재 상표법에 따른 권리 보호를 받고 있거나
                    출원 중에 있습니다 (TM). Lunive 브랜드는 2025년부터
                    소프트웨어 개발, 게임 제작, 웹 서비스 제공을 목적으로
                    사용되어 왔으며, 이에 대한 우선적인 권리를 주장합니다.
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
                <div className="pl-0 sm:pl-16">
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6">
                    <strong className="text-white">Lunive</strong>는 독립적인
                    소프트웨어 개발 브랜드입니다. 당사는 다음과 같은 타사 또는
                    서비스와 전혀 관련이 없음을 명확히 밝힙니다.
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-2">—</span>
                      <span className="text-base sm:text-lg leading-relaxed">
                        유사 명칭을 사용하여 데이트 사기 및 피싱 의혹을 받고
                        있는 불법 애플리케이션
                      </span>
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mt-6">
                    당사는 오직{" "}
                    <strong className="text-gray-300">소프트웨어(제9류)</strong>{" "}
                    및 <strong className="text-gray-300">개발업(제42류)</strong>{" "}
                    분야에서만 활동합니다.
                  </p>
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
