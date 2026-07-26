let erasing = false;

export function startEraser(
    event,
    ctx
){

    erasing = true;

    ctx.beginPath();

    ctx.moveTo(
        event.offsetX,
        event.offsetY
    );

    ctx.globalCompositeOperation =
    "destination-out";
}

export function drawEraser(
    event,
    ctx
){

    if(!erasing)
        return;

    ctx.lineWidth = 30;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.lineTo(
        event.offsetX,
        event.offsetY
    );

    ctx.stroke();
}

export function stopEraser(ctx){

    erasing = false;

    ctx.closePath();

    ctx.globalCompositeOperation =
    "source-over";
}