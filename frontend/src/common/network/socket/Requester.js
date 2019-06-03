import Store from "store/index";
import SocketActionTypes from 'common/network/socket/SocketActionTypes';

const Requester = {
  ...SocketActionTypes,
  
  send: (message, data, namespace) => {
    Store.dispatch({
      type: 'WEB_SOCKET_REQUESTER',
      message, data, namespace
    });
  }
};

export default Requester;

//
// example:
//
//
//   sendMessage = (values) => {
//     Requester.send({
//         action: 'user.createUserAction',
//         params: values
//       },
//       Requester.ActionTypes.USER_MESSAGES
//     );
//   };
