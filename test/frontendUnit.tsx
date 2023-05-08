import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Whiteboard from '../src/board'
import { FrameData } from '../src/frameData';

describe('Whiteboard', () => {
  it('renders without crashing', () => {
    const mockSetCurrentFrame = jest.fn();
    const mockFrame: FrameData = { actions: [], image: new ImageData(1, 1), frameNum: 0 };
    render(
      <Whiteboard
        displayedFrame={mockFrame}
        setCurrentFrame={mockSetCurrentFrame}
      />
    );
  });

  it('renders a canvas element', () => {
    const mockSetCurrentFrame = jest.fn();
    const mockFrame: FrameData = { actions: [], image: new ImageData(1, 1), frameNum: 0 };
    const { getByTestId } = render(
      <Whiteboard
        displayedFrame={mockFrame}
        setCurrentFrame={mockSetCurrentFrame}
      />
    );
    expect(getByTestId('board-canvas')).toBeInTheDocument();
  });

//   describe('undo()', () => {
//     it('clears the canvas when called', () => {
//       const mockSetCurrentFrame = jest.fn();
//     const mockFrame: FrameData = { actions: [], image: new ImageData(1, 1), frameNum: 0 };
//       const { getByTestId } = render(
//         <Whiteboard
//           displayedFrame={mockFrame}
//           setCurrentFrame={mockSetCurrentFrame}
//         />
//       );
//       const canvas = getByTestId('board-canvas');
//       if (canvas.className === 'HTMLCanvasElement') {
//         const ctx = canvas.getContext('2d');
//         if (ctx) {
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//         }
//         const undoButton = getByTestId('undo-button');
//         fireEvent.click(undoButton);
//         expect(ctx?.getImageData(0, 0, canvas.width, canvas.height)).toMatchObject(
//             new ImageData(canvas.width, canvas.height)
//         );
//     }});
//   });

//   describe('clearCanvas()', () => {
//     it('clears the canvas when called', () => {
//       const mockSetCurrentFrame = jest.fn();
//       const mockFrame: FrameData = { index: 0, actions: [] };
//       const { getByTestId } = render(
//         <Whiteboard
//           displayedFrame={mockFrame}
//           setCurrentFrame={mockSetCurrentFrame}
//         />
//       );
//       const canvas = getByTestId('board-canvas');
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//       }
//       const clearButton = getByTestId('clear-button');
//       fireEvent.click(clearButton);
//       expect(ctx?.getImageData(0, 0, canvas.width, canvas.height)).toMatchObject(
//         new ImageData(canvas.width, canvas.height)
//       );
//     });
//   });

//   describe('mouseDown()', () => {
//     it('sets drawing to true', () => {
//       const mockSetCurrentFrame = jest.fn();
//       const mockFrame: FrameData = { index: 0, actions: [] };
//       const { getByTestId } = render(
//         <Whiteboard
//           displayedFrame={mockFrame}
//           setCurrentFrame={mockSetCurrentFrame}
//         />
//       );
//       const canvas = getByTestId('board-canvas');
//       fireEvent.mouseDown(canvas);
//       expect(canvas).toHaveAttribute('data-drawing', 'true');
//     });
//   });

//   describe('mouseUp()', () => {
//     it('sets drawing to false', () => {
//       const mockSetCurrentFrame = jest.fn();
//       const mockFrame: FrameData = { index: 0, actions: [] };
//       const { getByTestId } = render(
//         <Whiteboard
//           displayedFrame={mockFrame}
});