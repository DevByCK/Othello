import { PLAYERS, STATUS } from '../utils/constants.js';
import { getOpponentPlayer } from '../utils/helpers.js';
import { collectFlippableStones } from './flipper.js';
import { getValidMoves, isValidMove } from './moveValidator.js';
import { countStones } from './scorer.js';

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getResult(board) {
  const { black, white } = countStones(board);
  if (black > white) {
    return 'black_win';
  }
  if (white > black) {
    return 'white_win';
  }
  return 'draw';
}

function getPlayerLabel(player) {
  return player === PLAYERS.BLACK ? '흑' : '백';
}

function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== 'empty'));
}

export function applyMove(state, row, col) {
  if (state.status !== STATUS.PLAYING) {
    return { ...state, message: '게임이 종료되었습니다. 새 게임을 시작하세요.' };
  }

  if (!isValidMove(state.board, row, col, state.currentPlayer)) {
    return { ...state, message: '유효하지 않은 자리입니다.' };
  }

  const nextBoard = cloneBoard(state.board);
  const flips = collectFlippableStones(nextBoard, row, col, state.currentPlayer);
  nextBoard[row][col] = state.currentPlayer;
  flips.forEach(([flipRow, flipCol]) => {
    nextBoard[flipRow][flipCol] = state.currentPlayer;
  });

  if (isBoardFull(nextBoard)) {
    return {
      ...state,
      board: nextBoard,
      status: STATUS.FINISHED,
      validMoves: [],
      passCount: 0,
      result: getResult(nextBoard),
      message: '보드가 가득 찼습니다. 게임 종료!',
    };
  }

  const nextPlayer = getOpponentPlayer(state.currentPlayer);
  const nextPlayerMoves = getValidMoves(nextBoard, nextPlayer);

  if (nextPlayerMoves.length > 0) {
    return {
      ...state,
      board: nextBoard,
      currentPlayer: nextPlayer,
      validMoves: nextPlayerMoves,
      passCount: 0,
      message: `${getPlayerLabel(nextPlayer)} 턴입니다.`,
    };
  }

  const currentPlayerMoves = getValidMoves(nextBoard, state.currentPlayer);
  if (currentPlayerMoves.length > 0) {
    return {
      ...state,
      board: nextBoard,
      currentPlayer: state.currentPlayer,
      validMoves: currentPlayerMoves,
      passCount: 1,
      message: `${getPlayerLabel(nextPlayer)}이(가) 둘 곳이 없어 패스되었습니다.`,
    };
  }

  return {
    ...state,
    board: nextBoard,
    status: STATUS.FINISHED,
    validMoves: [],
    passCount: 2,
    result: getResult(nextBoard),
    message: '양쪽 모두 둘 곳이 없어 게임이 종료되었습니다.',
  };
}
