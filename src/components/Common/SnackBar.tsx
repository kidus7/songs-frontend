import React from 'react';
import styled from '@emotion/styled';
import { space, layout, color, compose } from 'styled-system';

// Define the Snackbar container with Emotion and Styled System
const SnackbarContainer = styled.div(
  compose(space, layout, color),
  {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '16px',
    paddingRight: '32px',
    backgroundColor: '#323232',
    color: '#fff',
    borderRadius: '4px',
    textAlign: 'center',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
);

const CloseIcon = styled.span({
  cursor: 'pointer',
  marginLeft: '20px',
  color: 'white'
});

interface SnackbarProps {
  message: string;
  status: string;
  open: boolean;
  onClose: () => void;
}

// Snackbar Component using the defined props
const Snackbar: React.FC<SnackbarProps> = ({ message, status='success', open, onClose }) => {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Auto-hide

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <SnackbarContainer>
      {message}
      <CloseIcon onClick={onClose}>×</CloseIcon>
    </SnackbarContainer>
  );
};

export default Snackbar;
