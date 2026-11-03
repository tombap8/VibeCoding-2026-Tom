import "../css/main.css";
import LegacyInteractions from "./components/LegacyInteractions.jsx";
import MainContent from "./components/MainContent.jsx";
import ScrollSmoothingToggle from "./components/ScrollSmoothingToggle.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import SiteHeader from "./components/SiteHeader.jsx";

export default function App() {
  return (
    <>
      <ScrollSmoothingToggle />
      <SiteHeader />
      <MainContent />
      <SiteFooter />
      <LegacyInteractions />
    </>
  );
}
