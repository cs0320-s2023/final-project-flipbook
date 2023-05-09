const GIFEncoder = require('gif-encoder');
const createWriteStream = require('stream');

  export default async function exportGif() {
    const encoder = new GIFEncoder(600, 800);
    encoder.setDelay(500);
    encoder.start();

    props.frames.forEach(function (frame) {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = frame.image.width;
      canvas.height = frame.image.height;
      ctx.putImageData(frame.image, 0, 0);
      encoder.addFrame(ctx);
    });
    encoder.finish();

    const buffer = encoder.out.getData();
    console.log(buffer);

    const stream = createWriteStream('example.gif');
    stream.write(Buffer.from(buffer));
    stream.end();
  }

module.exports = exportGif;
