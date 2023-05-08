import React, { useEffect, useRef } from "react";
import { FrameData } from "./frameData";

export interface ThumbnailProps {
  data: FrameData;
  setCurrentFrame: (n: number) => void;
  onClick: (frame: FrameData) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = (props: ThumbnailProps) => {
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
      onClick={() => props.setCurrentFrame(props.data.frameNum)}
    ></canvas>
  );
};

export default Thumbnail;
