import Store, {history} from 'store';
import userActionCreators from "../action-creators/user";
import {Icon, notification} from "antd";
import Translate, {t1} from "i18n";
import React from "react";

const ROLES = {
  ROLE_USER: 'ROLE_USER',
  ROLE_SUPPORTER: 'ROLE_SUPPORTER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_ACCOUNTING: 'ROLE_ACCOUNTING',
}

const notificationNotLogin = () => {
  notification.open({
    message: t1('You have bean not login to the system'),
    description: t1('Please do the login to continues the action.'),
    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
  });
}

const notificationNotPermission = () => {
  notification.open({
    message: Translate.t1('Bạn không có quyền truy cập chức năng.'),
    description: 'Phiên làm việc của bạn đã hết hạn hoặc bạn không có quyền truy cập chức năng này.',
    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
  });
}

export const checkPermissionsOfRoute = (branchRoute, dispatch, history, authInfo) => {

  const permission = branchRoute['permission'];
  const permissions = branchRoute['permissions'];
  const loginRequired = branchRoute['loginRequired'];
  if (!permission && !loginRequired && (!permissions || permissions.length === 0)) {
    return;
  }

  const configPermissions = [];

  if (permission) {
    configPermissions.push(permission);
  }

  if (permissions && permissions.length > 0) {
    configPermissions.concat(permissions);
  }

  if (!authInfo || !authInfo.token) {
    notificationNotLogin();
    dispatch(userActionCreators.logout());
    history.push('/login');
  }

  if (!isValidPermissions(configPermissions)) {
    notificationNotPermission();
    dispatch(userActionCreators.logout());
    history.push('/login');
  }
}

export const isValidPermissions = (configPermissions) => {

  if (!configPermissions || configPermissions.length === 0) {
    return true;
  }
  const user = Store.getState().user;
  const permissions = user && user.permissions;

  if (!permissions || permissions.length === 0) {
    return false;
  }


  for (let i = 0; i < permissions.length; i++) {
    for (let j = 0; j < configPermissions.length; j++) {
      if (permissions[i].toUpperCase() === configPermissions[j].toUpperCase()) {
        return true;
      }
    }
  }

  return false;
};

export default ROLES;
