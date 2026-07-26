let drawing = false;

export function startBrush(
    event,
    ctx,
    canvas
){

    drawing = true;

    ctx.beginPath();

    ctx.moveTo(
        event.offsetX,
        event.offsetY
    );

}

export function drawBrush(
    event,
    ctx
){

    if(!drawing)
        return;

    ctx.lineWidth = 5;

    ctx.lineCap = "round";

    ctx.strokeStyle = "black";

    ctx.lineTo(
        event.offsetX,
        event.offsetY
    );

    ctx.stroke();
}

export function stopBrush(){

    drawing = false;
}