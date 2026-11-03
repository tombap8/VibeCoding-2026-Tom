import { publicAsset } from "../publicAsset.js";
export default function WelfareSection() {
  return (
    <section className="welfare" id="welfare" aria-labelledby="welfare-title">
      <div className="welfare-inner">
        <header className="welfare-head">
          <h2 className="welfare-title" id="welfare-title">
            한미 생활을
            <br className="welfare-title-break" />
            더 즐겁게 만드는 방법
          </h2>
          <p className="welfare-lead">
            건강부터 성장, 휴식까지 알차게 준비한 복지를 소개할게요.
          </p>
          <img className="welfare-character updown" src={publicAsset("images/con5_char.png")} alt="화장품과 거울을 든 한미 캐릭터" />
        </header>
        <div className="welfare-scrollbox">
          <ul className="welfare-list" aria-label="한미그룹 회사 복지" />
          <p className="welfare-data-error" role="alert" hidden />
        </div>
        <img className="welfare-cloud" src={publicAsset("images/con5_cloud.png")} alt="간식을 들고 있는 한미 캐릭터" />
      </div>
    </section>
  );
}
