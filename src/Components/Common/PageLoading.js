import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const FullPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
  width: 100vw;  // Full viewport width
  position: fixed; // Fixed position
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5); // Optional: Add a background color with transparency
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid var(--clr-dark-blue);
  border-radius: 50%;
  border-top: 4px solid transparent;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const PageLoadingSpinner = () => {
  return (
    <FullPageContainer>
      <SpinnerContainer />
    </FullPageContainer>
  );
};

export default PageLoadingSpinner;
