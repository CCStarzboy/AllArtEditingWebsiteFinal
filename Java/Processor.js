import { grayscale } from "./Filters.js";
import { blur } from "./Blur.js";
import { sobel } from "./EdgeDetection.js";
import { invert } from "./Invert.js";

export function processImage(
    canvas,
    settings
){

    const ctx =
    canvas.getContext("2d");

    let imageData =
    ctx.getImageData(

        0,
        0,
        canvas.width,
        canvas.height
    );

    imageData =
    grayscale(imageData);

    imageData =
    blur(
        imageData,
        settings.blur
    );

    imageData =
    sobel(imageData);

    imageData =
    invert(imageData)

    ctx.putImageData(

        imageData,

        0,

        0

    );
}