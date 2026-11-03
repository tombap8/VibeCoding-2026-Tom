import { publicAsset } from "../publicAsset.js";
import CanvasStage from "./CanvasStage.jsx";

export default function TasksSection() {
  return (
    <section className="tasks" id="tasks" aria-labelledby="tasks-title">
      <div className="tasks-hero" aria-hidden="true">
        <img className="tasks-title-bg" src={publicAsset("images/tasks_bg_title.png")} alt="" />
        <CanvasStage
          variant="reading"
          label="돋보기를 들고 글을 읽는 한미 캐릭터"
        />
      </div>
      <div className="tasks-inner">
        <header className="tasks-intro">
          <h2 className="tasks-title" id="tasks-title">
            알약이를 따라
            <br />
            나에게 맞는 직무를 찾아봐요!
          </h2>
          <p className="tasks-lead">
            연구부터 생산, 영업, 경영지원까지 당신의 가능성이 빛날 자리를 안내해 드릴게요.
          </p>
        </header>
        <nav aria-label="직무 분야">
          <ul className="tasks-tabs" role="tablist">
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-0" aria-selected="true" aria-controls="tasks-content" data-category="0">
                R&amp;D
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-1" aria-selected="false" aria-controls="tasks-content" data-category="1" tabIndex="-1">
                생산/품질
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-2" aria-selected="false" aria-controls="tasks-content" data-category="2" tabIndex="-1">
                영업
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-3" aria-selected="false" aria-controls="tasks-content" data-category="3" tabIndex="-1">
                경영관리
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-4" aria-selected="false" aria-controls="tasks-content" data-category="4" tabIndex="-1">
                임상
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-5" aria-selected="false" aria-controls="tasks-content" data-category="5" tabIndex="-1">
                글로벌
              </button>
            </li>
            <li>
              <button className="tasks-tab" type="button" role="tab" id="tasks-tab-6" aria-selected="false" aria-controls="tasks-content" data-category="6" tabIndex="-1">
                헬스케어
              </button>
            </li>
          </ul>
        </nav>
        <div className="tasks-content" id="tasks-content" role="tabpanel" aria-labelledby="tasks-tab-0" />
        <p className="tasks-data-error" role="alert" hidden />
      </div>
      <dialog className="tasks-modal" aria-labelledby="tasks-modal-title">
        <div className="tasks-modal-header">
          <img className="tasks-modal-image" alt="" />
          {" "}
          <button className="tasks-modal-close" type="button" aria-label="상세 정보 닫기">
            ×
          </button>
        </div>
        <div className="tasks-modal-body">
          <div className="tasks-modal-summary">
            <div className="tasks-modal-heading">
              <h3 className="tasks-modal-title" id="tasks-modal-title" />
              <span className="tasks-modal-category" />
              {" "}
              <span className="tasks-modal-department" />
            </div>
            <p className="tasks-modal-experience" />
          </div>
          <div className="tasks-modal-content">
            <section className="tasks-modal-section">
              <h4>
                직무 내용
              </h4>
              <ul className="tasks-modal-duties" />
            </section>
            <section className="tasks-modal-section">
              <h4>
                자격 요건
              </h4>
              <ul className="tasks-modal-qualifications" />
            </section>
            <section className="tasks-modal-section tasks-modal-preferred-section">
              <h4>
                우대 사항
              </h4>
              <ul className="tasks-modal-preferred" />
            </section>
          </div>
        </div>
      </dialog>
    </section>
  );
}
