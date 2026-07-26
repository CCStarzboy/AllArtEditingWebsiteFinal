export function sobel(imageData){

    const width = imageData.width;
    const height = imageData.height;

    const pixels = imageData.data;

    const output =
    new ImageData(width, height);

    const kernelX = [

        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1

    ];

    const kernelY = [

        -1, -2, -1,
         0,  0,  0,
         1,  2,  1

    ];

    for(
        let y = 1;
        y < height - 1;
        y++
    ){

        for(
            let x = 1;
            x < width - 1;
            x++
        ){

            let pixelX = 0;
            let pixelY = 0;

            let index = 0;

            for(
                let ky = -1;
                ky <= 1;
                ky++
            ){

                for(
                    let kx = -1;
                    kx <= 1;
                    kx++
                ){

                    const pos =
                    (
                        (y + ky) *
                        width +
                        (x + kx)
                    ) * 4;

                    const gray =
                    pixels[pos];

                    pixelX +=
                    gray *
                    kernelX[index];

                    pixelY +=
                    gray *
                    kernelY[index];

                    index++;

                }
            }

            let magnitude =
            Math.sqrt(

                pixelX * pixelX +
                pixelY * pixelY

            );

            magnitude =
            Math.min(
                255,
                magnitude
            );

            const outputIndex =
            (y * width + x) * 4;

            output.data[outputIndex] =
            magnitude;

            output.data[outputIndex + 1] =
            magnitude;

            output.data[outputIndex + 2] =
            magnitude;

            output.data[outputIndex + 3] =
            255;

        }
    }

    return output;
}