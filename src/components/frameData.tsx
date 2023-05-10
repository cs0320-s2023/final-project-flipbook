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

/**

Converts an array of FrameActionData into an array of FrameData objects.
@param {FrameActionData[]} fas - Array of FrameActionData objects to be converted.
@returns {FrameData[]} - An array of FrameData objects created from the FrameActionData array.
*/
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

/**

Creates an ImageData object from a FrameActionData object.
@param {FrameActionData} fa - The FrameActionData object to be used.
@returns {ImageData} - An ImageData object created from the FrameActionData object.
@throws {Error} - If unable to get canvas context.
*/
export function createImageDataFromActionData(fa:FrameActionData): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');
  fa.actions.forEach((a)=>drawAction(a,context))
  return context.createImageData(canvas.width, canvas.height);
}

/**

Draws an Action object on a canvas context.
@param {Action} a - The Action object to be drawn.
@param {CanvasRenderingContext2D} context - The canvas context on which to draw the Action object.
*/
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

/**

Draws a line on a canvas context.
@param {number} x1 - The x-coordinate of the start point of the line.
@param {number} y1 - The y-coordinate of the start point of the line.
@param {number} x2 - The x-coordinate of the end point of the line.
@param {number} y2 - The y-coordinate of the end point of the line.
@param {string} color - The color of the line.
@param {number} width - The width of the line.
@param {CanvasRenderingContext2D} context - The canvas context on which to draw the line.
*/
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


