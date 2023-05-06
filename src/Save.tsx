import { useEffect, useRef } from "react";
import { FrameInterfaceProps } from "./FrameInterface";

// export interface ThumbnailProps {
//   data: FrameData;
//   setCurrentFrame: (n: FrameData) => void;
// }

export default function Save(props: FrameInterfaceProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const ctx = canvasRef.current?.getContext("2d");
//   useEffect(() => {
//     ctx?.putImageData(props.data.image, 0, 0, 0, 0, 80, 60);
//   });

  async function save() {
    props.frames.forEach(function (value) {
        console.log(value);
    })
  }

  return (
      // Usage
      <button onClick={save}>Save</button>
  );
}
