/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsStart, fetchSongsSuccess, deleteSongStart, selectSongs, selectError, selectLoading } from '../services/songsSlice';
import styled from '@emotion/styled';
import { space, layout, flexbox, color, border, typography, shadow } from 'styled-system';
import Nav from 'components/Nav/Nav';
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material"; // For dialog
import Snackbar from 'components/Common/SnackBar';
import { SongForm } from './SongForm';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ResponsiveContainer from 'components/Common/ResponsiveContainer';
import { Song } from 'models/song';
import Loader from 'components/Common/Loader'
import { FilterForm } from 'components/Common/FilterForm';

const DashboardContainer = styled.div`
  ${space}
  ${layout}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 3rem !important;
  background-color: #f0f8ff;
`;

const PageTitle = styled.h3`
  font-size: 1.8rem;
  color: #39416F;
`;

const ActionButton = styled.button`
  color: #39416F;
  font-family: "Poppins";
  background: transparent;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    // color: white;
    color: #0063ff;
    // border-radius: 10px;
  }
`;

const RightAlignedWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%; // Take full width to push the button to the end
`;

const Button = styled.button`
  color: #39416F;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
  display: flex; 
  align-items: center;
  justify-content: center; 
//   margin-right: 2rem
  &:hover {
    background-color: #283152;
    color: white;
  }
`;

const confirmDialogStyle = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const buttonStyle = css`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:first-of-type {
    background-color: #085db8;
    color: white;
    border-radius: 10px;
    margin-right: 20px;
  }
  &:last-of-type {
    background-color: #c70013;
    color: white;
    border-radius: 10px;
    margin-left: 20px;
  }
`;

const IconContainer = styled.div`
  ${space}
  ${layout}
  display: flex;
  align-items: flex-start;
  padding: 10px;
  justify-content: flex-start;
  width: 90%;
`;

const FilterButtonContainer = styled.div`
  ${space}
  ${layout}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const SongsList: React.FC = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectLoading)
    const [open, setOpen] = useState(false);
    const [newSong, setNewSong] = useState<Song | null>(null);
    const [notification, setNotification] = useState({ message: '', status: 'success' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [songToDelete, setSongToDelete] = useState('');

    useEffect(() => {
        dispatch(fetchSongsStart());
    }, [dispatch]);

    useEffect(() => {
        if (error && error != " ") {
            setNotification({ message: error, status: 'error' });
            setSnackbarOpen(true);
        }
    }, [error]);

    if (!songs || songs.length === 0) {
        return <Loader isLoading={isLoading} loadingText="Loading Songs" />
    }

    const handleUpdate = (id: string) => {
        const songToUpdate: any = songs.find((song) => song.id === id);
        setNewSong(songToUpdate);
        setOpen(true);
    };

    const handleDialog = () => {
        setOpen(!open);
    };

    const toggleFilterVisibility = () => {
        setIsFilterDialogOpen(true);
    };

    const handleFilterDialogClose = () => {
        setIsFilterDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        setSongToDelete(id);
        setOpenPopup(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = () => {
        // setSnackbarOpen(true);
        setOpen(false);
    };

    const applyFilter = (filters: any) => {
        const queryParams = {
            ...filters,
            page: 1,
            pageSize: 10,
        };

        // Dispatch the action to fetch filtered songs
        dispatch(fetchSongsStart(queryParams));
        setIsFilterDialogOpen(false);
    };


    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
        },
        {
            field: 'artist',
            headerName: 'Artist',
            width: 200,
        },
        {
            field: 'album',
            headerName: 'Album',
            width: 200,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (cellValues: any) => {
                return (
                    <div className="d-flex">
                        <ActionButton
                            onClick={() => handleUpdate(cellValues.row.id)}
                        >
                            EDIT
                        </ActionButton>
                        <ActionButton
                            onClick={() => handleDelete(cellValues.row.id)}
                        >
                            DELETE
                        </ActionButton>
                    </div>
                );
            }
        },
    ];

    const rows = songs
        .filter(song => song.id !== undefined)
        .map(song => ({
            id: song.id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            genre: song.genre,
        }));
    return (
        <DashboardContainer>
            <Nav />
            <Snackbar
                open={snackbarOpen}
                message={notification.message}
                status={notification.status}
                onClose={() => setSnackbarOpen(false)}
            />
            <PageTitle>Songs Table</PageTitle>
            <RightAlignedWrapper>
                <IconContainer>
                    <FilterButtonContainer onClick={toggleFilterVisibility}>
                        <FilterAltIcon sx={{ float: "right", display: "flex", alignItems: "flex-end" }} />
                    </FilterButtonContainer>
                </IconContainer>
                <Button
                    onClick={() => {
                        setNewSong(null)
                        handleDialog()
                    }
                    }
                >
                    <AddIcon />&nbsp;ADD
                </Button>
            </RightAlignedWrapper>
            <ResponsiveContainer>
                <DataGrid
                    sx={{
                        boxShadow: 0,
                        border: 0,
                        borderColor: "transparent",
                        color: "primary",
                        "& .MuiDataGrid-cell": {
                            fontSize: 14,
                            color: "#39416F",
                            border: "none",
                            fontFamily: "Poppins"
                        },
                        "& .MuiDataGrid-cell:hover": {
                            color: "black",
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) => `super-app-theme`}
                />
            </ResponsiveContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ width: "600px" }}>
                    {"Add New Song"}
                </DialogTitle>
                <DialogContent>
                    <SongForm
                        existingSong={newSong}
                        onFormSubmitSuccess={(message: string) => {
                            setNotification({ message, status: 'success' });
                            setSnackbarOpen(true);
                            // Close the form dialog if needed
                            setOpen(false);
                        }}
                        onFormSubmitError={(message) => {
                            setNotification({ message, status: 'error' });
                            setSnackbarOpen(true);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
                <DialogTitle id="alert-dialog-title" sx={{ width: "400px" }}>
                    Filter Songs
                </DialogTitle>
                <DialogContent>
                    <FilterForm onFilter={applyFilter}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilterDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {openPopup && (
                <div css={confirmDialogStyle}>
                    <p>Are you sure you want to delete this song?</p>
                    <div>
                        <button
                            css={buttonStyle}
                            onClick={() => {
                                setOpenPopup(false);
                                dispatch(deleteSongStart(songToDelete));
                            }}
                        >
                            Yes
                        </button>
                        <button
                            css={buttonStyle}
                            onClick={() => setOpenPopup(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}

        </DashboardContainer>
    );
};