import {JSX, useEffect, useState} from "react";
import BoardClass from "../Classes/BoardClass.tsx";
import {LegalSquare} from "../Classes/types/types.tsx";
import {socket} from "../socket.ts";


const Board = () => {
    const [squareGrid, setSquareGrid] = useState<JSX.Element[][]>([]);
    const board = new BoardClass();
    let currentSquareElement: HTMLElement;
    let destinationSquareElement: HTMLElement;
    let currentSquarePosition: string[] = [];
    let legalSquares: LegalSquare[] = [];


    function getPiece(i: number, j: number): JSX.Element | null {

        switch (i) {
            case 0:
                switch (j) {
                    case 0:
                        return <img className={"png"} src={"../src/assets/png/Chess_rdt60.png"}/>
                    case 1:
                        return <img className={"png"} src={"../src/assets/png/Chess_ndt60.png"}/>
                    case 2:
                        return <img className={"png"} src={"../src/assets/png/Chess_bdt60.png"}/>
                    case 3:
                        return <img className={"png"} src={"../src/assets/png/Chess_qdt60.png"}/>
                    case 4:
                        return <img className={"png"} src={"../src/assets/png/Chess_kdt60.png"}/>
                    case 5:
                        return <img className={"png"} src={"../src/assets/png/Chess_bdt60.png"}/>
                    case 6:
                        return <img className={"png"} src={"../src/assets/png/Chess_ndt60.png"}/>
                    case 7:
                        return <img className={"png"} src={"../src/assets/png/Chess_rdt60.png"}/>
                }
                return null;
            case 1:
                return <img className={"png"} src={"../src/assets/png/Chess_pdt60.png"}/>
            case 6:
                return <img className={"png"} src={"../src/assets/png/Chess_plt60.png"}/>
            case 7:
                switch (j) {
                    case 0:
                        return <img className={"png"} src={"../src/assets/png/Chess_rlt60.png"}/>
                    case 1:
                        return <img className={"png"} src={"../src/assets/png/Chess_nlt60.png"}/>
                    case 2:
                        return <img className={"png"} src={"../src/assets/png/Chess_blt60.png"}/>
                    case 3:
                        return <img className={"png"} src={"../src/assets/png/Chess_qlt60.png"}/>
                    case 4:
                        return <img className={"png"} src={"../src/assets/png/Chess_klt60.png"}/>
                    case 5:
                        return <img className={"png"} src={"../src/assets/png/Chess_blt60.png"}/>
                    case 6:
                        return <img className={"png"} src={"../src/assets/png/Chess_nlt60.png"}/>
                    case 7:
                        return <img className={"png"} src={"../src/assets/png/Chess_rlt60.png"}/>
                }
        }


        return null;
    }


    function demarkLegalSquares() {
        legalSquares.map(square => {
            const id = `${square.x},${square.y}`;
            const element = document.getElementById(id);
            if (element !== null) {

                element.style.backgroundColor = (square.x % 2 == 0 && square.y % 2 == 0 || square.x % 2 != 0 && square.y % 2 != 0) ? 'sandybrown' : 'saddlebrown';

            }
        })
    }

    function markLegalSquares() {


        legalSquares.map(square => {
            const id = `${square.x},${square.y}`;
            const element = document.getElementById(id);
            if (element !== null) {
                element.style.backgroundColor = "red";
            }
        })

    }

    function handleDrag(e: any) {
        if (e.target instanceof HTMLImageElement) {
            currentSquareElement = e.target;
            currentSquarePosition = e.target.parentNode.id.toString().split(",");
            legalSquares = board.getBoard()[parseInt(currentSquarePosition[0], 10)][parseInt(currentSquarePosition[1], 10)].GetLegalSquares(board);

            markLegalSquares();


        }
    }

    function moveElementOnGrid(currentSquareElement: HTMLElement | null, destinationSquareElement: HTMLElement | null) {

        if (destinationSquareElement instanceof HTMLImageElement && destinationSquareElement.parentNode && currentSquareElement?.firstElementChild) {
            destinationSquareElement.parentNode.appendChild(currentSquareElement.firstElementChild);
            destinationSquareElement.parentNode.removeChild(destinationSquareElement);
        } else if (currentSquareElement?.firstElementChild && destinationSquareElement) {
            destinationSquareElement.appendChild(currentSquareElement.firstElementChild);
        }
    }


    function handleDrop(e: any) {

        destinationSquareElement = e.target;
        if (destinationSquareElement !== currentSquareElement && currentSquareElement instanceof HTMLImageElement && destinationSquareElement instanceof HTMLImageElement && destinationSquareElement !== undefined && destinationSquareElement.parentElement) {

            const destinationSquarePosition = destinationSquareElement.parentElement.id.toString().split(",");
            const destinationSquareX = parseInt(destinationSquarePosition[0], 10);
            const destinationSquareY = parseInt(destinationSquarePosition[1], 10);
            const currentSquareX = parseInt(currentSquarePosition[0], 10);
            const currentSquareY = parseInt(currentSquarePosition[1], 10);


            socket.emit('move request', currentSquareX, currentSquareY, destinationSquareX, destinationSquareY)


        } else if (destinationSquareElement instanceof HTMLDivElement) {

            const destinationSquarePosition = e.target.id.toString().split(",");
            const destinationSquareX = parseInt(destinationSquarePosition[0], 10);
            const destinationSquareY = parseInt(destinationSquarePosition[1], 10);
            const currentSquareX = parseInt(currentSquarePosition[0], 10);
            const currentSquareY = parseInt(currentSquarePosition[1], 10);


            socket.emit('move request', currentSquareX, currentSquareY, destinationSquareX, destinationSquareY)


        }
        demarkLegalSquares()

    }

    function handleOnDragOver(e: any) {
        e.preventDefault();
    }

    function movePiece(currentSquareX: number, currentSquareY: number, destinationSquareX: number, destinationSquareY: number) {
        const currentSquareElement = document.getElementById(`${currentSquareX},${currentSquareY}`);
        const destinationSquareElement = document.getElementById(`${destinationSquareX},${destinationSquareY}`);
        moveElementOnGrid(currentSquareElement, destinationSquareElement);
        board.MovePiece(currentSquareX, currentSquareY, destinationSquareX, destinationSquareY);
    }

    useEffect(() => {

        socket.on('move piece', (currentSquareX: number, currentSquareY: number, destinationSquareX: number, destinationSquareY: number) => {
            movePiece(currentSquareX, currentSquareY, destinationSquareX, destinationSquareY)
        })
        return () => {
            socket.off('move piece', (currentSquareX: number, currentSquareY: number, destinationSquareX: number, destinationSquareY: number) => {
                movePiece(currentSquareX, currentSquareY, destinationSquareX, destinationSquareY)
            })
        }
    }, []);

    useEffect(() => {
        const newSquareGrid: JSX.Element[][] = [];
        for (let i = 0; i < 8; i++) {
            const row: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                const piece = getPiece(i, j);
                row.push(<div key={`${i},${j}`} id={`${i},${j}`}
                              className={(i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0) ? 'white-square ' : 'black-square '}
                              draggable
                              onDragStart={handleDrag} onDragOver={handleOnDragOver} onDrop={handleDrop}>
                    {piece}
                </div>)

            }
            newSquareGrid.push(row);
        }

        setSquareGrid(newSquareGrid);
    }, []);


    return (
        <div className={""}>
            <div className={"board-and-numbers-container"}>
                <div className={"numbers-of-board-y-axis"}>
                    <span className={"number"}>0</span>
                    <span className={"number"}>1</span>
                    <span className={"number"}>2</span>
                    <span className={"number"}>3</span>
                    <span className={"number"}>4</span>
                    <span className={"number"}>5</span>
                    <span className={"number"}>6</span>
                    <span className={"number"}>7</span>
                </div>


                <div className="board">
                    {squareGrid}
                </div>
            </div>

            <div className={"numbers-of-board-x-axis"}>

                <span className={"number"}>0</span>
                <span className={"number"}>1</span>
                <span className={"number"}>2</span>
                <span className={"number"}>3</span>
                <span className={"number"}>4</span>
                <span className={"number"}>5</span>
                <span className={"number"}>6</span>
                <span className={"number"}>7</span>
            </div>
        </div>
    );
}
export default Board;