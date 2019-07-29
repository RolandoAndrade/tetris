let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 500;
const WIDTH = 300;

const PIECES = [

];

class Score
{
    constructor()
    {
        this.score = 0;
    }

    draw()
    {
        ctx.textAlign = "center";
        ctx.font ='100px Arial, sans-serif';
        ctx.fillStyle="#A3A3A3";
        ctx.fillText(""+this.score,WIDTH/2,120);
        ctx.font ='15px Arial, sans-serif';
        ctx.fillText("Rolando Andrade",WIDTH/2,30);
    }

    add()
    {
        this.score+=150;
    }
}

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
                default:
                    a.loop();
            }
        });
    }


    init()
    {
        this.gameOver = false;
        this.score = new Score();
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
        this.score.draw();
        this.drop.forEach((e) => e.draw());
        this.piece.draw();
    }

    deleteEmpty()
    {
        let i = 0;
        while(i<this.drop.length)
        {
            if(this.drop[i].blocks.length===0)
            {
                this.drop.splice(i,1);
            }
            else
            {
                i++;
            }
        }
    }

    deleteRow(rowY, yT)
    {
        this.runDrop((y, e, i)=>
        {
            if(y === rowY)
            {
                e.break(yT+rowY*BLOCK_SIZE);
                return true;
            }
            return false;
        });
        this.drop.forEach((e)=>e.moveBroke(yT+rowY*BLOCK_SIZE));
        this.score.add();
        this.deleteEmpty();
    }

    runDrop(fun)
    {
        let p = this.piece;
        let yT = p.yT;
        let yB = p.yB;
        let length = (yB-yT)/BLOCK_SIZE;

        let Break;
        this.drop.forEach((e, i) =>
        {
            if (e.yT < yB && e.yB > yT)
            {
                try
                {
                    e.blocks.forEach((a) =>
                    {
                        let y = (a.y - yT) / BLOCK_SIZE;
                        if (y > -1 && y < length)
                        {
                            if(fun(y, e, i))
                            {
                                throw Break;
                            }

                        }
                    })
                }
                catch (e)
                {

                }

            }
        });
    }

    rowFilled()
    {

        let p = this.piece;
        let length = (p.yB-p.yT)/BLOCK_SIZE;
        let arr = new Array(length).fill(0);
        this.runDrop((y)=>{arr[y]++; return false});
        console.log(arr);
        for(let i = length -1 ; i >= 0; i--)
        {
            if(arr[i] === WIDTH/BLOCK_SIZE)
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
        this.collision();
        this.piece.moveY(this.drop);
        this.draw();

    }
}

let game = new Game();

function loop()
{
    game.loop();
}
window.setInterval(loop,200);