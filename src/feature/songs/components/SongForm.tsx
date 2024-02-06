import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createSongStart, updateSongStart, createSongFailure, updateSongFailure, fetchSongsFailure } from '../services/songsSlice';
import styled from '@emotion/styled';
import { Song } from 'models/song';
import Snackbar from 'components/Common/SnackBar';
import * as Yup from "yup";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
//   width: 100%;
  max-width: 500px;
  padding: 20px;
//   background-color: #f5f5f5;
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

interface SongFormProps {
    existingSong?: Song | null;
    onFormSubmitSuccess?: (message: string) => void;
    onFormSubmitError?: (message: string) => void;
}

export const SongForm: React.FC<SongFormProps> = ({ existingSong = null, onFormSubmitSuccess, onFormSubmitError }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

    // validation schema
    const createSchema = Yup.object().shape({
        title: Yup.string().required("Please type a title"),
        artist: Yup.string().required("Please type an artist"),
        album: Yup.string().optional(),
        genre: Yup.string().optional()
    });


    // Populate form when existingSong is provided for editing
    useEffect(() => {
        if (existingSong) {
            setTitle(existingSong.title);
            setArtist(existingSong.artist);
            setAlbum(existingSong.album);
            setGenre(existingSong.genre);
        }
    }, [existingSong]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const songData = { title, artist, album, genre };
        console.log("songData: ", songData)

        if (existingSong && typeof existingSong.id === 'string') {
            try {
                dispatch(updateSongStart({ id: existingSong.id, data: songData }))
                onFormSubmitSuccess?.('Song updated successfully!');
            } catch (error) {
                onFormSubmitError?.('Failed to submit the song.');
            }
        } else {
            try {
                dispatch(createSongStart(songData))
                onFormSubmitSuccess?.('Song created successfully!');
            } catch (error) {
                onFormSubmitError?.('Failed to submit the song.');
            }
        }

        setTitle('');
        setArtist('');
        setAlbum('');
        setGenre('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <Input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist"
                required
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
            <Button type="submit">{existingSong ? 'UPDATE' : 'CREATE'}</Button>
        </Form>
    );
};
