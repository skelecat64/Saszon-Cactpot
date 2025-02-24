import { useState, useRef, useEffect } from 'react';
import {
  CHOCOBO_COLORS,
  createStyleColor,
  getContrastingColor,
} from '../ChocoboColors';
import { css } from '@emotion/react';

const ColorSelector = ({ defaultColorKey, onChange }) => {
  const [colorKey, setColorKey] = useState(defaultColorKey);
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef();
  const expandedPanelRef = useRef();

  const selectColor = (colorKey) => {
    setColorKey(colorKey);
    if (onChange) {
      onChange(colorKey);
    }
    setExpanded(false);
  };

  useEffect(() => {
    const listener = (e) => {
      if (
        !e.target !== expandedPanelRef.current &&
        e.target.parentNode !== expandedPanelRef.current &&
        e.target !== buttonRef.current
      ) {
        setExpanded(false);
      }
    };
    window.addEventListener('mousedown', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
    };
  }, []);

  const buttonBounds = buttonRef.current?.getBoundingClientRect();

  return (
    <>
      <div
        css={css`
          display: inline-block;
          padding: 0.2rem;
          border-radius: 0.25rem;
          user-select: none;
          cursor: pointer;
          text-align: center;
        `}
        style={{
          backgroundColor: createStyleColor(CHOCOBO_COLORS[colorKey]),
          color: createStyleColor(
            getContrastingColor(CHOCOBO_COLORS[colorKey])
          ),
        }}
        onClick={() => setExpanded((prev) => !prev)}
        ref={buttonRef}
      >
        {colorKey}
      </div>
      {expanded && buttonBounds ? (
        <div
          css={css`
            position: absolute;
            z-index: 1000;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            max-height: 20rem;
            overflow-y: scroll;
            border: 4px solid black;
            border-radius: 0.25rem;
            background-color: black;
          `}
          style={{
            left: buttonBounds.x + window.scrollX,
            top: buttonBounds.y + buttonBounds.height + window.scrollY,
          }}
          ref={expandedPanelRef}
        >
          {Object.keys(CHOCOBO_COLORS).map((x) => (
            <div
              key={x}
              css={css`
                padding: 0.1rem;
                text-align: center;
                user-select: none;
                cursor: pointer;
              `}
              style={{
                backgroundColor: createStyleColor(CHOCOBO_COLORS[x]),
                color: createStyleColor(getContrastingColor(CHOCOBO_COLORS[x])),
              }}
              onClick={() => selectColor(x)}
            >
              {x}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ColorSelector;
