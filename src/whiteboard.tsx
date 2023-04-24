import { useState, useRef, useLayoutEffect, MouseEventHandler } from "react";

interface Pos {
    x:number,
    y:number
}

export default function Whiteboard() {

    var pos = { x: 0, y: 0 };
  const [points, setPoints] = useState<Pos[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const contextRef = useRef<CanvasRenderingContext2D|null>(null);

  useLayoutEffect(() => {
    const canvas:HTMLElement | null  = document.getElementById('canvas');
    let ctx;
    if (canvas instanceof HTMLCanvasElement){ 
        ctx = canvas?.getContext('2d');
    }
    else {
        ctx = null;
    }
    if (ctx!=null && canvas instanceof HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    contextRef.current = ctx;
    points.forEach((ele: Pos) => {
      contextRef.current?.lineTo(ele.x, ele.y);
      contextRef.current?.stroke();
    });
    }
  }, [points]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement,MouseEvent>) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event: React.MouseEvent<HTMLCanvasElement,MouseEvent>) => {
    if (!drawing) return;

    setPoints((state) => [...state, pos]);
    contextRef.current?.moveTo(pos.x, pos.y);

    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  return (
      <canvas
      id='canvas'
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e)=>{startDrawing(e)}}
      onMouseUp={()=>{finishDrawing()}}
      onMouseMove={(e)=>{draw(e)}}
    >
      Canvas
    </canvas>
  );
}