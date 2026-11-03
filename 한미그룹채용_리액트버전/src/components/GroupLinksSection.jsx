export default function GroupLinksSection() {
  return (
    <section className="con8" aria-label="한미그룹 바로가기">
      <img className="con8-character updown" src="/images/con8_char.png" alt="" aria-hidden="true" />
      <ul className="con8-list">
        <li className="con8-card">
          <a className="con8-card-link" href="#welfare">
            <span className="con8-image-wrap">
              <img className="con8-image" src="/images/con8_img1.jpg" alt="" loading="lazy" />
            </span>
            {" "}
            <span className="con8-card-description">
              한미그룹의 문화와 복지가 궁금하다면?
            </span>
            {" "}
            <span className="con8-card-action">
              한미그룹 복지 보러가기
              <span className="con8-arrow" aria-hidden="true">
                ›
              </span>
            </span>
            {" "}
            <span className="con8-markings" aria-hidden="true">
              <img className="con8-marking con8-marking--first-arrow" src="/images/con8_Image.png" alt="" />
              {" "}
              <img className="con8-marking con8-marking--first-star" src="/images/con8_Image-2.png" alt="" />
              {" "}
              <img className="con8-marking con8-marking--first-underline" src="/images/con8_Image-1.png" alt="" />
            </span>
          </a>
        </li>
        <li className="con8-card">
          <a className="con8-card-link" href="#tasks">
            <span className="con8-image-wrap">
              <img className="con8-image" src="/images/con8_img2.jpg" alt="" loading="lazy" />
            </span>
            {" "}
            <span className="con8-card-description">
              한미그룹의 직무가 궁금하다면?
            </span>
            {" "}
            <span className="con8-card-action">
              한미그룹 직무 소개 페이지
              <span className="con8-arrow" aria-hidden="true">
                ›
              </span>
            </span>
            {" "}
            <span className="con8-markings" aria-hidden="true">
              <img className="con8-marking con8-marking--second-arrow" src="/images/con8_Image-4.png" alt="" />
              {" "}
              <img className="con8-marking con8-marking--second-circle" src="/images/con8_Image-3.png" alt="" />
            </span>
          </a>
        </li>
        <li className="con8-card">
          <a className="con8-card-link" href="#requirement">
            <span className="con8-image-wrap">
              <img className="con8-image" src="/images/con8_img3.jpg" alt="" loading="lazy" />
            </span>
            {" "}
            <span className="con8-card-description">
              한미그룹의 채용소식을 빠르게 받고 싶다면?
            </span>
            {" "}
            <span className="con8-card-action">
              한미그룹 채용 안내 보러가기
              <span className="con8-arrow" aria-hidden="true">
                ›
              </span>
            </span>
            {" "}
            <span className="con8-markings" aria-hidden="true">
              <img className="con8-marking con8-marking--third-underline" src="/images/con8_Image-5.png" alt="" />
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
