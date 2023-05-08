import React, { useEffect, useRef } from "react";
import { FrameData } from "./frameData";

export interface ThumbnailProps {
  data: FrameData;
  setCurrentFrame: (n: FrameData) => void;
  onClick: (frame: FrameData) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  data,
  setCurrentFrame,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext("2d");

  useEffect(() => {
    ctx?.putImageData(data.image, 0, 0, 0, 0, 80, 60);
  }, [data, ctx]);

  const handleClick = () => {
    onClick(data);
    setCurrentFrame(data);
  };

  return (
    <canvas
      className="frameThumbnail"
      height={data.image.height}
      width={data.image.width}
      ref={canvasRef}
      onClick={handleClick}
    ></canvas>
  );
};

export default Thumbnail;
