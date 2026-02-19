export function countStones(board) {
  return board.flat().reduce(
    (acc, cell) => {
      if (cell === 'black') {
        acc.black += 1;
      } else if (cell === 'white') {
        acc.white += 1;
      }
      return acc;
    },
    { black: 0, white: 0 },
  );
}

