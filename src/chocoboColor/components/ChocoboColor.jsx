import { useState } from 'react';
import ColorSelector from './ColorSelector';
import { css } from '@emotion/react';
import { CHOCOBO_COLORS, CHOCOBO_FRUITS } from '../ChocoboColors';
import FruitSequenceDisplay from './FruitSequenceDisplay';

function getColorIndex(color) {
  return (color[0] << 16) + (color[1] << 8) + color[2];
}

function getDistance(color1, color2) {
  let totals = 0;
  for (let i = 0; i < 3; i++) {
    totals += (color1[i] - color2[i]) ** 2;
  }
  return Math.sqrt(totals);
}

function getClosestColorKey(color) {
  let closest = null;
  let closestDistance = Infinity;
  for (let colorKey in CHOCOBO_COLORS) {
    const dist = getDistance(color, CHOCOBO_COLORS[colorKey]);
    if (dist < closestDistance) {
      closestDistance = dist;
      closest = colorKey;
    }
  }
  return closest;
}

function evaluateSequence(fromColor, sequence) {
  let color = fromColor;
  for (let fruit of sequence) {
    color = CHOCOBO_FRUITS[fruit](color);
  }
  return color;
}

function isSequenceSafe(fromColor, sequence) {
  const edgeBuffer = 25;
  let color = fromColor;
  for (let fruit of sequence) {
    color = CHOCOBO_FRUITS[fruit](color);
    if (color.some((x) => x < edgeBuffer || x > 255 - edgeBuffer)) {
      return false;
    }
  }
  return true;
}

function groupFruitsInSequence(fromColor, sequence) {
  const requiredOutputColorIndex = getColorIndex(
    evaluateSequence(fromColor, sequence)
  );
  let lastValidSequence = sequence.slice();
  let currentSequence = sequence.slice();

  for (let pass = 0; pass < 1000; pass++) {
    const skipList = new Set();
    let changesMade = false;

    for (let i = currentSequence.length - 1; i > 0; i--) {
      if (currentSequence[i] === currentSequence[i - 1]) {
        continue;
      }

      if (skipList.has(currentSequence[i - 1])) {
        skipList.delete(currentSequence[i - 1]);
        continue;
      }
      skipList.add(currentSequence[i - 1]);

      let swapTo = currentSequence.indexOf(currentSequence[i - 1], i);

      if (swapTo !== -1 && swapTo > i) {
        for (let j = i - 1; j < swapTo; j++) {
          const temp = currentSequence[j + 1];
          currentSequence[j + 1] = currentSequence[j];
          currentSequence[j] = temp;
        }
      }

      const outputColorIndex = getColorIndex(
        evaluateSequence(fromColor, currentSequence)
      );
      if (
        outputColorIndex === requiredOutputColorIndex &&
        isSequenceSafe(fromColor, currentSequence)
      ) {
        lastValidSequence = currentSequence.slice();
        changesMade = true;
      } else {
        currentSequence = lastValidSequence.slice();
      }
    }

    if (!changesMade) {
      console.log(pass);
      break;
    }
  }

  return lastValidSequence;
}

function createSequence(
  fromColorKey,
  toColorKey,
  favorAccuracy = true,
  hanLemon = true
) {
  const fromColor = CHOCOBO_COLORS[fromColorKey];
  const toColor = CHOCOBO_COLORS[toColorKey];
  const visitedColors = new Set();

  function search(currentSequence, currentColor, depth) {
    function getScore(sequence, colorResult) {
      const found = getClosestColorKey(colorResult) === toColorKey;
      return (found ? 10000 : 0) - getDistance(colorResult, toColor);
    }

    if (depth <= 0 || visitedColors.has(currentColor)) {
      return [currentSequence, getScore(currentSequence, currentColor)];
    }
    visitedColors.add(currentColor);

    const fruits = Object.keys(CHOCOBO_FRUITS).filter(
      (x) => x !== 'Han Lemon' || hanLemon
    );
    const fruitDistances = {};
    for (let fruit of fruits) {
      fruitDistances[fruit] = getDistance(
        CHOCOBO_FRUITS[fruit](currentColor),
        toColor
      );
    }

    fruits.sort((a, b) => (fruitDistances[a] > fruitDistances[b] ? 1 : -1));

    const currentDistance = getDistance(currentColor, toColor);

    let bestSequence = currentSequence;
    let bestSequenceScore = getScore(currentSequence, currentColor);

    for (let fruit of fruits) {
      const isImmediatelyCloser = fruitDistances[fruit] < currentDistance;

      const [nextSequence, nextScore] = search(
        [...currentSequence, fruit],
        CHOCOBO_FRUITS[fruit](currentColor),
        isImmediatelyCloser ? depth : depth - 1
      );

      if (
        nextScore > bestSequenceScore ||
        (nextScore === bestSequenceScore &&
          nextSequence.length < bestSequence.length)
      ) {
        bestSequence = nextSequence;
        bestSequenceScore = nextScore;
        if (isImmediatelyCloser) {
          // greedy heuristic
          break;
        }
      }
    }

    return [bestSequence, bestSequenceScore];
  }

  let sequence, score;
  const depth = favorAccuracy ? 5 : 1;

  if (hanLemon) {
    const isDesertYellow = fromColorKey === 'Desert Yellow';
    [sequence, score] = search(
      isDesertYellow ? [] : ['Han Lemon'],
      CHOCOBO_COLORS['Desert Yellow'],
      depth
    );
  } else {
    [sequence, score] = search([], fromColor, depth);
  }
  console.log('SCORE', sequence, score);
  console.log('COLOR', toColor, evaluateSequence(fromColor, sequence));
  if (score < 0) {
    return ['The Chocobo Will Starve'];
  }
  return groupFruitsInSequence(fromColor, sequence);
  return sequence;
}

const ChocoboColor = () => {
  const [fromColorKey, setFromColorKey] = useState('Desert Yellow');
  const [toColorKey, setToColorKey] = useState('Colibri Pink');
  const [favorAccuracy, setFavorAccuracy] = useState(true);
  const [hanLemonStart, setHanLemonStart] = useState(true);

  const sequence = createSequence(
    fromColorKey,
    toColorKey,
    favorAccuracy,
    hanLemonStart
  );
  const totalFruit = sequence.length;
  const distance = getDistance(
    evaluateSequence(CHOCOBO_COLORS[fromColorKey], sequence),
    CHOCOBO_COLORS[toColorKey]
  );

  return (
    <div
      css={css`
        width: 17rem;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: auto auto;
          gap: 0.5rem;
          align-items: center;
          > p {
            margin: 0;
            text-align: right;
          }
        `}
      >
        <p>From colour:</p>
        <ColorSelector
          defaultColorKey={fromColorKey}
          onChange={setFromColorKey}
        />
        <p>To colour:</p>
        <ColorSelector defaultColorKey={toColorKey} onChange={setToColorKey} />
        <p title="Force RGB to known values with a Han Lemon to guarantee success.">
          Han Lemon start?
        </p>
        <input
          css={css`
            justify-self: start;
            align-self: left;
          `}
          type="checkbox"
          defaultChecked={hanLemonStart}
          onChange={(e) => setHanLemonStart(e.target.checked)}
        ></input>
        <p title="Use extra fruit to be more accurate.">Favour accuracy?</p>
        <input
          css={css`
            justify-self: start;
            align-self: left;
          `}
          type="checkbox"
          defaultChecked={favorAccuracy}
          onChange={(e) => setFavorAccuracy(e.target.checked)}
        ></input>
      </div>
      <p
        css={css`
          margin: 0;
          margin-bottom: -0.5rem;
          font-size: 0.75rem;
          font-style: italic;
        `}
      >
        Distance from ideal: {distance}
      </p>
      <FruitSequenceDisplay fruitSequence={sequence} />
      <ol
        css={css`
          display: none;
        `}
      >
        {sequence.map((x, i) => (
          <li key={`${i}_${x}`}>{x}</li>
        ))}
      </ol>
    </div>
  );
};

export default ChocoboColor;
