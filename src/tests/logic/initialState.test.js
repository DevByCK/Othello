import { describe, expect, it } from 'vitest';
import { BOARD_SIZE, PLAYERS, STATUS } from '../../utils/constants.js';
import { createInitialState } from '../../state/initialState.js';

describe('createInitialState', () => {
  it('creates standard othello initial board', () => {
    const state = createInitialState();
    const middle = BOARD_SIZE / 2;

    expect(state.board).toHaveLength(BOARD_SIZE);
    expect(state.board[middle - 1][middle - 1]).toBe(PLAYERS.WHITE);
    expect(state.board[middle][middle]).toBe(PLAYERS.WHITE);
    expect(state.board[middle - 1][middle]).toBe(PLAYERS.BLACK);
    expect(state.board[middle][middle - 1]).toBe(PLAYERS.BLACK);
    expect(state.currentPlayer).toBe(PLAYERS.BLACK);
    expect(state.status).toBe(STATUS.PLAYING);
  });
});

