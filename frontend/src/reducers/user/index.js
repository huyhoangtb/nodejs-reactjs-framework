import {userActionTypes} from 'action-creators/user';
//
let userState = localStorage.getItem('reduxPersist:user');
if (userState) {
  try {
    userState = JSON.parse(userState);
  } catch (ex) {
    userState = {
      authInfo: {},
      user: {},
      orgs: []
    };
  }
}

const UserState = (state = userState || {authInfo: {}, user: {}, orgs: []}, action) => {
  let newState = {};
  switch (action.type) {
    case userActionTypes.ON_LOGIN_SUCCESS:
      newState = {
        ...state,
        ...action.data
      };
      break;
    case userActionTypes.ON_RECEIVED_TOKEN:
      newState = {
        ...state,
        token: action.token
      };
      break;
    case userActionTypes.SET_USER_ORGANIZATION:
      newState = {
        ...state,
        orgs: action.orgs
      };
      break;
    case userActionTypes.SET_CURRENT_WORKING_ORGANIZATION:
      newState = {
        ...state,
        currentOrg: action.currentOrg
      };
      break;

    default:
      return state;
  }
  return newState;
};
export default UserState;
