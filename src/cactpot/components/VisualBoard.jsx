import './VisualBoard.scss';

const VisualBoard = ({
  boardState,
  updateCallback,
  allowEdits,
  editableSquare,
  highlightSquares,
  trueBoard,
}) => {
  function update(index, value) {
    if (
      value == null ||
      isNaN(value) ||
      !boardState.coveredNumbers.includes(value)
    ) {
      return;
    }
    const newBoardState = boardState.clone();
    newBoardState.uncover(index, value);
    updateCallback(newBoardState);
  }

  return (
    <div className="visualBoard">
      {boardState.squares.map((x, i) =>
        x === null ? (
          <div
            className={
              highlightSquares.includes(i)
                ? 'highlightSquare coveredSquare'
                : 'coveredSquare'
            }
            key={`${i}_covered`}
          >
            {allowEdits && (editableSquare == null || i === editableSquare) ? (
              <input
                type="text"
                onChange={(e) => update(i, parseInt(e.target.value))}
              ></input>
            ) : trueBoard != null ? (
              trueBoard[i]
            ) : null}
          </div>
        ) : (
          <div
            className={highlightSquares.includes(i) ? 'highlightSquare' : null}
            key={`${i}_${x}`}
          >
            {x}
          </div>
        )
      )}
    </div>
  );
};

export default VisualBoard;
