import { FrameData } from "./frameData";
import { useEffect, useRef } from "react";

export interface ThumbnailProps {
    data:FrameData
    setCurrentFrame:(n:FrameData)=>void
}
export default function Thumbnail(props: ThumbnailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = canvasRef.current?.getContext("2d");
    useEffect(() => {
        ctx?.putImageData(props.data.image, 0, 0,0,0,80,60);
        
      });
    
    
    

    return (<canvas className="frameThumbnail" 
    height={props.data.image.height} 
    width={props.data.image.width}
    ref={canvasRef}
    onClick={()=>props.setCurrentFrame(props.data)}
    ></canvas>)
}