import React from 'react';
import { css } from '@emotion/react';

const ThingList = ({ things }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 1rem;
      `}
    >
      {Object.keys(things).map((x) => (
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
