import { css } from '@emotion/react';

const Widget = ({ title, className, children }) => {
  return (
    <div
      css={css`
        border: 4px solid lightgrey;
        border-radius: 0.25rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      `}
      className={className}
    >
      <h1
        css={css`
          margin: 0;
          margin-top: 1rem;
          text-align: center;
        `}
      >
        {title}
      </h1>
      <div
        css={css`
          margin: 1rem;
          flex-grow: 1;
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Widget;
