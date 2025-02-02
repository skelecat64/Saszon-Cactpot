import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PieceSelector from './PieceSelector';
import Panel from '../../components/Panel';
import ThingList from '../../components/ThingList';

const DEFAULT_PIECES = {
  'Allagan Bronze Piece': 100,
  'Allagan Silver Piece': 500,
  'Allagan Gold Piece': 2500,
  'Allagan Platinum Piece': 10000,
};

const DonationCalculator = ({ className }) => {
  const [pieces, setPieces] = useState(DEFAULT_PIECES);
  const [weeklyBudget, setWeeklyBudget] = useState(20000);
  const [gratuity, setGratuity] = useState(150);
  const [results, setResults] = useState(null);

  useEffect(() => {
    let budget = weeklyBudget;
    const results = {};
    for (let piece of Object.keys(pieces).sort(
      (a, b) => pieces[b] - pieces[a]
    )) {
      const cost = Math.floor((pieces[piece] * gratuity) / 100);
      results[piece] = Math.floor(budget / cost);
      budget %= cost;
    }
    setResults(results);
  }, [pieces, weeklyBudget, gratuity]);

  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        width: 17rem;
      `}
    >
      <PieceSelector defaultPieces={pieces} onChange={setPieces} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          p {
            margin: 0;
            font-size: 0.7rem;
          }
          input {
            margin-bottom: 0.5rem;
          }
        `}
      >
        <p>Weekly Budget</p>
        <input
          type="number"
          defaultValue={weeklyBudget}
          onChange={(x) => setWeeklyBudget(parseInt(x.target.value))}
        />
        <p>Gratuity (%)</p>
        <input
          type="number"
          defaultValue={gratuity}
          onChange={(x) => setGratuity(parseInt(x.target.value))}
        />
      </div>
      {results ? (
        <Panel>
          <ThingList things={results}></ThingList>
        </Panel>
      ) : null}
    </div>
  );
};

export default DonationCalculator;
