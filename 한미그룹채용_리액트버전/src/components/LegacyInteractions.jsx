import { useEffect, useState } from "react";

const scripts = [
  `${import.meta.env.BASE_URL}hanmi-eye-tracking/metadata.js`,
  `${import.meta.env.BASE_URL}hanmi-eye-tracking/player.js`,
  `${import.meta.env.BASE_URL}js/main.js`,
  `${import.meta.env.BASE_URL}hanmi-reading-eye-tracking/metadata-v3.js`,
  `${import.meta.env.BASE_URL}hanmi-reading-eye-tracking/player-v3.js`,
];

function loadScript(source) {
  const existing = document.querySelector(`script[data-hanmi-src="${source}"]`);
  if (existing) {
    if (existing.dataset.loaded === "true") return Promise.resolve();
    if (existing.dataset.failed === "true") {
      return Promise.reject(new Error(`스크립트를 불러오지 못했습니다: ${source}`));
    }

    return new Promise((resolve, reject) => {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`스크립트를 불러오지 못했습니다: ${source}`)),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.dataset.hanmiSrc = source;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        script.dataset.failed = "true";
        reject(new Error(`스크립트를 불러오지 못했습니다: ${source}`));
      },
      { once: true },
    );
    document.body.append(script);
  });
}

export default function LegacyInteractions() {
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    scripts
      .reduce(
        (pending, source) => pending.then(() => loadScript(source)),
        Promise.resolve(),
      )
      .catch((cause) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!error) return null;

  return (
    <p className="runtime-error" role="alert">
      페이지 기능을 초기화하지 못했습니다. {error}
    </p>
  );
}
