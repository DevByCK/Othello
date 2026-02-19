import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../app/App.jsx';

describe('App shell', () => {
  it('renders title and board', () => {
    render(<App />);

    expect(screen.getByText('OTHELLO')).toBeInTheDocument();
    expect(screen.getByLabelText('othello board')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /cell-/ })).toHaveLength(64);
  });

  it('changes turn when valid move is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('cell-2-3'));

    expect(screen.getByText('현재 턴: 백')).toBeInTheDocument();
    expect(screen.getByText('흑: 4')).toBeInTheDocument();
    expect(screen.getByText('백: 1')).toBeInTheDocument();
  });

  it('shows message when invalid move is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('cell-0-0'));

    expect(screen.getByText('유효하지 않은 자리입니다.')).toBeInTheDocument();
  });
});
