export default function MainVisualSection() {
  return (
    <section className="main-visual" id="main-visual" aria-label="한미그룹 2026년 하반기 공개채용">
      <div className="mv-container">
        <div className="mv-copy">
          <div className="mv-text">
            <h1 className="mv-title">
              <span className="mv-season">
                2026년 하반기
              </span>
              {" "}
              <span className="mv-title-wrap">
                <span className="mv-brand">
                  한미그룹
                </span>
                {" "}
                <span className="mv-kind">
                  공개채용
                </span>
              </span>
            </h1>
            <p className="mv-period">
              모집기간 : 2026.9.28(월) ~ 2026.10.18(일) 23:59까지
            </p>
          </div>
          <div>
            <a className="btn btn-main" href="#jobs">
              모집직무 바로가기!
            </a>
          </div>
        </div>
        <div className="mv-visual" aria-hidden="true">
          <div className="ring ring-glow" />
          <div className="ring ring-line" />
          <img className="micro updown" src="/images/mv_micro.png" alt="" />
          {" "}
          <img className="char1 updown" src="/images/mv_char1.png" alt="" />
          {" "}
          <img className="char2 updown" src="/images/mv_char2.png" alt="" />
          {" "}
          <img className="char3 updown" src="/images/mv_char3.png" alt="" />
          {" "}
          <img className="char4 updown" src="/images/mv_char4.png" alt="" />
          {" "}
          <span className="star star1" />
          {" "}
          <span className="star star2" />
          {" "}
          <span className="star star3" />
          {" "}
          <span className="star star3 big" />
          {" "}
          <span className="star star4" />
        </div>
        <a className="scroll-down" href="#jobs" aria-label="아래로 스크롤">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M10 15l10 10 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
