export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#main-visual" aria-label="한미그룹 홈">
          <img src="/images/logo_svg.svg" alt="한미그룹 Hanmi" />
        </a>
        <nav className="gnb" id="gnb" aria-label="주요 메뉴">
          <div className="gnb-head">
            <img src="/images/logo_svg.svg" alt="한미그룹 Hanmi" />
            {" "}
            <button type="button" className="btn-close" aria-label="메뉴 닫기">
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="gnb-list">
            <li>
              <a href="#jobs">
                직무소개
              </a>
            </li>
            <li>
              <a href="#requirement">
                지원자격 및 접수방법
              </a>
            </li>
            <li>
              <a href="#exposition">
                채용설명회 일정
              </a>
            </li>
          </ul>
          <div className="gnb-cta">
            <a className="btn btn-apply" href="#apply">
              <span>
                지원하기
              </span>
              {" "}
              <svg viewBox="0 0 7 12" fill="none" aria-hidden="true">
                <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </nav>
        <a className="btn btn-apply header-apply" href="#apply">
          지원하기
        </a>
        {" "}
        <button type="button" className="btn-menu" aria-label="메뉴 열기" aria-controls="gnb" aria-expanded="false">
          <svg viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
