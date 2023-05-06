import { FrameData } from "./frameData"
import Whiteboard from "./board"
import Thumbnail from "./Thumbnail"
import "./styles/FrameInterface.css";
import { useState } from "react";
import Save from "./Save";

export interface FrameInterfaceProps {
    frames: FrameData[]
}

export default function FrameInterface(props: FrameInterfaceProps) {

    const [currentFrame,setCurrentFrame] = useState<FrameData>(props.frames[0]);

    return (
        <>
        <div className="Frames">
            {props.frames.map((object:FrameData, i) => <Thumbnail setCurrentFrame={setCurrentFrame} key={i} data={object}/>)}   
        </div>
        <div className="whiteboardDisplay">
            <Whiteboard currentFrame={currentFrame} setCurrentFrame={setCurrentFrame}/>
        </div>
        <div className="Save">
            <Save frames={props.frames}  ></Save>
        </div>
        </>
    )
}