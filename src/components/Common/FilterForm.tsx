import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
//   background-color: #f5f5f5;
  background: transparent;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #39416f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;