import BoardState from "./boardState";
import { CHOICE_LINES } from "./constants";
import { getRandomized, randomIntegerRange } from "./utils/randomness";
import { evaluateBoard, getPrize, solve } from "./utils/solving";

function createRandomBoard() {
  return getRandomized([1, 2, 3, 4, 5, 6, 7, 8, 9]);
}

function getLargestPossiblePrize(trueBoard) {
  const boardState = new BoardState();
  for (let i = 0; i < boardState.squares.length; i++) {
    boardState.uncover(i, trueBoard[i]);
  }
  const [prize, _] = evaluateBoard(boardState);
  return prize;
}

onmessage = (e) => {
  console.log(e.data);
  if (e.data.messageType !== "START") {
    return;
  }

  for (let i = 0; i < e.data.data.numberOfGames; i++) {
    const trueBoard = createRandomBoard();
    const boardState = new BoardState();

    const initialUncoverIndex = randomIntegerRange(0, 8);
    boardState.uncover(initialUncoverIndex, trueBoard[initialUncoverIndex]);

    postMessage({
      messageType: "GAME_START",
      data: { boardState: boardState.clone(), gameNumber: i + 1 },
    });

    for (let j = 3; j >= 1; j--) {
      const [_, topIndex] = solve(boardState.clone(), j);
      boardState.uncover(topIndex, trueBoard[topIndex]);

      postMessage({
        messageType: "GAME_UPDATE",
        data: { boardState: boardState.clone() },
      });
    }

    const [_, topLineIndex] = evaluateBoard(boardState);
    const chosenLine = CHOICE_LINES[topLineIndex];
    const prize = getPrize(trueBoard.filter((_, i) => chosenLine.includes(i)));

    postMessage({
      messageType: "GAME_END",
      data: {
        boardState: boardState,
        trueBoard: trueBoard,
        prize: prize,
        largestPossiblePrize: getLargestPossiblePrize(trueBoard),
        chosenLineIndex: topLineIndex,
        chosenLine: chosenLine,
        gameNumber: i + 1,
      },
    });
  }

  postMessage({ messageType: "END" });
};
