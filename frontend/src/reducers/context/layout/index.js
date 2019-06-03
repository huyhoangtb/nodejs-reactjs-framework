import {layoutContextActionTypes} from 'layouts/actions/layout-context/index';

const layoutContextDefaultState = {
  isOpenLeftMenu: true,
  topMenu: {
    default: {
      schema: null,
    }
  },

  menuLeft: {
    default: {
      schema: null,
    }
  },

  subMenuLeft: {
    default: {
      schema: null,
    },
  },

  subMenuTop: {
    default: {
      schema: null,
    }
  },

  subMenuRight: {
    default: {
      schema: null,
    }
  },

  breadcrumb: {
    default: {
      schema: null,
    }
  },

  popupScreenTopMenu: {
    default: {
      schema: null,
    }
  },
};

const layoutContext = (state = layoutContextDefaultState, action) => {
  let newState = {};
  let namespace = action.namespace || 'default';
  switch (action.type) {
    case layoutContextActionTypes.SET_STATE_OF_LEFT_MENU:
      newState = {
        ...state,
        isOpenLeftMenu: action.isOpenLeftMenu,
      };
      break;
    case layoutContextActionTypes.SET_MENU_LEFT:
      newState = {
        ...state,
        menuLeft: {
          ...state.menuLeft,
          [namespace]: {...action.data},
        },
      };
      break;
    case layoutContextActionTypes.SET_SUBMENU_LEFT:
      newState = {
        ...state,
        subMenuLeft: {
          ...state.subMenuLeft,
          [namespace]: {...action.data},
        },
      };
      break;

    case layoutContextActionTypes.SET_MENU_TOP:
      newState = {
        ...state,
        topMenu: {
          ...state.topMenu,
          [namespace]: {...action.data},
        },
      };
      break;

    case layoutContextActionTypes.SET_SUBMENU_TOP:
      newState = {
        ...state,
        subMenuTop: {
          ...state.subMenuTop,
          [namespace]: {...action.data},
        },
      };
      break;

    case layoutContextActionTypes.SET_BREADCRUMB:
      newState = {
        ...state,
        breadcrumb: {
          ...state.breadcrumb,
          [namespace]: {...action.data},
        },
      };
      break;
    case layoutContextActionTypes.POPUP_SCREEN_TOP_MENU:
      newState = {
        ...state,
        popupScreenTopMenu: {
          ...state.popupScreenTopMenu,
          [namespace]: {...action.data},
        },
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default layoutContext;
