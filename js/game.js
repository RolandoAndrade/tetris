let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 500;
const WIDTH = 300;



class Game
{
    constructor()
    {
        this.init();
        let a = this;
        document.addEventListener("keydown",function (e)
        {
            switch (e.keyCode)
            {
                case 38:
                    a.piece.rotateLeft();
                    a.loop();
                    break;
                case 40:
                    a.piece.rotateRight();
                    a.loop();
                    break;
            }
        });
    }


    init()
    {
        this.gameOver = false;
        this.background = new Rectangle(0,0,WIDTH,HEIGHT, "#424242");
        this.piece = new PieceL(40,200);
        this.put = [];
    }

    loop()
    {
        this.background.draw();
        this.piece.draw();
    }
}

let game = new Game();

function loop()
{
    game.loop();
}
window.setInterval(loop,1000);