/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { selectLoading } from 'feature/songs';

// Styled component for the loading text
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Take up full viewport height
  color: #007bff; // Use your primary color here
  font-size: 20px;
  font-weight: bold;
`;

const LoadingText = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #007bff; // Spinner color
  animation: spin 1s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type LoaderProps = {
    isLoading: boolean;
    loadingText?: string;
};

const LoadingComponent: React.FC<LoaderProps> = ({ isLoading, loadingText }) => {
    return (
        <LoadingContainer>
            <Spinner />
        </LoadingContainer>
    );
};

export default LoadingComponent;