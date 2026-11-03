export default function InnovationSection() {
  return (
    <section className="innovation" id="innovation" aria-labelledby="innovation-title">
      <div className="innovation-inner">
        <header className="innovation-head">
          <h2 className="innovation-title" id="innovation-title">
            당신의 가능성,
            <br />
            한미그룹에서 더 크게 성장합니다
          </h2>
          <p className="innovation-lead">
            연구와 혁신으로 성장하며 글로벌 제약/바이오 기업을 향해 나아갑니다.
          </p>
        </header>
        <img className="innovation-deco innovation-deco--chemical" src="/images/inno_chemical.png" alt="" />
        {" "}
        <img className="innovation-deco innovation-deco--atom bigsmall" src="/images/inno_molecule1.png" alt="" />
        <div className="innovation-board">
          <ul className="innovation-news" aria-label="한미그룹 혁신 소식">
            <li>
              <div className="innovation-bubble">
                한미약품, 상반기 누적 매출 8,602억원...2분기 영업이익 117% 증가
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                “사업형 지주사 경쟁력 입증”...한미사이언스, 2분기 영업이익 71%↑ 2분기 매출 3,679억원...상반기 누적 매출 7,216억원 돌파
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                한미약품, 로슈 제넨텍에 비만신약 기술수출...최대 3조 2,000억 규모
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                “UCN2 이어 또...” 한미약품, 두 번째 근육 증가 비만신약 공개
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                명품 반열 오른 한미 ‘로수젯’...압도적 데이터 경쟁력으로 시장 석권 2년 연속 국내사 개발 전문의약품 시장 ‘1위’...올해 상반기 누적 처방액도 선두
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                “비만 넘어 항암으로 혁신 확장”...한미, AACR서 차세대 신약 대거 공개
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="innovation-bubble">
                한미 완전두유·케어미, 영양에 ‘맛’까지 인정...국제 우수 미각상 수상
                <svg viewBox="0 0 18 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M18 0 V18 H0 Q11 15 18 0Z" />
                </svg>
              </div>
            </li>
          </ul>
          <p className="innovation-note">
            말풍선을 클릭해서 기사를 확인해 보세요.
          </p>
        </div>
        <img className="innovation-deco innovation-deco--molecule updown" src="/images/inno_molecule2.png" alt="" />
      </div>
    </section>
  );
}
