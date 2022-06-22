import './Board.css';
import { BoardDetails, BoardState, BoardStateResponse, CellState } from "../messages";
import { useMutation, useQuery } from 'react-query';
import Api from '../Api';
import React from 'react';
import { BoardContext } from '../App/App';
import Row from '../Components/Row';
import Modal from '../Modal/Modal';

interface Props {
    onResetBoard: (emptyBoard: BoardState) => void;
};

const Board = (props: Props): JSX.Element => {
    const { boardState, setBoardState } = React.useContext(BoardContext);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isDeadModalOpen, setIsDeadModalOpen] = React.useState(false);

    if (!boardState.isInitialized) {
        return <></>;
    }

    const nextResult = useMutation(Api.getNextStep);
    const resetResult = useMutation(Api.getResetBoard);

    React.useEffect(() => {
        if (isRunning) {
            nextResult.mutate(null, {
                onSuccess({ data }: { data: BoardStateResponse }) {
                    setBoardState(data.boardState);
                    if (isAllLifeDead(data.boardState)) {
                        setIsDeadModalOpen(true);
                        setIsRunning(false);
                    }
                }
            });
        }
    }, [isRunning, boardState.boardDetails.step]);

    const handleClickReset = () => {
        if (!isRunning) {
            resetResult.mutate(null, {
                onSuccess({ data }: { data: BoardStateResponse }) {
                    props.onResetBoard(data.boardState);
                },
            });
        }
    };

    const isAllLifeDead = (boardState: BoardState): boolean => {
        if (!boardState.isInitialized) return false;
        return boardState.boardDetails.board.find((row: CellState[]) =>
            row.find((cell: CellState) => cell === "alive")
        ) === undefined;
    };

    const handleClickNext = () => {
        nextResult.mutate(null, {
            onSuccess({ data }: { data: BoardStateResponse }) {
                setBoardState(data.boardState);
                if (isAllLifeDead(data.boardState)) {
                    setIsDeadModalOpen(true);
                }
            }
        });
    };

    const handleToggleRun = () => {
        setIsRunning(!isRunning);
    };

    return (
        <>
            <div className="actions">
                <button onClick={handleClickReset} disabled={isRunning}>
                    Reset
                </button>
                <button onClick={handleClickNext}>
                    Next
                </button>
                <button onClick={handleToggleRun}>
                    {isRunning ? "Stop": "Start"}
                </button>
            </div>
            <div className="step">
                Generations: {boardState.boardDetails.step + 1}
            </div>
            <div className="board">
                {boardState.boardDetails.board.map((row: CellState[], rowIndex: number) => (
                    <Row
                        key={`row-${rowIndex}`}
                        columns={row}
                        rowIndex={rowIndex}
                    />
                ))}
            </div>
            <Modal
                isOpen={isDeadModalOpen}
                onRequestClose={() => setIsDeadModalOpen(false)}
                title="Alert"
            >
                All the life is dead
            </Modal>
        </>
    );
};

export default Board;

