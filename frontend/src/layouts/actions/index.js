/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const SET_APP_LAYOUTS = 'SET_APP_LAYOUTS';
export const WINDOW_RESIZE = 'WINDOW_RESIZE';
export const IS_HOME_PAGE = 'IS_HOME_PAGE';
export const FETCH_SITE_CONFIG = 'FETCH_SITE_CONFIG';
export const STORE_SITE_CONFIG = 'STORE_SITE_CONFIG';
export const REQUESTING_STATUS = 'REQUESTING_STATUS';


export function windowResize(screenSize, bodyScreenSize) {
  return {type: WINDOW_RESIZE, screenSize, bodyScreenSize};
}

export function setLayout(layoutId, params) {
  const config = {layoutId, params};
  return {type: SET_APP_LAYOUTS, layoutConfigs: config};
}

export function isHomePage(isHomepage) {
  return {type: IS_HOME_PAGE, isHomepage};
}

export function fetchSiteConfig(onSuccess, onFail) {
  return {type: FETCH_SITE_CONFIG, onSuccess, onFail};
}

export function storeSiteConfig(siteConfigs) {
  return {type: STORE_SITE_CONFIG, siteConfigs};
}

export function setRequestingStatus(id, status) {
  return {type: REQUESTING_STATUS, id, status};
}
