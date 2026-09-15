const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Helper to generate an uncompressed PNG buffer without external dependencies
function createPng(size, r, g, b) {
  const width = size;
  const height = size;

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 72, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // Deflate
  ihdrData.writeUInt8(0, 11); // Filter method
  ihdrData.writeUInt8(0, 12); // Interlace method
  const ihdrChunk = makeChunk("IHDR", ihdrData);

  // Raw image data with scanline filters (filter byte 0 at start of each line)
  const rowLength = width * 4 + 1;
  const rawData = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // None filter

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Create a nice rounded square badge effect with saffron color (#d97706 -> 217, 119, 6)
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = Math.abs(x - centerX);
      const dy = Math.abs(y - centerY);
      const radius = size * 0.45;

      const isInside = Math.hypot(Math.max(0, dx - radius * 0.4), Math.max(0, dy - radius * 0.4)) < radius * 0.6;

      if (isInside) {
        // Warm saffron/amber gradient
        const t = y / height;
        rawData[pixelOffset] = Math.floor(245 - t * 30);     // Red
        rawData[pixelOffset + 1] = Math.floor(158 - t * 40); // Green
        rawData[pixelOffset + 2] = Math.floor(11 + t * 5);   // Blue
        rawData[pixelOffset + 3] = 255;                      // Alpha
      } else {
        rawData[pixelOffset] = 217;
        rawData[pixelOffset + 1] = 119;
        rawData[pixelOffset + 2] = 6;
        rawData[pixelOffset + 3] = 255;
      }
    }
  }

  // Deflate IDAT
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk("IDAT", compressedData);

  // IEND chunk
  const iendChunk = makeChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, "ascii");
  const crcInput = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcInput);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const iconsDir = path.join(__dirname, "..", "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

[192, 384, 512].forEach((size) => {
  const filePath = path.join(iconsDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filePath, createPng(size, 217, 119, 6));
  console.log(`Generated ${filePath}`);
});
console.log("All PWA icons generated successfully.");
