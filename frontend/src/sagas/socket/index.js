import {eventChannel} from 'redux-saga';
import SocketActionTypes from 'common/network/socket/SocketActionTypes';
import SocketClient from 'socket.io-client';
import {effects} from 'redux-saga';

const {call, fork, put, take, takeEvery } = effects;
let ws;
const registedActionTypes = {};
/**
 *
 * @returns {Channel<any>}
 */
const webSocketInitChannel = () => {
  return eventChannel(emitter => {
    if (ws) {
      return;
    }
    ws = new SocketClient(process.env.REACT_APP_SOCKET_SERVER);
    ws.on('open', () => {
    });
    ws.on('connect', () => {
    });
    ws.on('error', (err) => {
      console.error('socket is error', err);
    });
    
    const keyOfType = Object.keys(SocketActionTypes);
    for (let i = 0; i < keyOfType.length; i++) {
      const actionType = SocketActionTypes[keyOfType[i]];
      registedActionTypes[actionType] = true; // đánh dấu là đã add action type
      ws.on(actionType, (data) => {
        emitter({type: actionType, data});
      });
    }
    
    return () => {
      ws.close();
      console.log('Socket off');
    };
  });
};

/**
 *
 * @param action
 */
function* sendData(action) {
  const {message, data, namespace} = action;
  if (!message) {
    printError('missing the message type!..', message, data, namespace);
    return;
  }
  if (!registedActionTypes[message]) {
    eventChannel((emit) => {
      ws.on(message, (response) => {
        emit({type: message, response});
      });
      return () => {
        ws.close();
      };
    });
  }
  ws.emit(message, data);
}


export const initSocketAction = function* wsSagas() {
  const channel = yield call(webSocketInitChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
};

export const sendDataAction = function* sendDataSagas() {
  yield takeEvery('WEB_SOCKET_REQUESTER', sendData);
};

export default [
  fork(initSocketAction),
  fork(sendDataAction),
];


const printError = (error, params) => {
  if (process.env.NODE_ENV === 'production') {
    console.error(error, params);
    return;
  }
  alert(error);
  console.error(params);
};
