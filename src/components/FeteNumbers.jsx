import { css } from '@emotion/react';
import Panel from './Panel';
import ThingList from './ThingList';

const FETE_NUMBERS = {
  'A Twist of Fate': 6,
  'Made of Softer Stuff': 3,
  'Shear a Yak': 4,
  'Toy Hunter': 4,
  'Presents of Mind': 6,
};

const FeteNumbers = () => {
  return (
    <div
      css={css`
        width: 15rem;
      `}
    >
      <p
        css={css`
          margin: 0;
          margin-bottom: 0.5rem;
        `}
      >
        Minimum points needed to get maximum rewards:
      </p>
      <Panel>
        <ThingList things={FETE_NUMBERS} />
      </Panel>
    </div>
  );
};

export default FeteNumbers;
