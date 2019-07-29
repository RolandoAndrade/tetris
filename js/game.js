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

    deleteRow(rowY, yT)
    {
        this.runDrop((y, e)=>
        {
            if(y === rowY)
            {
                e.break(yT+y*BLOCK_SIZE);
            }
        })
    }

    runDrop(fun)
    {
        let p = this.piece;
        let yT = p.yT;
        let yB = p.yB;
        let length = (yB-yT)/BLOCK_SIZE;
        this.drop.forEach((e) =>
        {
            if (e.yT < yB && e.yB > yT)
            {
                e.blocks.forEach((a) =>
                {
                    let y = (a.y - yT) / BLOCK_SIZE;
                    if (y > -1 && y < length)
                    {
                        fun(y, e);
                    }
                })
            }
        });
    }

    rowFilled()
    {
        let p = this.piece;
        let length = (p.yB-p.yT)/BLOCK_SIZE;
        let arr = new Array(length).fill(0);
        this.runDrop((y)=>arr[y]++);
        for(let i = length-1; i>= 0;i--)
        {
            if(arr[i] === WIDTH/BLOCK_SIZE || arr[i] >= 5)
            {
                this.deleteRow(i, p.yT);
            }
        }

    }

    collision()
    {
        if(this.piece.collision(this.drop))
        {
            this.drop.unshift(this.piece);
            this.rowFilled();
            this.generateRandom();
        }
    }

    loop()
    {
        this.piece.moveY(this.drop);
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