import React from 'react';
import { css } from '@emotion/react';

const ThingList = ({ things, sorted }) => {
  let keys = Object.keys(things);
  if (sorted) {
    keys.sort();
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 1rem;
      `}
    >
      {keys.map((x) => (
        <React.Fragment key={x}>
          <p
            css={css`
              margin: 0;
              font-style: italic;
              text-align: right;
            `}
          >
            {x}
          </p>
          <p
            css={css`
              margin: 0;
            `}
          >
            {things[x]}
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ThingList;
