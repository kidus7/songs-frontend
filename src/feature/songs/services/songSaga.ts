// Import necessary effects from redux-saga/effects
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from "@reduxjs/toolkit";
import { ListResponse, Song, ListParams, SongStats, StatsApiResponse, ApiErrorResponse } from 'models/song';
import songsApi from 'api/songApi';

// Importing action creators from the songs slice
import { 
  fetchSongsStart, fetchSongsSuccess, fetchSongsFailure,
  fetchStatsStart, fetchStatsSuccess, fetchStatsFailure,
  createSongStart, createSongSuccess, createSongFailure,
  updateSongStart, updateSongSuccess, updateSongFailure,
  deleteSongStart, deleteSongSuccess, deleteSongFailure,
} from './songsSlice';

// Define types for the actions if not already defined
interface FetchSongsAction extends PayloadAction<ListParams> {}
interface FetchStatsAction extends PayloadAction<StatsApiResponse> {}
interface CreateSongAction extends PayloadAction<Song> {}
interface UpdateSongAction extends PayloadAction<{ id: string; data: Partial<Song> }> {}
interface DeleteSongAction extends PayloadAction<string> {}

function getApiErrorResponse(error: any): ApiErrorResponse {
  return error.response ? error.response.data : {
    status: 'error',
    message: 'Unknown error occurred',
    error: {
      message: 'No error message available',
      statusCode: 500,
      status: 'error',
      isOperational: false,
    },
    errorStack: ''
  };
}


function* fetchSongsSaga(action: FetchSongsAction) {
  try {
    const response: ListResponse<Song> = yield call(songsApi.getSongs, action.payload);
    yield put(fetchSongsSuccess(response.data.songs));
  } catch (error) {
    const errorResponse: ApiErrorResponse = getApiErrorResponse(error);
    yield put(fetchSongsFailure(errorResponse));
  }
}

function* fetchStatsSaga(action: FetchStatsAction) {
  try {
    const stats: StatsApiResponse = yield call(songsApi.getStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error) {
    const errorResponse: ApiErrorResponse = getApiErrorResponse(error);
    yield put(fetchSongsFailure(errorResponse));
  }
}

function* createSongSaga(action: CreateSongAction) {
  try {
    const newSong: Song = yield call(songsApi.createSong, action.payload);
    yield put(createSongSuccess(newSong));
    yield put(fetchSongsStart());
  } catch (error) {
    const errorResponse: ApiErrorResponse = getApiErrorResponse(error);
    yield put(fetchSongsFailure(errorResponse));
  }
}

function* updateSongSaga(action: UpdateSongAction) {
  try {
    const updatedSong: Song = yield call(songsApi.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(updatedSong));
    yield put(fetchSongsStart());
  } catch (error) {
    const errorResponse: ApiErrorResponse = getApiErrorResponse(error);
    yield put(fetchSongsFailure(errorResponse));
  }
}

function* deleteSongSaga(action: DeleteSongAction) {
  try {
    yield call(songsApi.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchSongsStart());
  } catch (error) {
    const errorResponse: ApiErrorResponse = getApiErrorResponse(error);
    yield put(fetchSongsFailure(errorResponse));
  }
}

// Watches for the specified actions and runs the appropriate sagas
function* songsSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(fetchStatsStart.type, fetchStatsSaga);
  yield takeLatest(createSongStart.type, createSongSaga);
  yield takeLatest(updateSongStart.type, updateSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
}

export default songsSaga;
