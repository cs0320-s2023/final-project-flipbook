import { FrameData } from "./frameData"
import Whiteboard from "./board"
import Thumbnail from "./Thumbnail"
import "./styles/FrameInterface.css";
import { useState } from "react";
import { createMockFramesJSON } from "./frameMocks";

export interface FrameInterfaceProps {
    frames: FrameData[]
}

export default function FrameInterface(props: FrameInterfaceProps) {

    function findFrameIndex(frameNum: number):number {
        for(var i=0;i<props.frames.length;i++) {
            if(props.frames[i].frameNum==frameNum) {
                return i;
            }
        }
        return -1;

    }

    
    const [currentFrame,setCurrentFrame] = useState<number>(0);
    return (
        <>
        <div className="Frames">
            {props.frames.map((object:FrameData, i) => <Thumbnail setCurrentFrame={(value:number)=>setCurrentFrame(findFrameIndex(value))} key={i} data={object}/>)}   
        </div>
        <div className="whiteboardDisplay">
            <Whiteboard displayedFrame={props.frames[currentFrame]} setCurrentFrame={(frameNum:number)=> {setCurrentFrame(findFrameIndex(frameNum))}}/>
        </div>
        </>
    )
}