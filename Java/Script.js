import { processImage } from "./Processor.js";
import {
    setTool,
    getTool
} from "./Tools/ToolManager.js";
import {
    startBrush,
    drawBrush,
    stopBrush
} from "./Tools/Brush.js";
import {
    startEraser,
    drawEraser,
    stopEraser
} from "./tools/Eraser.js";

const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");

const imageInput =
document.getElementById("imageInput");

const sourceImage =
document.getElementById("sourceImage");

const convertButton =
document.getElementById("convertButton");

const clearButton =
document.getElementById("clearButton");

const saveButton =
document.getElementById("saveButton");

const status =
document.getElementById("status");

const tools =
document.querySelectorAll(".tool");

tools.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            tools.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            let tool =
            button.id.replace(
                "Tool",
                ""
            );

            setTool(tool);

            console.log(
                "Active Tool:",
                getTool()
            );
        }
    );
});

canvas.addEventListener(
"mousedown",
(e)=>{

    if(getTool()=="brush"){

        startBrush(
            e,
            ctx,
            canvas
        );
    }
    if(getTool()=="eraser"){

        startEraser(
            e,
            ctx
        );
    }
});

canvas.addEventListener(
"mousemove",
(e)=>{

    if(getTool()=="brush"){

        drawBrush(
            e,
            ctx
        );
    }
     if(getTool()=="eraser"){

        drawEraser(
            e,
            ctx
        );
    }
});

canvas.addEventListener(
"mouseup",
()=>{

    stopBrush();
    stopEraser();

});

let settings = {

    threshold: 80,

    blur: 3

};

let loadedImage = false;

imageInput.addEventListener(
"change",
function(event){

    const file =
    event.target.files[0];

    if(!file){

        return;

    }

    const reader =
    new FileReader();

    reader.onload =
    function(e){

        sourceImage.onload =
        function(){

            loadedImage = true;

            canvas.width =
            sourceImage.width;

            canvas.height =
            sourceImage.height;

            ctx.drawImage(

                sourceImage,

                0,

                0

            );

            console.log(
                "Image loaded"
            );
        };

        sourceImage.src =
        e.target.result;
    };

    reader.readAsDataURL(file);
});

function updateDrawing(){

    if(!loadedImage){

        return;

    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
        sourceImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

    processImage(
        canvas,
        settings
    );

    processImage(
        canvas,
        settings
    );
}

convertButton.addEventListener(
"click",
updateDrawing
);

clearButton.addEventListener(
"click",
function(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

});

saveButton.addEventListener(
"click",
function(){

    const link =
    document.createElement("a");

    link.download =
    "drawing.png";

    link.href =
    canvas.toDataURL();

    link.click();
});