import Piece from "./Piece.tsx";
import {Color} from "./types/types.tsx";
import BoardClass from "./BoardClass.tsx";

export default class DefaultPiece extends Piece {

    constructor(x: number, y: number) {
        super(x, y,Color.Empty);


    }
    public CheckPieceMove(x: number, y: number): boolean {

        return Math.abs(this.x - x) == 2 &&  Math.abs(this.y - y) == 1 ||
            Math.abs(this.x - x) == 1 &&  Math.abs(this.y - y) == 2;
    }

    GetLegalSquares(board: BoardClass): Position[] {
        return [];
    }

    MovePiece(x: number, y: number, board: BoardClass): boolean {
        return false;
    }


}