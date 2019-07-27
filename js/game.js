let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 500;
const WIDTH = 300;

const PIECES = [

];


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
                    a.piece.rotateLeft(a.drop);
                    a.draw();
                    break;
                case 37:
                    a.piece.moveLeft(a.drop);
                    a.draw();
                    break;
                case 39:
                    a.piece.moveRight(a.drop);
                    a.draw();
                    break;
                case 40:
                    a.piece.rotateRight(a.drop);
                    a.draw();
                    break;
            }
        });
    }


    init()
    {
        this.gameOver = false;
        this.background = new Rectangle(0,0,WIDTH,HEIGHT, "#424242");
        this.fabric = new FabricOfPieces();
        this.generateRandom();
        this.drop = [];
        this.loop();
    }

    generateRandom()
    {
        this.piece = this.fabric.generateRandom();
        this.piece.setRotation(Math.floor(Math.random()*5));
    }

    draw()
    {
        this.background.draw();
        this.drop.forEach((e) => e.draw());
        this.piece.draw();
    }

    collision()
    {
        if(this.piece.collision(this.drop))
        {
            this.drop.push(this.piece);
            this.generateRandom();
        }
    }

    loop()
    {
        this.piece.moveY();
        this.collision();
        this.draw();

    }
}

let game = new Game();

function loop()
{
    game.loop();
}
window.setInterval(loop,100);