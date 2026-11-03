export default function CountdownSection() {
  return (
    <section className="con9" aria-labelledby="con9-title">
      <img className="con9-cloud con9-cloud--left" src="/images/con9_cloud_l.png" alt="" aria-hidden="true" />
      {" "}
      <img className="con9-cloud con9-cloud--right" src="/images/con9_cloud_r.png" alt="" aria-hidden="true" />
      <div className="con9-content">
        <h2 className="con9-title" id="con9-title">
          당신에게 딱 맞는 자리를 찾으러 출발!
        </h2>
        <p className="con9-countdown" aria-label="지원 마감까지 남은 시간">
          <span className="con9-countdown-unit">
            <span className="con9-countdown-value" data-countdown="days">
              03
            </span>
            일
          </span>
          {" "}
          <span className="con9-countdown-unit">
            <span className="con9-countdown-value" data-countdown="hours">
              17
            </span>
            시간
          </span>
          {" "}
          <span className="con9-countdown-unit">
            <span className="con9-countdown-value" data-countdown="minutes">
              10
            </span>
            분
          </span>
          {" "}
          <span className="con9-countdown-unit">
            <span className="con9-countdown-value" data-countdown="seconds">
              00
            </span>
            초 남았어요
          </span>
        </p>
        <p className="con9-expired" hidden>
          지원 기간이 종료되었습니다.
        </p>
      </div>
      <div className="con9-action">
        <img className="con9-earth" src="/images/con9_earth.png" alt="" aria-hidden="true" />
        {" "}
        <a className="con9-apply" href="#requirement">
          지원하기
          <span className="con9-arrow" aria-hidden="true">
            ›
          </span>
        </a>
      </div>
      <p className="con9-note">
        아이콘을 클릭해서 지원해주세요!
      </p>
    </section>
  );
}
