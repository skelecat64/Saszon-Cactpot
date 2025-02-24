import { useRef, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Panel from '../../components/Panel';
import ThingList from '../../components/ThingList';

function createInstructionText(sequenceInstruction) {
  if (sequenceInstruction[0] === 'Han Lemon' && sequenceInstruction[1] === 1) {
    return `Feed your chocobo a ${sequenceInstruction[0]}, and re-enter the stables!`;
  }
  return `Feed your chocobo ${sequenceInstruction[1]} ${sequenceInstruction[0]}!`;
}

const FruitSequenceDisplay = ({ fruitSequence }) => {
  const fruitSequenceTracker = useRef(fruitSequence);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  useEffect(() => {
    if (fruitSequence !== fruitSequenceTracker.current) {
      setCurrentInstructionIndex(0);
    }
  }, [fruitSequence]);

  const totals = {};
  const feedOrder = [];

  let currentFruit = fruitSequence[0];
  let currentFruitAmount = 0;

  for (let fruit of fruitSequence) {
    if (!totals.hasOwnProperty(fruit)) {
      totals[fruit] = 0;
    }
    totals[fruit]++;

    if (fruit === currentFruit) {
      currentFruitAmount++;
    } else {
      feedOrder.push([currentFruit, currentFruitAmount]);
      currentFruit = fruit;
      currentFruitAmount = 1;
    }
  }
  if (fruitSequence.length > 0) {
    feedOrder.push([currentFruit, currentFruitAmount]);
  }

  if (Object.keys(totals).length === 0) {
    totals['Tasty Krakka Root'] = 1;
  }

  const currentInstruction = feedOrder[currentInstructionIndex];

  return (
    <div>
      <Panel>
        <ThingList things={totals} />
      </Panel>
      <div
        css={css`
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.5rem;
            height: 5rem;
            > p {
              margin: 0;
            }
          `}
        >
          {currentInstruction === undefined ? (
            <p
              css={css`
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              `}
            >
              <span>
                {fruitSequence.length === 1 && fruitSequence[0] === 'Han Lemon'
                  ? "You're done!"
                  : fruitSequence.length >= 1
                  ? "You're done! Keep your chocobo in the stable and wait 6 hours."
                  : 'Give your chocobo a tasty treat!'}
                {}
              </span>
            </p>
          ) : (
            <>
              <p>
                Step {currentInstructionIndex + 1}/{feedOrder.length}
              </p>
              <p>{createInstructionText(currentInstruction)}</p>
            </>
          )}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 0.5rem;
          `}
        >
          <button
            onClick={() => setCurrentInstructionIndex((prev) => prev - 1)}
            disabled={currentInstructionIndex === 0}
          >
            Back
          </button>
          <button
            onClick={() => setCurrentInstructionIndex(0)}
            disabled={currentInstructionIndex === 0}
          >
            Reset
          </button>
          <button
            onClick={() => setCurrentInstructionIndex((prev) => prev + 1)}
            disabled={currentInstructionIndex >= feedOrder.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FruitSequenceDisplay;
