import { css } from '@emotion/react';

const Widget = ({ title, className, children }) => {
  return (
    <div
      css={css`
        border: 4px solid lightgrey;
        border-radius: 0.25rem;
        display: flex;
        flex-direction: column;
      `}
      className={className}
    >
      <h1
        css={css`
          margin: 0;
          text-align: center;
          margin-top: 0.5rem;
          margin-bottom: 0;
          margin-left: 1rem;
          margin-right: 1rem;
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
