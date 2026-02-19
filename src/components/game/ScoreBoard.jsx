import { countStones } from '../../logic/scorer.js';

function ScoreBoard({ board }) {
  const { black, white } = countStones(board);

  return (
    <div className="panel-box" aria-label="score board">
      <p>흑: {black}</p>
      <p>백: {white}</p>
    </div>
  );
}

export default ScoreBoard;

