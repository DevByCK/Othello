function Cell({ row, col, value, isValidMove, onClick, disabled }) {
  const classNames = ['cell'];
  if (isValidMove && value === 'empty') {
    classNames.push('cell--valid');
  }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      aria-label={`cell-${row}-${col}`}
      onClick={() => onClick(row, col)}
      disabled={disabled}
    >
      {value !== 'empty' ? <span className={`stone stone--${value}`} /> : null}
    </button>
  );
}

export default Cell;
