import {IS_HOME_PAGE, SET_APP_LAYOUTS, WINDOW_RESIZE} from "layouts/actions";

const layoutState = {
  screenSize: {},
  bodyScreenSize: {},
  isHomepage: false,
};

const CommonState = (state = layoutState, action) => {
  let newState = {};
  switch (action.type) {
    case WINDOW_RESIZE:
      newState = {
        ...state,
        screenSize: action.screenSize,
        bodyScreenSize: action.bodyScreenSize,
      };
      break;
    case IS_HOME_PAGE:
      newState = {
        ...state,
        isHomepage: action.isHomepage,
      };
      break;
    case SET_APP_LAYOUTS:
      newState = {
        ...state,
        layoutId: action.layoutConfigs.layoutId,
        params: action.layoutConfigs.params,
      };
      break;
    
    default:
      return state;
  }
  return newState;
};
export default CommonState;
