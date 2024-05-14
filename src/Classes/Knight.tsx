import Piece from "./Piece.tsx";
import {Color, LegalSquare} from "./types/types.tsx";
import BoardClass from "./BoardClass.tsx";


export default class Knight extends Piece {

    constructor(x: number, y: number, PieceColor: Color) {
        super(x, y, PieceColor);

    }


    public SetX(x: number) {
        this.x = x;
    }


    private CheckSquare(xDirection:number, yDirection:number, board: BoardClass, LegalSquares:LegalSquare[]):void
    {
        const x = this.x + xDirection
        const y = this.y + yDirection
        if(x >= 0 && x < 8 && y >= 0 && y < 8 )
        {
            if(this.PieceColor !== board.getBoard()[x][y]['PieceColor'])
            {
                LegalSquares.push({x:x ,y:y})
            }
        }

    }

    public GetLegalSquares(board: BoardClass): LegalSquare[] {

        const LegalSquares: LegalSquare[] = [];
        const directions = [
            {xDirection: 2, yDirection:1},
            {xDirection: 2, yDirection:-1},
            {xDirection: 1, yDirection:2},
            {xDirection: 1, yDirection:-2},
            {xDirection: -2, yDirection: -1},
            {xDirection: -2, yDirection: 1},
            {xDirection: -1, yDirection:-2},
            {xDirection: -1, yDirection: 2},
        ]

        for(let {xDirection, yDirection} of directions)
        {
            this.CheckSquare(xDirection, yDirection,board,LegalSquares)
        }

        return LegalSquares;

    }
}