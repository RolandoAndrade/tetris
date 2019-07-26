const BLOCK_SIZE = 20;
const COLORS = ["#fff47e", "#ff6d4a",
                "#ff3d49","#46dbff",
                "#77ff52","#ff519c"];
class Piece
{
    constructor(x, y)
    {
        this.blocks = [];
        this.shapes = [];
        this.rotation = 0;
        this.rotationMod = 1;
        this.x = x;
        this.y = y;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.xR = 0;
        this.yB = 0;
        this.xL = 0;
        this.yT = 0;
    }

    draw()
    {
        this.blocks.forEach((e) => e.draw());
    }

    generateFromMatrix(matrix)
    {
        this.blocks = [];
        this.xL= 1000;
        this.yT= 1000;
        matrix.forEach((e, i) =>
        {
            e.forEach((e, j) =>
            {
                if (e === 1)
                {
                    let newX = this.x + j * BLOCK_SIZE;
                    let newY = this.y + i * BLOCK_SIZE;
                    this.blocks.push(new Rectangle(newX, newY, BLOCK_SIZE, BLOCK_SIZE, this.color));
                    this.xL = Math.min(this.xL, newX);
                    this.yT = Math.min(this.yT, newY);
                    this.xR = Math.max(this.xR, newX + BLOCK_SIZE);
                    this.yB = Math.max(this.yB, newY + BLOCK_SIZE);
                }
            })
        });
    }

    collision(fun)
    {
        if(this.xL<0||this.xR>WIDTH)
        {
            fun();
        }
    }

    rotateRight()
    {
        this.rotation = (this.rotation + 1) % this.rotationMod;
        this.generateFromMatrix(this.shapes[this.rotation]);
        this.collision(()=>this.rotateRight());
    }

    rotateLeft()
    {
        if (this.rotation === 0)
        {
            this.rotation = this.shapes.length - 1;
        } else
        {
            this.rotation--;
        }
        this.generateFromMatrix(this.shapes[this.rotation]);
        this.collision(()=>this.rotateLeft());
    }

    setRotation(rotation)
    {
        this.rotation = rotation % this.rotationMod;
        this.generateFromMatrix(this.shapes[this.rotation]);
    }

    moveY()
    {
        this.blocks.forEach((e) => (e.y += BLOCK_SIZE));
        this.y += BLOCK_SIZE;
    }

    moveX(delta)
    {
        this.blocks.forEach((e) => (e.x += delta));
        this.x += delta;
        this.xR += delta;
        this.xL += delta;
    }

    moveLeft()
    {
        if(this.xL>0)
        {
            this.moveX(-BLOCK_SIZE);
        }
    }

    moveRight()
    {
        if(this.xR<WIDTH)
        {
            this.moveX(BLOCK_SIZE);
        }
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