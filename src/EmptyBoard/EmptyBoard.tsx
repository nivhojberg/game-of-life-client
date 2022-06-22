import React from "react";
import Row from "../Components/Row";
import { Board, CellState } from "../messages";
import './EmptyBoard.css';

interface Props {
    onSubmitInitalState: (initalState: Board) => void;
};

const DEFAULT_BOARD: Board = Array.from({ length: 50 }).map(() =>
    Array.from({ length: 50 }).map(() =>
        "dead"
    )
);

const EmptyBoard = (props: Props) => {
    const [board, setBoard] = React.useState(DEFAULT_BOARD);

    const handleClickSubmitInitalState = () => {
        props.onSubmitInitalState(board);
    };

    const handleClickCell = (row: number, col: number) => {
        setBoard(board.map((boardRow: CellState[], rowIndex: number): CellState[] => {
            if (rowIndex !== row) return boardRow;
            return boardRow.map((boardCol: CellState, colIndex: number): CellState => {
                if (colIndex !== col) return boardCol;
                return boardCol === "alive" ? "dead" : "alive"
            });
        }));
    };

    return (
        <>
            <div>
                Click on cells to toggle state
            </div>
            <div className="legend">
                <div>
                    <div className="alive" />
                    Alive
                </div>
                <div>
                    <div className="dead" />
                    Dead
                </div>
            </div>
            <div className="actions">
                <button onClick={handleClickSubmitInitalState}>
                    Submit Initial State
                </button>
            </div>
            <div className="empty-board">
                {board.map((row: CellState[], rowIndex: number) => (
                    <Row
                        key={`row-${rowIndex}`}
                        rowIndex={rowIndex}
                        columns={row}
                        onClickCell={handleClickCell}
                    />
                ))}
            </div>
        </>
    );
};

export default EmptyBoard;

