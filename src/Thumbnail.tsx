import { FrameData } from "./frameData";
import { useEffect, useRef } from "react";

export interface ThumbnailProps {
  data: FrameData;
  setCurrentFrame: (n: FrameData) => void;
}
export default function Thumbnail(props: ThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext("2d");
  useEffect(() => {
    if (canvasRef.current && props.data.image) {
      ctx?.putImageData(props.data.image, 0, 0, 0, 0, 80, 60);
    }
  }, [props.data.image, canvasRef.current]);

  return (
    <canvas
      className="frameThumbnail"
      height={props.data.image.height}
      width={props.data.image.width}
      ref={canvasRef}
      onClick={() => props.setCurrentFrame(props.data)}
    ></canvas>
  );
}
