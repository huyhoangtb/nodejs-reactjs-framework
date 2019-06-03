import Requester from 'common/network/http/Request';
import dataNodeActions, {dataActionTypes} from 'action-creators/node-data';
import {effects} from 'redux-saga';

const {call, fork, put, takeEvery} = effects;

function* fetchData(action) {
  
  const {values, options, url} = action;
  let method = action.method || 'get';
  const response = yield call(
    Requester[method],
    url,
    values
  );
  if (response && (response.success || (options && response[options.checkSuccessOnField]))) {
    if (options && options.dispatchAfterSuccess) {
      if (options.dispatchFullResponse) {
        yield put(options.dispatchAfterSuccess(response));
      } else {
        yield put(options.dispatchAfterSuccess(response.result));
      }
    }
    
    if (options && options.onSuccess) {
      if (options.dispatchFullResponse) {
        options.onSuccess(response, values);
      } else {
        options.onSuccess(response.result, values);
      }
    }
    
    if (options && options.namespace) {
      if (options.dispatchFullResponse) {
        yield put(dataNodeActions.storeDataUsingNamespace(response, options.namespace));
      } else {
        yield put(dataNodeActions.storeDataUsingNamespace(response.result, options.namespace));
      }
    }
    return;
  }
  if (options && options.onFail) {
    options.onFail(response, values);
  }
}


function* updateNode(action) {
  
  const {values, options, url} = action;
  let method = action.method || 'post';
  const response = yield call(
    Requester[method],
    url,
    values
  );
  
  if (response && (response.success || (options && response[options.checkSuccessOnField]))) {
    if (options && options.dispatchAfterSuccess) {
      if (options.dispatchFullResponse) {
        yield put(options.dispatchAfterSuccess(response));
      } else {
        yield put(options.dispatchAfterSuccess(response.result));
      }
    }
    if (options && options.onSuccess) {
      if (options.dispatchFullResponse) {
        options.onSuccess(response, values);
      } else {
        options.onSuccess(response.result, values);
      }
      
    }
    return;
  }
  if (options && options.onFail) {
    options.onFail(response, values);
  }
}

export const fetchDataAction = function* fetchDataSaga() {
  yield takeEvery(dataActionTypes.FEETCH_DATA, fetchData);
};

export const updateNodeAction = function* updateNodeSaga() {
  yield takeEvery(dataActionTypes.UPDATE_NODE_DATA, updateNode);
};

export default [
  fork(fetchDataAction),
  fork(updateNodeAction),
];
