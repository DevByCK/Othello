import { toCellKey } from '../../utils/helpers.js';
import Cell from './Cell.jsx';
import './Board.css';

function Board({ board, validMoves, onCellClick, isFinished }) {
  const validMoveSet = new Set(validMoves.map(({ row, col }) => toCellKey(row, col)));

  return (
    <div className="board" role="grid" aria-label="othello board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={toCellKey(rowIndex, colIndex)}
            row={rowIndex}
            col={colIndex}
            value={cell}
            isValidMove={validMoveSet.has(toCellKey(rowIndex, colIndex))}
            onClick={onCellClick}
            disabled={isFinished}
          />
        )),
      )}
    </div>
  );
}

export default Board;
