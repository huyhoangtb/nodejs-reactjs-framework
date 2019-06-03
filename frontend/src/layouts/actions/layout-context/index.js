export const layoutContextActionTypes = {
  SET_STATE_OF_LEFT_MENU: 'SET_STATE_OF_LEFT_MENU',
  SET_MENU_LEFT: 'SET_MENU_LEFT',
  SET_BREADCRUMB: 'SET_BREADCRUMB',
  POPUP_SCREEN_TOP_MENU: 'POPUP_SCREEN_TOP_MENU',
  SET_SUBMENU_LEFT: 'SET_SUBMENU_LEFT',
  SET_SUBMENU_TOP: 'SET_SUBMENU_TOP',
  SET_MENU_TOP: 'SET_MENU_TOP',
};

export default {
  setStateOfLeftMenu(isOpenLeftMenu) {
    return {
      type: layoutContextActionTypes.SET_STATE_OF_LEFT_MENU,
      isOpenLeftMenu,
    };
  },

  setMenuLeft(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.SET_MENU_LEFT, data, namespace: name };
  },

  setSubMenuLeft(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.SET_SUBMENU_LEFT, data , namespace: name};
  },

  setSubMenuTop(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.SET_SUBMENU_TOP, data , namespace: name};
  },

  setTopMenu(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.SET_MENU_TOP, data , namespace: name};
  },

  setBreadCrumb(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.SET_BREADCRUMB, data , namespace: name};
  },

  setTopMenuPopupScreen(data, namespace) {
    let name = namespace || 'default';
    return { type: layoutContextActionTypes.POPUP_SCREEN_TOP_MENU, data , namespace: name};
  }
};
