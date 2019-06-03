import {fork, takeEvery} from "redux-saga/effects";

function* common(action) {
  
}

export const commonAction = function* commonSaga() {
  yield takeEvery('COMMON_SAGA*', common);
};

export default [
  fork(commonAction),
];
