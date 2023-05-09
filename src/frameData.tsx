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
