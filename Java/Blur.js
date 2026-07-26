export function blur(
    imageData,
    amount
){

    const width = imageData.width;
    const height = imageData.height;

    const pixels = imageData.data;

    const output =
    new ImageData(width, height);

    const kernel = [

        1, 2, 1,
        2, 4, 2,
        1, 2, 1

    ];

    const kernelWeight = 16;

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

            let r = 0;
            let g = 0;
            let b = 0;

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

                    const pixelIndex =
                    (
                        (y + ky) *
                        width +
                        (x + kx)
                    ) * 4;

                    const weight =
                    kernel[index];

                    r +=
                    pixels[pixelIndex] *
                    weight;

                    g +=
                    pixels[pixelIndex + 1] *
                    weight;

                    b +=
                    pixels[pixelIndex + 2] *
                    weight;

                    index++;
                }
            }

            const outputIndex =
            (y * width + x) * 4;

            output.data[outputIndex] =
            r / kernelWeight;

            output.data[outputIndex + 1] =
            g / kernelWeight;

            output.data[outputIndex + 2] =
            b / kernelWeight;

            output.data[outputIndex + 3] =
            255;
        }
    }

    return output;
}