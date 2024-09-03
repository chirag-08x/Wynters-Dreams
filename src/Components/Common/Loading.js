import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;



const LoadingSpinner = ({ color = 'dark', width=40,height=40 }) => {
  const SpinnerContainer = styled.div`
    display: inline-block;
    width: ${width}px;
    height: ${height}px;
    border: 4px solid ${color === 'dark' ? 'var(--clr-dark-blue)' : 'white'};
    border-radius: 50%;
    border-top: 4px solid transparent;
    animation: ${spinAnimation} 0.8s linear infinite;
  `;
  return (
    <SpinnerContainer />
  );
};

export default LoadingSpinner;
