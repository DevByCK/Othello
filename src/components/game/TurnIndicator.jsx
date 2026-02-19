function TurnIndicator({ currentPlayer, status, message }) {
  const playerName = currentPlayer === 'black' ? '흑' : '백';
  const statusLabel = status === 'finished' ? '종료' : '진행 중';

  return (
    <div className="panel-box" aria-label="turn indicator">
      <p>현재 턴: {playerName}</p>
      <p>상태: {statusLabel}</p>
      <p>{message}</p>
    </div>
  );
}

export default TurnIndicator;
