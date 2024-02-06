import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SongStats, Song, StatsApiResponse, ListResponse, ApiErrorResponse } from 'models/song';

const initialSongStats: SongStats = {
  totalSongs: 0,
  artistStats: [],
  albumStats: [],
  genreStats: [],
};

interface SongsState {
  songs: Song[];
  stats: SongStats;
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  stats: initialSongStats,
  loading: false,
  error: null,
};
const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state, action: PayloadAction<ApiErrorResponse>) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
    createSongStart: (state, action: PayloadAction<Song>) => {
      state.loading = true;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.loading = false;
    },
    createSongFailure: (state, action: PayloadAction<ApiErrorResponse>) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
    updateSongStart: (state, action: PayloadAction<{id: string, data: Song}>) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs = state.songs.map(song => song.id === action.payload.id ? action.payload : song);
      state.loading = false;
    },
    updateSongFailure: (state, action: PayloadAction<ApiErrorResponse>) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
    deleteSongStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<ApiErrorResponse>) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
    fetchStatsStart: (state) => {
      state.loading = true;
    },
    fetchStatsSuccess: (state, action: PayloadAction<StatsApiResponse>) => {
      state.stats = action.payload.data;
      state.loading = false;
    },
    fetchStatsFailure: (state, action: PayloadAction<ApiErrorResponse>) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
  },
});

export const {
  fetchSongsStart, fetchSongsSuccess, fetchSongsFailure,
  createSongStart, createSongSuccess, createSongFailure,
  updateSongStart, updateSongSuccess, updateSongFailure,
  deleteSongStart, deleteSongSuccess, deleteSongFailure,
  fetchStatsStart, fetchStatsSuccess, fetchStatsFailure
} = songsSlice.actions;

// Selector to access the songs state
export const selectSongs = (state: RootState) => state.songs.songs;
export const selectStatistics = (state: RootState) => state.songs.stats;
export const selectError = (state: RootState) => state.songs.error;
export const selectLoading = (state: RootState) => state.songs.loading;

export default songsSlice.reducer;
