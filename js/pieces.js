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
        this.broke = false;
    }

    draw()
    {
        this.blocks.forEach((e) => e.draw());
    }

    generateFromMatrix(matrix)
    {
        this.blocks = [];
        this.xL = 1000;
        this.yT = 1000;
        this.xR = 0;
        this.yB = 0;
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

    collisionWhenRotate(blocks, fun)
    {
        if (this.xL < 0 || this.xR > WIDTH || this.collideWith(blocks, (i,j,k)=>this.collideSideWith(i,j,k)))
        {
            fun();
        }
    }

    collideWith(blocks, fun)
    {
        for (let k = 0; k < blocks.length; k++)
        {
            let piece = blocks[k];
            for (let i = 0; i < this.blocks.length; i++)
            {
                for (let j = 0; j < piece.blocks.length; j++)
                {
                    if (fun(i, j, piece))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rotateRight(pieces)
    {
        this.rotation = (this.rotation + 1) % this.rotationMod;
        this.generateFromMatrix(this.shapes[this.rotation]);
        this.collisionWhenRotate(pieces, () => this.rotateRight(pieces));
    }

    rotateLeft(pieces)
    {
        if (this.rotation === 0)
        {
            this.rotation = this.shapes.length - 1;
        } else
        {
            this.rotation--;
        }
        this.generateFromMatrix(this.shapes[this.rotation]);
        this.collisionWhenRotate(pieces, () => this.rotateLeft(pieces));
    }

    setRotation(rotation)
    {
        this.rotation = rotation % this.rotationMod;
        this.generateFromMatrix(this.shapes[this.rotation]);
    }

    moveY(pieces)
    {
        if(!this.collision(pieces))
        {
            this.blocks.forEach((e) => (e.y += BLOCK_SIZE));
            this.y += BLOCK_SIZE;
            this.yB += BLOCK_SIZE;
            this.yT += BLOCK_SIZE;
            return false;
        }
        return true;
    }

    moveX(delta)
    {
        this.blocks.forEach((e) => (e.x += delta));
        this.x += delta;
        this.xR += delta;
        this.xL += delta;
    }

    moveLeft(pieces)
    {
        if (this.xL > 0)
        {
            this.moveX(-BLOCK_SIZE);
            if(this.collideWith(pieces, (i,j,piece)=>this.collideSideWith(i,j,piece)))
            {
                this.moveX(BLOCK_SIZE);
            }
        }
    }

    moveRight(pieces)
    {
        if (this.xR < WIDTH)
        {
            this.moveX(BLOCK_SIZE);
            if(this.collideWith(pieces, (i,j,piece)=>this.collideSideWith(i,j,piece)))
            {
                this.moveX(-BLOCK_SIZE);
            }
        }
    }

    collideUpWith(i, j, piece)
    {
        return this.blocks[i].x === piece.blocks[j].x && piece.blocks[j].y === this.blocks[i].y + BLOCK_SIZE;
    }

    collideSideWith(i, j, piece)
    {
        return this.blocks[i].x === piece.blocks[j].x && piece.blocks[j].y === this.blocks[i].y;
    }

    collision(blocks)
    {
        if (this.yB >= HEIGHT)
        {
            return true;
        }

        return this.collideWith(blocks, (i, j, piece) => this.collideUpWith(i, j, piece));
    }

    break(y)
    {
        this.blocks = this.blocks.filter((a)=>a.y!==y);
        return this.blocks.length;
    }

    moveBroke(y)
    {
        this.xL = 1000;
        this.yT = 1000;
        this.xR = 0;
        this.yB = 0;
        this.blocks.forEach((a)=>
        {
            if(a.y < y)
            {
                a.y += BLOCK_SIZE;
            }
            this.xL = Math.min(this.xL, a.x);
            this.yT = Math.min(this.yT, a.y);
            this.xR = Math.max(this.xR, a.x + BLOCK_SIZE);
            this.yB = Math.max(this.yB, a.y + BLOCK_SIZE);
        });
        this.x = this.xL;
        this.y = this.yT;
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

class FabricOfPieces
{
    generateRandom()
    {
        let a = Math.floor(Math.random()*5);
        switch (a)
        {
            case 0:
                return  new PieceZ1(200,0);
            case 1:
                return new PieceZ2(200,0);
            case 2:
                return new PieceL(200,0);
            case 3:
                return new PieceI(200,0);
        }
        return new PieceH(200,0);
    }
}