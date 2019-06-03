export const userActionTypes = {
  ON_LOGIN_SUCCESS: 'ON_LOGIN_SUCCESS',
  LOGOUT_FROM_APPLICATION: 'LOGOUT_FROM_APPLICATION',
  CHANGED_PASSWORD: 'CHANGED_PASSWORD',
  SET_USER_ORGANIZATION: 'SET_USER_ORGANIZATION',
  SET_CURRENT_WORKING_ORGANIZATION: 'SET_CURRENT_WORKING_ORGANIZATION',
  REQUEST_CHANGED_PASSWORD_LINK: 'REQUEST_CHANGED_PASSWORD_LINK',
};

export default {
  logout: (options) => ({
    type: userActionTypes.LOGOUT_FROM_APPLICATION,
    options,
  }),

  onLoginSuccess: (data) => ({
    type: userActionTypes.ON_LOGIN_SUCCESS,
    data,
  }),

  registerNewAccount: (user, options) => ({
    type: userActionTypes.REGISTER_NEW_ACCOUNT,
    user,
    options,
  }),
  changedPassword: (data, options) => ({
    type: userActionTypes.CHANGED_PASSWORD,
    data,
    options,
  }),
  requestChangePasswordLink: (email, options) => ({
    type: userActionTypes.REQUEST_CHANGED_PASSWORD_LINK,
    email,
    options,
  }),
  setUserOrganizations: (orgs) => ({
    type: userActionTypes.SET_USER_ORGANIZATION,
    orgs,
  }),
  setCurrentWorkingOrg: (currentOrg) => ({
    type: userActionTypes.SET_CURRENT_WORKING_ORGANIZATION,
    currentOrg,
  }),
};
