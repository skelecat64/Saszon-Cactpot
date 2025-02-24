import { css } from '@emotion/react';
import { useState } from 'react';

const PieceSelector = ({ defaultPieces, onChange }) => {
  const [pieces, setPieces] = useState(defaultPieces ?? {});
  const [newPieceName, setNewPieceName] = useState('');

  function addPiece(name, price) {
    if (name === '') {
      return;
    }
    const newPieces = { ...pieces, [name]: price };
    setPieces(newPieces);
    onChange(newPieces);
  }

  function modifyPrice(name, price) {
    const newPieces = { ...pieces };
    newPieces[name] = price;
    setPieces(newPieces);
    onChange(newPieces);
  }

  function removePiece(name) {
    const newPieces = {};
    for (let key in pieces) {
      if (key !== name) {
        newPieces[key] = pieces[key];
      }
    }
    setPieces(newPieces);
    onChange(newPieces);
  }

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
        `}
      >
        {Object.keys(pieces).map((x) => (
          <div
            key={x}
            css={css`
              display: flex;
              column-gap: 0.5rem;
            `}
          >
            <p
              css={css`
                margin: 0;
                flex-grow: 1;
                font-style: italic;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
              `}
            >
              {x}
            </p>
            <input
              defaultValue={pieces[x]}
              css={css`
                width: 4rem;
              `}
              type="number"
              onChange={(e) => modifyPrice(x, parseInt(e.target.value))}
            />
            <p
              css={css`
                color: var(--theme);
                font-weight: bold;
                margin: 0;
                user-select: none;
                cursor: pointer;
              `}
              onClick={(e) => removePiece(x)}
            >
              x
            </p>
          </div>
        ))}
      </div>
      <div
        css={css`
          display: flex;
          column-gap: 0.5rem;
          margin-top: 0.5rem;
          justify-content: right;
        `}
      >
        <input
          css={css`
            flex-grow: 1;
          `}
          value={newPieceName}
          onChange={(e) => setNewPieceName(e.target.value)}
        />
        <p
          css={css`
            color: var(--theme);
            font-weight: bold;
            margin: 0;
            user-select: none;
            cursor: pointer;
          `}
          onClick={(e) => {
            addPiece(newPieceName, 0);
            setNewPieceName('');
          }}
        >
          +
        </p>
      </div>
    </div>
  );
};

export default PieceSelector;
