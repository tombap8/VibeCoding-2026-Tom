import CanvasStage from "./CanvasStage.jsx";

export default function FutureVisionSection() {
  return (
    <section className="mirae-visual" id="mirae-visual" aria-labelledby="mirae-title">
      <div className="mirae-inner">
        <h2 className="mirae-title" id="mirae-title">
          새로운 미래를 향해 나아갑니다
        </h2>
        <div className="mirae-scene">
          <img className="mirae-cloud mirae-cloud--left" src="/images/mirae_cloud1.png" alt="왼쪽 아래에 떠 있는 하얀 구름" />
          {" "}
          <img className="mirae-cloud mirae-cloud--upper" src="/images/mirae_cloud1.png" alt="멀리 떠 있는 흐릿한 구름" />
          {" "}
          <img className="mirae-cloud mirae-cloud--right" src="/images/mirae_cloud3.png" alt="오른쪽에서 떠다니는 커다란 하얀 구름" />
          {" "}
          <img className="mirae-cloud mirae-cloud--small" src="/images/mirae_cloud4.png" alt="오른쪽 아래의 작은 구름" />
          <CanvasStage
            variant="walking"
            label="마우스를 바라보며 지구 위를 걷는 캐릭터"
          />
          <img className="mirae-star mirae-star--top" src="/images/mirae_star1.png" alt="캐릭터 옆에서 빛나는 노란 별" />
          {" "}
          <img className="mirae-star mirae-star--bottom" src="/images/mirae_star2.png" alt="지구본 위에서 반짝이는 노란 별" />
        </div>
      </div>
    </section>
  );
}
