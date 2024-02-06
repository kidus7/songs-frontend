import songSaga from 'feature/songs/services/songSaga';
import { all, fork } from 'redux-saga/effects';

const rootSaga = function* () {
    yield all([
      fork(songSaga),
    ]);
  };
  
  export default rootSaga;