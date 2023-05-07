export interface FrameData {
  actions: Action[];
  image: ImageData;
  frameNum: number;
}

export interface Action {
  color:string,
  radius:number,
  pos:number[][],
}
