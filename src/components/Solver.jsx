import { useState, useEffect, useCallback } from 'react';
import { solve, evaluateBoard, evaluateLine } from '../utils/solving';
import { CHOICE_LINES } from '../constants';
import BoardState from '../boardState';
import VisualBoard from './VisualBoard';

import './Solver.scss';
import MgpDisplay from './MgpDisplay';

function getImageForAveragePrize(prize) {
  if (prize >= 1300) {
    return './rulia_verygood.png';
  } else if (prize >= 500) {
    return './rulia_think.png';
  } else {
    return './rulia_verybad.png';
  }
}

const Solver = () => {
  const [board, setBoard] = useState(new BoardState());
  const [shouldUpdateState, setShouldUpdateState] = useState(false);
  const [uncoverInstruction, setUncoverInstruction] = useState(null);
  const [lineInstruction, setLineInstruction] = useState(null);
  const [lineInstructionPrize, setLineInstructionPrize] = useState(null);

  const updateBoard = useCallback((newBoardState) => {
    setBoard(newBoardState);
    setShouldUpdateState(true);
  }, []);

  const undo = () => {
    if (board.actionsTaken.length === 0) {
      return;
    }
    const newBoardState = board.clone();
    newBoardState.undo();
    updateBoard(newBoardState);
    setShouldUpdateState(true);
  };

  const reset = () => {
    updateBoard(new BoardState());
    setShouldUpdateState(true);
  };

  useEffect(() => {
    if (!shouldUpdateState) {
      return;
    }
    setShouldUpdateState(false);

    if (board.coveredNumbers.length === 9) {
      setUncoverInstruction(null);
      setLineInstruction(null);
      return;
    }

    const uncoveringsRemaining = Math.max(
      3 - 8 + board.coveredNumbers.length,
      0
    );

    if (uncoveringsRemaining === 0) {
      setUncoverInstruction(null);
      const [_, lineIndex] = evaluateBoard(board);
      setLineInstruction(lineIndex);
      setLineInstructionPrize(evaluateLine(board, lineIndex));
      return;
    }

    const [_, index] = solve(board.clone(), uncoveringsRemaining);
    setUncoverInstruction(index);
    setLineInstruction(null);
  }, [shouldUpdateState, board]);

  return (
    <div className="solver">
      <VisualBoard
        boardState={board}
        updateCallback={updateBoard}
        allowEdits={board.actionsTaken.length < 4}
        editableSquare={uncoverInstruction}
        highlightSquares={
          lineInstruction != null ? CHOICE_LINES[lineInstruction] : []
        }
      />
      <section className="controls">
        <button
          onClick={() => undo()}
          disabled={board.coveredNumbers.length === 9}
        >
          Undo
        </button>
        <button
          onClick={() => reset()}
          disabled={board.coveredNumbers.length === 9}
        >
          Reset
        </button>
      </section>
      <section className="instructions">
        {uncoverInstruction !== null ? <p>Uncover the next square!</p> : null}
        {lineInstruction !== null ? (
          <>
            <p>Play the line!</p>
            <p>
              avg. <MgpDisplay amount={lineInstructionPrize} />
            </p>
          </>
        ) : null}
        {uncoverInstruction === null && lineInstruction === null ? (
          <p>Input the uncovered square!</p>
        ) : null}
      </section>
      {lineInstruction != null ? (
        <img src={getImageForAveragePrize(lineInstructionPrize)} />
      ) : null}
    </div>
  );
};

export default Solver;
