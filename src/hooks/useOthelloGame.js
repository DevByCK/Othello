import { useReducer } from 'react';
import { createInitialState } from '../state/initialState.js';
import { gameReducer } from '../state/reducers.js';

export function useOthelloGame() {
  return useReducer(gameReducer, undefined, createInitialState);
}

