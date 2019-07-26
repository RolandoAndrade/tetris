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
                    a.draw();
                    break;
                case 37:
                    a.piece.moveLeft();
                    a.draw();
                    break;
                case 39:
                    a.piece.moveRight();
                    a.draw();
                    break;
                case 40:
                    a.piece.rotateRight();
                    a.draw();
                    break;
            }
        });
    }


    init()
    {
        this.gameOver = false;
        this.background = new Rectangle(0,0,WIDTH,HEIGHT, "#424242");
        this.piece = new PieceL(40,200);
        this.piece.setRotation(Math.floor(Math.random()*5));
        this.drop = [];
        this.loop();
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
            console.log(this.drop);
            this.piece = new PieceI(40,200);
        }
    }

    loop()
    {
        this.piece.moveY();
        this.draw();
        this.collision();
    }
}

let game = new Game();

function loop()
{
    game.loop();
}
window.setInterval(loop,500);