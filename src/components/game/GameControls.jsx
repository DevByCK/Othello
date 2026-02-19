import Button from '../common/Button.jsx';

function GameControls({ onReset }) {
  return (
    <div className="panel-box">
      <Button label="새 게임" onClick={onReset} />
    </div>
  );
}

export default GameControls;
