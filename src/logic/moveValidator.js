import { BOARD_SIZE } from '../utils/constants.js';
import { isInsideBoard } from '../utils/helpers.js';
import { collectFlippableStones } from './flipper.js';

export function isValidMove(board, row, col, currentPlayer) {
  if (!isInsideBoard(row, col)) {
    return false;
  }

  if (board[row][col] !== 'empty') {
    return false;
  }

  return collectFlippableStones(board, row, col, currentPlayer).length > 0;
}

export function getValidMoves(board, currentPlayer) {
  const validMoves = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (isValidMove(board, row, col, currentPlayer)) {
        validMoves.push({ row, col });
      }
    }
  }

  return validMoves;
}
