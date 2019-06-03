import Store from "store/index";

const Requester = {
  types: {
    CHAT_MESSAGES: 'CHAT_MESSAGES',
    DIRECTOR_SCANNER: 'DIRECTOR_SCANNER',
    DIRECTOR_CHANGED: 'DIRECTOR_CHANGED',
  },
  
  send: (type, data, namespace) => {
    Store.dispatch({
      type: 'WEB_SOCKET_REQUESTER',
      detail: {type, data, namespace}
    });
  }
};

export default Requester;
