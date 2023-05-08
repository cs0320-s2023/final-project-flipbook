import { createPngFile } from "../export";
import { FrameData } from "../frameData";

describe("createPngFile", () => {
  it("should return a PNG file from action arrays", async () => {
    // Mock frame data
    const actions = [
      {
        color: "red",
        radius: 5,
        pos: [
          [0, 0],
          [10, 10],
          [20, 20],
        ],
      },
      {
        color: "green",
        radius: 10,
        pos: [
          [50, 50],
          [60, 60],
          [70, 70],
        ],
      },
    ];

    // Call createPngFile
    const file = await createPngFile(actions);

    // Verify that the returned file has the correct type, name, and contents
    expect(file.type).toEqual("image/png");
    expect(file.name).toEqual("frame.png");
    const blob = await file.arrayBuffer();
    const dataView = new DataView(blob);
    expect(dataView.getUint8(0)).toEqual(137); // PNG magic number
    expect(dataView.getUint8(1)).toEqual(80); // PNG magic number
    // Add more tests to check the contents of the PNG file if needed
  });
});
