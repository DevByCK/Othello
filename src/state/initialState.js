import { BOARD_SIZE, PLAYERS, STATUS } from '../utils/constants.js';
import { getValidMoves } from '../logic/moveValidator.js';

export function createInitialBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => 'empty'),
  );

  const middle = BOARD_SIZE / 2;
  board[middle - 1][middle - 1] = PLAYERS.WHITE;
  board[middle][middle] = PLAYERS.WHITE;
  board[middle - 1][middle] = PLAYERS.BLACK;
  board[middle][middle - 1] = PLAYERS.BLACK;

  return board;
}

export function createInitialState() {
  const board = createInitialBoard();
  return {
    board,
    currentPlayer: PLAYERS.BLACK,
    validMoves: getValidMoves(board, PLAYERS.BLACK),
    passCount: 0,
    status: STATUS.PLAYING,
    result: null,
    message: '흑 턴입니다.',
  };
}
