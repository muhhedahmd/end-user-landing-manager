
import { decode } from 'blurhash';
import { createCanvas } from 'canvas';

export function blurHashToDataURL(blurHash: string, width = 32, height = 32): string {
const pixels = decode(blurHash, width, height);
// const { createCanvas, Image } = canvas;
const cnv = createCanvas(width, height);
const ctx = cnv.getContext('2d');
const imageData = ctx.createImageData(width, height);


for (let i = 0; i < pixels.length; i++) {
imageData.data[i] = pixels[i];
}


ctx.putImageData(imageData, 0, 0);
return cnv.toDataURL();
}