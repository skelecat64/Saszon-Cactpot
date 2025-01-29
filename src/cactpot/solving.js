import { CHOICE_LINES, SUM_REWARDS } from './constants';

export function getPrize(numbers) {
  return SUM_REWARDS[numbers.reduce((a, x) => a + x, 0)];
}

export function getCombinationsForLine(existingNumbers, coveredNumbers) {
  const combinations = [];
  const both = existingNumbers.concat(coveredNumbers);
  const mostSignificantBit = 2 ** (both.length - 1);

  const start = (2 ** existingNumbers.length - 1) << coveredNumbers.length;
  const end = 2 ** both.length;
  for (let n = start; n < end; n++) {
    let bitCount = 0;
    let countNumber = n;
    while (countNumber !== 0 && bitCount <= 3) {
      bitCount += countNumber & 1;
      countNumber >>= 1;
    }
    if (bitCount !== 3) {
      continue;
    }

    const combination = [];
    let i = 0;
    let currentNum = n;
    while (currentNum !== 0) {
      if ((currentNum & mostSignificantBit) === mostSignificantBit) {
        combination.push(both[i]);
      }
      i++;
      currentNum <<= 1;
    }
    combinations.push(combination);
  }
  return combinations;
}

export function evaluateLine(board, lineIndex) {
  const existingNumbers = [];
  for (let index of CHOICE_LINES[lineIndex]) {
    if (board.squares[index] !== null) {
      existingNumbers.push(board.squares[index]);
    }
  }

  if (existingNumbers.length === 3) {
    return getPrize(existingNumbers);
  }

  let prizeTotals = 0;
  let prizeCount = 0;

  for (let combination of getCombinationsForLine(
    existingNumbers,
    board.coveredNumbers
  )) {
    prizeTotals += getPrize(combination);
    prizeCount += 1;
  }

  return prizeTotals / prizeCount;
}

export function evaluateBoard(board) {
  let topLineIndex = null;
  let topLinePrize = 0;
  for (let i = 0; i < CHOICE_LINES.length; i++) {
    const prize = evaluateLine(board, i);
    if (prize >= topLinePrize) {
      topLineIndex = i;
      topLinePrize = prize;
    }
  }
  return [topLinePrize, topLineIndex];
}

export function solve(board, uncoveringsRemaining = 3) {
  if (uncoveringsRemaining === 0) {
    return [evaluateBoard(board)[0], null];
  }

  let topIndex = null;
  let topPrize = 0;

  for (let i = 0; i < board.squares.length; i++) {
    if (board.squares[i] !== null) {
      continue;
    }
    let totalFromUncoverings = 0;
    for (let number of [...board.coveredNumbers]) {
      board.uncover(i, number);
      const [prize, _] = solve(board, uncoveringsRemaining - 1);
      totalFromUncoverings += prize;
      board.undo();
    }
    const averageFromUncoverings =
      totalFromUncoverings / board.coveredNumbers.length;
    if (averageFromUncoverings >= topPrize) {
      topIndex = i;
      topPrize = averageFromUncoverings;
    }
  }

  return [topPrize, topIndex];
}
