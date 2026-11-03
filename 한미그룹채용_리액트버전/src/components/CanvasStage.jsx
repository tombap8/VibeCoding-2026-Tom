import { useEffect, useRef } from "react";

export default function CanvasStage({ variant, label }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const trackingAttribute =
    variant === "reading" ? "data-hanmi-reading-walker" : "data-hanmi-walker";

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      if (statusRef.current) {
        statusRef.current.textContent =
          "이 브라우저는 Canvas 2D를 지원하지 않습니다.";
      }
      return;
    }

    return () => {
      rootRef.current?.hanmiWalker?.destroy();
    };
  }, []);

  return (
    <div className="hanmi-walker" ref={rootRef} {...{ [trackingAttribute]: "" }}>
      <canvas
        ref={canvasRef}
        width="1920"
        height="1080"
        role="img"
        aria-label={label}
      />
      <span data-status="" role="status" ref={statusRef}>
        이미지 준비 중
      </span>
    </div>
  );
}
