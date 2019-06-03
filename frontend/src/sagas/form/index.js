import Requester from 'common/network/http/Request';
import {showResponseMessage} from 'common';
import { fork, call, put, takeEvery } from 'redux-saga/effects'
import {summitFormTypes} from 'schema-form/action-creators';

function* handleSummitForm(action) {
  const {values, options, url} = action;
  const attachedNodes = options && options.attachedNodes ? options.attachedNodes : {};
  const nodeAction = options && options.nodeAction ? options.nodeAction : {};
  let method = action.method || 'post';
  const response = yield call(
    Requester[method],
    url,
    values,
    {
      headers: {
        attachedNodes: JSON.stringify(attachedNodes),
        nodeAction
      }
    }
  );

  if(!options.disableResponseMessage) {
    showResponseMessage(response);
  }

  if (response && (response._success || (options && response[options.checkSuccessOnField]))) {
    if (options && options.dispatchAfterSuccess) {
      if (options.dispatchFullResponse) {
        yield put(options.dispatchAfterSuccess(response));
      } else {
        yield put(options.dispatchAfterSuccess(response._result));
      }
    }
    if (options && options.onSuccess) {
      if (options.dispatchFullResponse) {
        options.onSuccess(response, values);
      } else {
        options.onSuccess(response._result, values);
      }
      
    }
    return;
  }
  if (options && options.onFail) {
    options.onFail(response, values);
  }
}

export const handleSummitFormAction = function* handleSummitFormSaga() {
  yield takeEvery(summitFormTypes.HANDLE_SUMMIT_FORM, handleSummitForm)
};

export default [
  fork(handleSummitFormAction),
];
