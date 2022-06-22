export type CellState = "alive" | "dead";

export type Board = CellState[][];

export interface BoardDetails {
    board: Board;
    step: number;
};

namespace BoardState {
    export interface InitializedBoardState {
        isInitialized: true;
        boardDetails: BoardDetails;
    };

    export interface UninitializedBoardState {
        isInitialized: false;
    };
};

export type BoardState =
    BoardState.InitializedBoardState |
    BoardState.UninitializedBoardState;

export interface BoardStateResponse {
    boardState: BoardState;
};

export interface InitStateRequest {
    initialState: Board;
}
