import { describe, expect, it } from 'vitest';
import { applyMove } from '../../logic/gameEngine.js';
import { createInitialState } from '../../state/initialState.js';

describe('gameEngine', () => {
  it('applies valid move and flips stones', () => {
    const initial = createInitialState();
    const next = applyMove(initial, 2, 3);

    expect(next.board[2][3]).toBe('black');
    expect(next.board[3][3]).toBe('black');
    expect(next.currentPlayer).toBe('white');
    expect(next.passCount).toBe(0);
  });

  it('keeps state when move is invalid', () => {
    const initial = createInitialState();
    const next = applyMove(initial, 0, 0);

    expect(next.board).toEqual(initial.board);
    expect(next.currentPlayer).toBe('black');
    expect(next.message).toBe('유효하지 않은 자리입니다.');
  });
});

