import Board from '../components/board/Board.jsx';
import GameControls from '../components/game/GameControls.jsx';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import TurnIndicator from '../components/game/TurnIndicator.jsx';
import { useOthelloGame } from '../hooks/useOthelloGame.js';

function App() {
  const [state, dispatch] = useOthelloGame();

  function handleCellClick(row, col) {
    dispatch({ type: 'PLACE_STONE', payload: { row, col } });
  }

  function handleReset() {
    dispatch({ type: 'RESET_GAME' });
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">OTHELLO</h1>
      </header>
      <main className="app__main">
        <section className="app__panel">
          <TurnIndicator currentPlayer={state.currentPlayer} status={state.status} message={state.message} />
          <ScoreBoard board={state.board} />
          <GameControls onReset={handleReset} />
        </section>
        <section className="app__board">
          <Board
            board={state.board}
            validMoves={state.validMoves}
            onCellClick={handleCellClick}
            isFinished={state.status === 'finished'}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
