export function grayscale(imageData){

    const pixels = imageData.data;

    for(
        let i = 0;
        i < pixels.length;
        i += 4
    ){

        let red =
        pixels[i];

        let green =
        pixels[i + 1];

        let blue =
        pixels[i + 2];

        let gray =
        (
            0.299 * red +
            0.587 * green +
            0.114 * blue
        );

        pixels[i] =
        gray;

        pixels[i + 1] =
        gray;

        pixels[i + 2] =
        gray;
    }

    return imageData;
}