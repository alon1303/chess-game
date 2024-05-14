import Piece from "./Piece.tsx";
import {Color, LegalSquare} from "./types/types.tsx";
import BoardClass from "./BoardClass.tsx";

export default class Queen extends Piece {

    constructor(x: number, y: number, PieceColor: Color) {
        super(x, y, PieceColor);
    }
    private CheckSquare(x:number, y:number, xDirection:number, yDirection:number, board: BoardClass, LegalSquares:LegalSquare[]):void
    {
        x = x + xDirection
        y = y + yDirection
        if(x >= 0 && x < 8 && y >= 0 && y < 8)
        {


            if(board.getBoard()[x][y]['PieceColor'] === Color.Empty)
            {
                LegalSquares.push({x:x ,y:y})
                this.CheckSquare(x, y,xDirection,yDirection,board,LegalSquares)
            }else if(this.PieceColor !== board.getBoard()[x][y]['PieceColor'])
            {
                LegalSquares.push({x:x ,y:y})
            }

        }

    }

    GetLegalSquares(board: BoardClass): LegalSquare[] {
        const LegalSquares: LegalSquare[] = [];
        //every direction the Piece can move towards
        const directions = [
            {xDirection: 1, yDirection:1},
            {xDirection: -1, yDirection:-1},
            {xDirection: -1, yDirection:1},
            {xDirection: 1, yDirection:-1},
            {xDirection: 1, yDirection:0},
            {xDirection: -1, yDirection:0},
            {xDirection: 0, yDirection:1},
            {xDirection: 0, yDirection:-1},
        ]

        for(let {xDirection, yDirection} of directions)
        {
            this.CheckSquare(this.x, this.y, xDirection, yDirection,board,LegalSquares)
        }

        return LegalSquares;
    }

    public CheckPieceMove(x: number, y: number, board: BoardClass): boolean {

        this.GetLegalSquares(board).map(legalSquare =>{
            if (legalSquare.x === x && legalSquare.y === y){
                board.MovePiece(this.x, this.y, x, y);
                this.SetX(x);
                this.SetY(y);
                return true;
            }
        })
        return false;



    }

}