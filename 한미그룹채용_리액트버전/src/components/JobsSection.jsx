export default function JobsSection() {
  return (
    <section className="jobs" id="jobs" aria-labelledby="jobs-title">
      <img className="jobs-deco jobs-deco--bottle updown" src="/images/con3_bottle.png" width="442" height="692" alt="한미 로고가 새겨진 파란색 약병 일러스트" />
      <div className="jobs-inner">
        <header className="jobs-head">
          <div className="jobs-headline">
            <img className="jobs-logo" src="/images/con3_logo.png" width="216" height="193" alt="Hanmi 로고" />
            <h2 className="jobs-title" id="jobs-title">
              한미에서는 어떤 일을 할까요?
            </h2>
          </div>
          <p className="jobs-lead">
            일의 보람부터 성장의 순간까지, 먼저 경험한 현직자들이 솔직하게 들려드립니다.
          </p>
        </header>
        <img className="jobs-deco jobs-deco--char leftright" src="/images/con3_char.png" width="560" height="458" alt="서류 가방을 들고 출근하는 보라색 캐릭터" />
        <ul className="jobs-list">
          <li className="jobs-card">
            <figure className="jobs-photo">
              <img src="/images/con3_int1.png" width="1100" height="706" alt="실험 장비가 놓인 품질관리 연구실에서 주먹을 쥐어 보이며 웃고 있는 한미약품 이건호 사원" />
            </figure>
            <p className="jobs-desc">
              정밀한 시험과 분석으로 의약품의 품질을 확인해
              <br className="jobs-br" />
              안전하고 신뢰할 수 있는 의약품을 만들어갑니다.
            </p>
            <div className="jobs-foot">
              <p className="jobs-meta">
                <span className="jobs-dept">
                  한미약품 품질관리
                </span>
                {" "}
                <span className="jobs-name">
                  이건호 사원
                </span>
              </p>
              <a className="jobs-arrow" href="#jobs" aria-label="한미약품 품질관리 이건호 사원 인터뷰 보기">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </li>
          <li className="jobs-card">
            <figure className="jobs-photo">
              <img src="/images/con3_int2.png" width="1100" height="706" alt="밝은 사무 공간의 소파에 앉아 미소 짓고 있는 한미약품 박진하 연구원" />
            </figure>
            <p className="jobs-desc">
              신약 후보물질의 가능성을 과학적으로 검증해
              <br className="jobs-br" />
              새로운 치료제가 환자에게 향하는 첫걸음을 만듭니다.
            </p>
            <div className="jobs-foot">
              <p className="jobs-meta">
                <span className="jobs-dept">
                  한미약품 전임상연구
                </span>
                {" "}
                <span className="jobs-name">
                  박진하 연구원
                </span>
              </p>
              <a className="jobs-arrow" href="#jobs" aria-label="한미약품 전임상연구 박진하 연구원 인터뷰 보기">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </li>
        </ul>
        <div className="jobs-cta-wrap">
          <a className="btn btn-main jobs-cta" href="#jobs">
            모든 현직자 알아가기!
          </a>
        </div>
      </div>
    </section>
  );
}
