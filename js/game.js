let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 500;
const WIDTH = 300;

let rect = new Rectangle(0,0,WIDTH,HEIGHT, "#424242");

let piece = new PieceL(50,200);

function loop()
{
    rect.draw();
    piece.draw();
}
loop();
document.addEventListener("keydown",function (e)
{
    switch (e.keyCode)
    {
        case 37:
            piece.rotateLeft();
            loop();
            break;
        case 39:
            piece.rotateRight();
            loop();
            break;
    }
});
