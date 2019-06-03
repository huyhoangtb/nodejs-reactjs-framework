export const commonActionTypes = {
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  SET_BREAD_CRUMB: 'SET_BREAD_CRUMB',
  SHOW_LOADING_PAGE: 'SHOW_LOADING_PAGE',
  SET_STATUS_FORM_VIEW: 'SET_STATUS_FORM_VIEW',
};

export default {
  setMessage: (message) => ({
    type: commonActionTypes.SET_MESSAGE,
    message,
  }),
  showLoadingPage: (showLoadingPageIcon) => ({
    type: commonActionTypes.SHOW_LOADING_PAGE,
    showLoadingPageIcon,
  }),
  clearMessage: () => ({
    type: commonActionTypes.CLEAR_MESSAGE
  }),
  updateNode: (breadCrumbs) => ({
    type: commonActionTypes.SET_BREAD_CRUMB,
    breadCrumbs,
  }),
  setStatusOfFormView: (params) => ({
    type: commonActionTypes.SET_STATUS_FORM_VIEW,
    params,
  }),
};
