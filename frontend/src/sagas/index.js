import commonSaga from './common';
import socket from './socket';
import user from './user';
import trade from './trade';
import TwoFa from './two-fa';
import context from './context';
import formSaga from './form';
import nodeData from './rc-node-data';

export default function* root() {
  try {
    yield socket;
    yield commonSaga;
    yield user;
    yield trade;
    yield TwoFa;
    yield formSaga;
    yield context;
    yield nodeData;
  } catch (e) {
    console.log(e);
  }
}
