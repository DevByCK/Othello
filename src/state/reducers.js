import { createInitialState } from './initialState.js';
import { applyMove } from '../logic/gameEngine.js';

export function gameReducer(state, action) {
  if (action.type === 'RESET_GAME') {
    return createInitialState();
  }

  if (action.type === 'PLACE_STONE') {
    return applyMove(state, action.payload.row, action.payload.col);
  }

  return state;
}
