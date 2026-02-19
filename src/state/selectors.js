import { countStones } from '../logic/scorer.js';

export function selectCurrentPlayer(state) {
  return state.currentPlayer;
}

export function selectScores(state) {
  return countStones(state.board);
}

