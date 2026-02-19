import { BOARD_SIZE } from './constants.js';

export function toCellKey(row, col) {
  return `${row}-${col}`;
}

export function getOpponentPlayer(player) {
  return player === 'black' ? 'white' : 'black';
}

export function isInsideBoard(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}
