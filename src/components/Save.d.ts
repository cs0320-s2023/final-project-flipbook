import { FrameActionData } from "./frameData";

export module './Save.jsx' {
    interface SaveProps {
      frames:FrameActionData[]
    }
  
    export default function Save(props: SaveProps);
  }
  