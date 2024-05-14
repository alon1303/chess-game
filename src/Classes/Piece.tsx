
import {Color, LegalSquare} from "./types/types.tsx";
import BoardClass from "./BoardClass.tsx";



export default abstract class Piece {

    protected x: number;
    protected y: number;
    protected PieceColor: Color;



    protected constructor(x: number,y: number, PieceColor: Color) {
        this.x = x;
        this.y = y;
        this.PieceColor = PieceColor;


    }


    public SetX(x:number):void{
        this.x = x;
    }
    public SetY(y:number):void {
        this.y = y;
    }


    public abstract GetLegalSquares(board:BoardClass):LegalSquare[]
}
