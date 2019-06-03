/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import {commonActionTypes} from 'action-creators/common';

const commonState = {
  showLoadingPageIcon: false,
  showFormView: {default: false}
};

const CommonState = (state = commonState, action) => {
  let newState = {};
  switch (action.type) {
    case commonActionTypes.SHOW_LOADING_PAGE:
      newState = {
        ...state,
        showLoadingPageIcon: action.showLoadingPageIcon
      };
      break;
    case commonActionTypes.SET_STATUS_FORM_VIEW:
      const {params} = action;
      const viewId = params.viewId || 'default';
      const oldData = state.showFormView[viewId] || {};
      newState = {
        ...state,
        showFormView: {...state.showFormView, [viewId]: {
            ...oldData,
            ...params,
          }}
      };
      break;
    default:
      return state;
    
  }
  return newState;
};
export default CommonState;
