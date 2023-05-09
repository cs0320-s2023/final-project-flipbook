import { FrameActionData } from "./frameData";
import { useSearchParams } from "react-router-dom";

export module './Save.jsx' {
    interface SaveProps {
      frames:FrameActionData[],
      urlpid:string|null
    }
  
    export default function Save(props: SaveProps);
  }
  