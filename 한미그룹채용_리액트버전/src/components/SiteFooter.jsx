import { publicAsset } from "../publicAsset.js";
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a href="#main-visual" aria-label="한미그룹 홈으로 이동">
          <img className="footer-logo" src={publicAsset("images/logo_svg.svg")} alt="한미그룹 Hanmi" />
        </a>
      </div>
    </footer>
  );
}
