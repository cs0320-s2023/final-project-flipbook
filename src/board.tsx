import React, { useState,useRef } from "react"
import "./styles/board.css";

interface DrawState {
    color:string,
    x?:number,
    y?:number
}
export default function Whiteboard() {
    let current:DrawState = {color:'#000000'};
    let currentColor:string = '#000000';
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
            drawLine(current.x,current.y,e.clientX,e.clientY,currentColor);
        }
        // setCurrent(prev => ({
        //     ...prev,
        //     x:e.clientX,
        //     y:e.clientY
        // }));
        current = {
            ...current,
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
            drawLine(current.x,current.y,e.clientX,e.clientY,currentColor);
        }
        
    }

    function mouseDown(e: React.MouseEvent<HTMLCanvasElement,MouseEvent>) {
        setDrawing(true);
        console.log(currentColor);
        // setCurrent(prev => ({
        //     ...prev,
        //     x:e.clientX,
        //     y:e.clientY
        // }));
        current = {
            ...current,
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
    function changeColor(colorHex: string) {
        currentColor = colorHex;
        console.log('changing to '+currentColor);
    }
   

    function drawLine(x1:number,y1:number,x2:number,y2:number,color:string):void {
        console.log(currentColor);
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
            <canvas className="whiteboardCanvas"
            width={800}
            height={600}
            onMouseDown={(e)=>{mouseDown(e)}}
            onMouseUp={(e)=>{mouseUp(e)}}
            onMouseMove={(e)=>{mouseMove(e)}}
            ref={boardRef}></canvas>
            <div className="colorPicker">
                <div className="colorChoice" style={{
                    border:'1px solid black',
                    background:'#000000',
                    width:50,
                    height:50
                }}
                onClick = {()=>changeColor('#000000')}
                ></div>
                <div className="colorChoice" style={{
                    border:'1px solid black',
                    background:'#FFFFFF',
                    width:50,
                    height:50
                }}
                onClick = {()=>changeColor('#FFFFFF')}
                ></div>

                <div className="colorChoice" style={{
                    border:'1px solid black',
                    background:'#0000FF',
                    width:50,
                    height:50
                }}
                onClick = {()=>changeColor('#0000FF')}
                ></div>
                
                <div className="colorChoice" style={{
                    border:'1px solid black',
                    background:'#00FF00',
                    width:50,
                    height:50
                }}
                onClick = {()=>changeColor('#00FF00')}
                ></div>

                <div className="colorChoice" style={{
                    border:'1px solid black',
                    background:'#FF0000',
                    width:50,
                    height:50
                }}
                onClick = {()=>changeColor('#FF0000')}
                ></div>
            </div>
        </div>
        
    );
}