export interface FrameData {
  actions: Action[];
  image: ImageData;
  frameNum: number;
}

export interface Action {
  opacity: number;
  color: string;
  radius: number;
  pos: number[][];
}

export interface FrameActionData {
  actions: Action[];
  frameNum:number;
}


export function convertToFrameDataList(fas:FrameActionData[]) {
  let res:FrameData[] = [];
  fas.forEach((fa)=>{
    res.push({
      frameNum:fa.frameNum,
      actions:fa.actions,
      image:createImageDataFromActionData(fa)
    })
  });
  return res;
}

export function createImageDataFromActionData(fa:FrameActionData): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');
  fa.actions.forEach((a)=>drawAction(a,context))
  return context.createImageData(canvas.width, canvas.height);
}

function drawAction(a: Action,context:CanvasRenderingContext2D) {
  for (var i = 0; i < a.pos.length; i++) {
    drawLine(
      a.pos[i][0],
      a.pos[i][1],
      a.pos[i][2],
      a.pos[i][3],
      a.color,
      a.radius,
      context
    );
  }
}

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number,
  context:CanvasRenderingContext2D
): void {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = color;
      context.lineCap = "round"; //make it so that a stroke is a circle, not a rectangle
      context.lineWidth = width;
      context.stroke();
      context.closePath();
}


