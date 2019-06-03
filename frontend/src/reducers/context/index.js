import {contextActionTypes} from 'action-creators/context';

const initContext = {
}

const UserState = (state = initContext, action) => {
  let newState = {};
  switch (action.type) {
    case contextActionTypes.SET_APP_CONTEXT:
      newState = {
        ...state,
        ...action.context
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default UserState;
