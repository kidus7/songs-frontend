import React, { useState } from 'react';
import styled from '@emotion/styled';
import { space, layout } from 'styled-system';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3px;
  // width: 50%;
  max-width: 400px;
  padding: 20px;
  background: transparent;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const Input = styled.input`
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

const ResetButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

interface FilterFormProps {
  onFilter: (filters: { title: string; album: string; artist: string; genre: string; }) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter({ title, artist, album, genre });

    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');
  };

  const handleReset = () => {
    // Clear the state
    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');

    onFilter({ title: '', artist: '', album: '', genre: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <Input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="Album"
      />
      <Input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
      />
      <ButtonContainer>
        <Button type="submit">Filter</Button>
        <ResetButton type="button" onClick={handleReset} style={{ backgroundColor: '#6c757d', justifyContent: 'flex-end'  }}>Reset</ResetButton>
      </ButtonContainer>
    </Form>
  );
};
