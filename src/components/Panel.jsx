import { css } from '@emotion/react';

const Panel = ({ children }) => {
  return (
    <div
      css={css`
        background-color: #eee;
        border-radius: 0.25rem;
        padding: 0.5rem;
      `}
    >
      {children}
    </div>
  );
};

export default Panel;
