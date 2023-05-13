// components/Loader.ts

import React from 'react';

import PropTypes from 'prop-types';

type Props = {
  color?: 'black' | 'white';
  size?: number;
  display?: 'inline-block' | 'block';
};

const Loader = (props: Props) => {
  const { color, size, display } = props;
  return (
    <div
      style={{
        border: `4px solid ${color}`,
        width: `${size}px`,
        height: `${size}px`,
        borderRightColor: 'transparent',
        borderRadius: '50%',
        display,
        margin: display === 'block' ? '50px auto' : 'none',
      }}
      className="loader"
    />
  );
};

Loader.defaultProps = {
  color: 'black',
  size: 123,
  display: 'inline-block',
};

export default Loader;
