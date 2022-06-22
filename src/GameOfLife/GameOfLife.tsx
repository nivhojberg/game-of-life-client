import React from 'react';
import { useMutation, useQuery } from 'react-query';
import Api from '../Api';
import { BoardContext } from '../App/App';
import Board from '../Board/Board';
import EmptyBoard from '../EmptyBoard/EmptyBoard';
import { Board as MessageBoard, BoardStateResponse } from '../messages';

const GameOfLife = (): JSX.Element => {
    const { boardState, setBoardState } = React.useContext(BoardContext);

    const queryOptions = {
        onSuccess: ({ data }: { data: BoardStateResponse }) => {
            setBoardState(data.boardState);
        }
    };

    const getBoardResult = useQuery("get_board", Api.getBoard, queryOptions);

    const initResult = useMutation(Api.postInitialState);

    if (getBoardResult.isLoading) {
        return <div>Loading...</div>;
    }

    if (getBoardResult.error) {
        console.error(getBoardResult.error);
        return <div>An error occured when tried to fetch data from server (maybe server is down?)</div>;
    }

    const handleSubmitInitialState = (initialState: MessageBoard) => {
        initResult.mutate({ initialState: initialState }, queryOptions);
    };

    return (
        <>
            <h2>Game Of Life</h2>
            {boardState.isInitialized ?
                <Board /> :
                <EmptyBoard onSubmitInitalState={handleSubmitInitialState} />
            }
        </>
    );
};

export default GameOfLife;
