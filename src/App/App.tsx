import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import GameOfLife from '../GameOfLife/GameOfLife';
import React from 'react';
import { BoardState } from '../messages';

export const API_URL = process.env.API_URL || "http://localhost:3000/";

const EMPTY_BOARD_STATE: BoardState = {
  isInitialized: false
};

export const BoardContext = React.createContext<{
  boardState: BoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
}>({
  boardState: EMPTY_BOARD_STATE,
  setBoardState: () => {}
});

const App = (): JSX.Element => {
  const queryClient = new QueryClient();
  const [boardState, setBoardState] = React.useState<BoardState>(EMPTY_BOARD_STATE);
  const boardContextValue = React.useMemo(
    () => ({ boardState, setBoardState }),
    [boardState]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BoardContext.Provider value={boardContextValue}>
        <div className="App">
          <GameOfLife />
        </div>
      </BoardContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
