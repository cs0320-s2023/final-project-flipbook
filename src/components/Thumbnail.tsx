import React, { useEffect, useRef } from "react";
import { FrameData } from "./frameData";

export interface ThumbnailProps {
  data: FrameData;
  handleThumbnailClick: (frame: FrameData) => void;
  setCurrentFrame: (n: number) => void;
  onClick: (frame: FrameData) => void;
  // frameNumber: number;
}

function createYellowImage() {
  const width = 800; // width of the image
  const height = 600; // height of the image
  const channels = 4; // number of channels (R, G, B, Alpha)

  // Create an array to hold the pixel data
  const imageData = new Uint8ClampedArray(width * height * channels);

  // Loop through each pixel and set its value
  for (let i = 0; i < width * height; i++) {
    const index = i * channels;
    imageData[index] = 255; // R channel
    imageData[index + 1] = 255; // G channel
    imageData[index + 2] = 1; // B channel
    imageData[index + 3] = 255; // Alpha channel (fully opaque)
  }

  // Create a new ImageData object using the pixel data
  const blankImageData = new ImageData(imageData, width, height);
  return blankImageData;
}
const Thumbnail: React.FC<ThumbnailProps> = (props: ThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext("2d");

  useEffect(() => {
    if (canvasRef.current && props.data.image) {
      
      console.log("image data below this")
      console.log(props.data.image)
      // canvasRef.current.
      canvasRef.current.width = 80
      canvasRef.current.height = 60

      ctx?.putImageData(props.data.image, 0, 0, 0, 0, 800, 600);
      ctx?.scale(0.1, 0.1)

    }

  }, [props.data.image, canvasRef.current]);

  return (
    <canvas
      className="frameThumbnail"
      height={props.data.image.height}
      width={props.data.image.width}
      ref={canvasRef}
      onClick={() => props.handleThumbnailClick(props.data)}
    ></canvas>
  );
};

export default Thumbnail;
