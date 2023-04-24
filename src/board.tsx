import React, { useState,useRef } from "react"
interface DrawState {
    color:string,
    x?:number,
    y?:number
}
export default function Whiteboard() {
    let current:DrawState = {color:'black'};
    function throttledMouseMove(e: React.MouseEvent<HTMLCanvasElement,MouseEvent>,delay:number) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            mouseMove(e);
          }
        };
      }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement,MouseEvent>) {
        if(!drawing) {
            return;
        }
        if(current.x!=undefined&&current.y!=undefined){
            console.log('drawing move');
            drawLine(current.x,current.y,e.clientX,e.clientY,current.color);
        }
        // setCurrent(prev => ({
        //     ...prev,
        //     x:e.clientX,
        //     y:e.clientY
        // }));
        current = {
            color:current.color,
            x:e.clientX,
            y:e.clientY
        }
        
    }

    function mouseUp(e: React.MouseEvent<HTMLCanvasElement,MouseEvent>) {
        if(!drawing) {
            return;
        }
        setDrawing(false);
        if(current.x!=undefined&&current.y!=undefined){
            drawLine(current.x,current.y,e.clientX,e.clientY,current.color);
        }
        
    }

    function mouseDown(e: React.MouseEvent<HTMLCanvasElement,MouseEvent>) {
        setDrawing(true);
        // setCurrent(prev => ({
        //     ...prev,
        //     x:e.clientX,
        //     y:e.clientY
        // }));
        current = {
            color:current.color,
            x:e.clientX,
            y:e.clientY
        }
    }
    

    const [drawing,setDrawing] = useState<boolean>(false);
    const maybeBoard = document.getElementsByClassName("board-canvas");

    const boardRef = useRef<HTMLCanvasElement|null>(null);
    // const [current,setCurrent] = useState<DrawState>({
    //     color:'black'
    // });
   

    function drawLine(x1:number,y1:number,x2:number,y2:number,color:string):void {
        if(boardRef!=null&&boardRef.current!=null) {
            const context:undefined|CanvasRenderingContext2D|null = boardRef.current.getContext('2d');
            if(context instanceof CanvasRenderingContext2D) {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.strokeStyle = color;
                context.lineWidth = 2;
                context.stroke();
                context.closePath();
            }
        }
    }

    
    return (
        <div className="whiteboard">
            <canvas className="board-canvas"
            width={800}
            height={800}
            onMouseDown={(e)=>{mouseDown(e)}}
            onMouseUp={(e)=>{mouseUp(e)}}
            onMouseMove={(e)=>{mouseMove(e)}}
            ref={boardRef}></canvas>
        </div>
        
    );
}