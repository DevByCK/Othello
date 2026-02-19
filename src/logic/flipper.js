import { DIRECTIONS } from '../utils/constants.js';
import { getOpponentPlayer } from '../utils/helpers.js';
import { isInsideBoard } from '../utils/helpers.js';

function collectFlippableStonesByDirection(board, row, col, currentPlayer, direction) {
  const [dr, dc] = direction;
  const opponent = getOpponentPlayer(currentPlayer);
  const line = [];
  let cursorRow = row + dr;
  let cursorCol = col + dc;

  while (isInsideBoard(cursorRow, cursorCol)) {
    const cell = board[cursorRow][cursorCol];
    if (cell === opponent) {
      line.push([cursorRow, cursorCol]);
      cursorRow += dr;
      cursorCol += dc;
      continue;
    }

    if (cell === currentPlayer && line.length > 0) {
      return line;
    }

    return [];
  }

  return [];
}

export function collectFlippableStones(board, row, col, currentPlayer) {
  return DIRECTIONS.flatMap((direction) =>
    collectFlippableStonesByDirection(board, row, col, currentPlayer, direction),
  );
}
