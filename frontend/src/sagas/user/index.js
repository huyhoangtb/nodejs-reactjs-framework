import Requester from 'common/network/http/Request';
import endpoints from 'configs/endpoints';
import userActions, {userActionTypes} from 'action-creators/user';
import {effects} from 'redux-saga';

const {call, fork, put, takeEvery} = effects;

function* logout(action) {
  const {options} = action;
  const result = yield call(
    Requester.get,
    endpoints.user.logout
  );
  yield put(userActions.receivedToken({}));
  yield put(userActions.receivedUserInfo({}));
  if (options && options.onSuccess) {
    options.onSuccess(result);
  }
  
}



export const logoutAction = function* logoutSaga() {
  yield takeEvery(userActionTypes.LOGOUT_FROM_APPLICATION, logout);
};

export default [
  fork(logoutAction),
];
