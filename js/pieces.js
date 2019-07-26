const BLOCK_SIZE = 20;
const COLORS = ["#fff47e", "#ff6d4a",
                "#ff3d49","#46dbff",
                "#77ff52","#ff519c"];
class Piece
{
    constructor(x,y)
    {
        this.blocks = [];
        this.shapes = [];
        this.rotation = 0;
        this.rotationMod = 1;
        this.x = x;
        this.y = y;
        this.color = COLORS[Math.floor(Math.random()*COLORS.length)];
    }

    draw()
    {
        this.blocks.forEach((e)=>e.draw());
    }

    generateFromMatrix(matrix)
    {
        this.blocks = [];
        matrix.forEach((e,i)=>
        {
            e.forEach((e,j)=>
            {
                if(e===1)
                {
                    this.blocks.push(new Rectangle(this.x+j*BLOCK_SIZE,this.y+i*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, this.color));
                }
            })
        })
    }

    rotateRight()
    {
        this.rotation = (this.rotation + 1) % this.rotationMod;
        this.generateFromMatrix(this.shapes[this.rotation]);
    }

    rotateLeft()
    {
        if(this.rotation === 0)
        {
            this.rotation = this.shapes.length - 1;
        }
        else
        {
            this.rotation--;
        }
        this.generateFromMatrix(this.shapes[this.rotation]);
    }
}

class PieceZ1 extends Piece
{
    constructor(x, y)
    {
        super(x, y);
        this.shapes = [

            [[1,1,0],
             [0,1,1]],

            [[0,1],
             [1,1],
             [1,0]]

            ];
        this.rotationMod = 2;
        this.generateFromMatrix(this.shapes[0]);
    }
}

class PieceZ2 extends Piece
{
    constructor(x, y)
    {
        super(x, y);
        this.shapes = [

            [[0,1,1],
             [1,1,0]],

            [[1,0],
             [1,1],
             [0,1]]

        ];
        this.rotationMod = 2;
        this.generateFromMatrix(this.shapes[0]);
    }
}

class PieceI extends Piece
{
    constructor(x, y)
    {
        super(x, y);
        this.shapes = [

            [[1,1,1,1]],

            [[0,1],
             [0,1],
             [0,1],
             [0,1]]

        ];
        this.rotationMod = 2;
        this.generateFromMatrix(this.shapes[0]);
    }
}

class PieceH extends Piece
{
    constructor(x, y)
    {
        super(x, y);
        this.shapes = [

            [[1,1],
             [1,1]],

        ];
        this.rotationMod = 1;
        this.generateFromMatrix(this.shapes[0]);
    }
}

class PieceL extends Piece
{
    constructor(x, y)
    {
        super(x, y);
        this.shapes = [

            [[1,0,0],
             [1,1,1]],

            [[0,1,1,0],
             [0,1,0,0],
             [0,1,0,0]],

            [[1,1,1],
             [0,0,1]],

            [[0,0,1,0],
             [0,0,1,0],
             [0,1,1,0]]

        ];
        this.rotationMod = 4;
        this.generateFromMatrix(this.shapes[0]);
    }
}