import { publicAsset } from "../publicAsset.js";
export default function ExpositionSection() {
  return (
    <section className="exposition" id="exposition" aria-labelledby="exposition-title">
      <div className="exposition-inner">
        <header className="exposition-head">
          <img className="exposition-character updown" src={publicAsset("images/expo_char.png")} alt="" />
          <div className="exposition-heading">
            <h2 className="exposition-title" id="exposition-title">
              Hanmi 박람회/캠퍼스로 출발!
            </h2>
            <p className="exposition-description">
              한미그룹이 여러분을 만나러 박람회와 캠퍼스로 찾아갑니다.
              <br />
              우리가 어디서 만날지 궁금하다면 아래 지역에서 찾아보세요!
            </p>
            <p className="exposition-hint">
              학교명/장소를 클릭하거나 터치하면 세부장소를 확인하실 수 있습니다.
            </p>
          </div>
        </header>
        <div className="exposition-switcher">
          <div className="exposition-tabs" role="tablist" aria-label="박람회 및 캠퍼스 일정">
            <button className="exposition-tab" id="exposition-tab-fair" type="button" role="tab" aria-selected="true" aria-controls="exposition-panel-fair" tabIndex="0">
              박람회
            </button>
            {" "}
            <button className="exposition-tab" id="exposition-tab-campus" type="button" role="tab" aria-selected="false" aria-controls="exposition-panel-campus" tabIndex="-1">
              캠퍼스
            </button>
          </div>
          <div className="exposition-panel" id="exposition-panel-fair" role="tabpanel" aria-labelledby="exposition-tab-fair">
            <div className="exposition-fair-grid" />
          </div>
          <div className="exposition-panel" id="exposition-panel-campus" role="tabpanel" aria-labelledby="exposition-tab-campus" hidden>
            <div className="exposition-campus-controls">
              <div className="exposition-regions" role="tablist" aria-label="캠퍼스 방문 지역">
                <button className="exposition-region" id="exposition-region-seoul" type="button" role="tab" data-region="seoul" aria-selected="true" aria-controls="exposition-campus-schedule" tabIndex="0">
                  서울
                </button>
                {" "}
                <button className="exposition-region" id="exposition-region-gyeonggi" type="button" role="tab" data-region="gyeonggi" aria-selected="false" aria-controls="exposition-campus-schedule" tabIndex="-1">
                  경기
                </button>
                {" "}
                <button className="exposition-region" id="exposition-region-gangwon" type="button" role="tab" data-region="gangwon" aria-selected="false" aria-controls="exposition-campus-schedule" tabIndex="-1">
                  강원
                </button>
                {" "}
                <button className="exposition-region" id="exposition-region-gyeongsang" type="button" role="tab" data-region="gyeongsang" aria-selected="false" aria-controls="exposition-campus-schedule" tabIndex="-1">
                  경상
                </button>
                {" "}
                <button className="exposition-region" id="exposition-region-chungcheong" type="button" role="tab" data-region="chungcheong" aria-selected="false" aria-controls="exposition-campus-schedule" tabIndex="-1">
                  충청
                </button>
                {" "}
                <button className="exposition-region" id="exposition-region-jeolla" type="button" role="tab" data-region="jeolla" aria-selected="false" aria-controls="exposition-campus-schedule" tabIndex="-1">
                  전라
                </button>
              </div>
            </div>
            <div className="exposition-campus-schedule" id="exposition-campus-schedule" role="tabpanel" aria-labelledby="exposition-region-seoul" />
          </div>
        </div>
      </div>
    </section>
  );
}
