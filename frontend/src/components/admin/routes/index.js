import React, {Suspense, lazy} from 'react';
import async from 'routes/async';
import SubMainLayoutHelper from 'layouts/helpers/SubMainLayoutHelper';
import {LayoutRegistered} from 'layouts/LayoutHelper';
import PopoverSubLayoutHelper from 'layouts/helpers/PopoverSubLayoutHelper';
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";

const ROOT = '/admin';

const PermissionList = Loadable({
  loader: () => import(/* webpackChunkName: "Permission" */ 'components/system/permissions'),
  loading: Loading,
})

const RoleList = Loadable({
  loader: () => import(/* webpackChunkName: "Permission" */ 'components/system/roles'),
  loading: Loading,
})

const PositionList = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaff" */ 'components/admin/organization/job-position'),
  loading: Loading,
});

const OrgStaffList = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaff" */ 'components/admin/organization/staffs'),
  loading: Loading,
});
const OrgList = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaff" */ 'components/admin/organization'),
  loading: Loading,
});

const OrgForm = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaff" */ 'components/admin/organization/Form'),
  loading: Loading,
});
const UserList = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaff" */ 'components/admin/organization/user'),
  loading: Loading,
});

const UserOrdersList = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaffList" */ 'components/admin/organization/user/orders'),
  loading: Loading,
});

const meeting = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaffList" */ 'components/admin/meeting'),
  loading: Loading,
});

const admin = Loadable({
  loader: () => import(/* webpackChunkName: "OrgStaffList" */ 'components/admin'),
  loading: Loading,
});

export default {
  path: ROOT,
  component: SubMainLayoutHelper,
  layout: LayoutRegistered.adminLayout,
  routes: [
    {
      path: ROOT,
      exact: true,
      component: admin,
    },
    {
      path: `${ROOT}/meeting`,
      component: SubMainLayoutHelper,
      loginRequired: true,
      layout: LayoutRegistered.defaultLayout,
      routes: [
        {
          path: `${ROOT}/meeting`,
          exact: true,
          component: meeting,
        },
        ]
    },
    {
      path: `${ROOT}/organization`,
      component: SubMainLayoutHelper,
      loginRequired: true,
      // permissions: ['123'],
      // permission: '321312',

      layout: LayoutRegistered.adminLayout,
      routes: [
        {
          path: `${ROOT}/organization/users`,
          component: PopoverSubLayoutHelper,
          defaultComponent: UserList,
          popupScreenId: 'userModule',
          routes: [
            {
              path: `${ROOT}/organization/users/orders`,
              exact: true,
              component: UserOrdersList,
              disableOpenPopupScreen: true
            },

          ]
        },
        {
          path: `${ROOT}/organization/job-positions`,
          exact: true,
          component: PositionList,
        },
        {
          path: `${ROOT}/organization`,
          component: PopoverSubLayoutHelper,
          defaultComponent: OrgList,
          popupScreenId: 'orgModule',
          showNewButton: true,
          routes: [
            {
              path: `${ROOT}/organization/new`,
              exact: true,
              isNewRoute: true,
              component: OrgForm
            },
            {
              path: `${ROOT}/organization/:iid(\\d+)/staffs`,
              exact: true,
              component: OrgStaffList,
              autoFetch: {
                method: 'GET',
                params: {
                  node: 'organization'
                },
              },

            },
            {
              path: `${ROOT}/organization/:iid(\\d+)`,
              exact: true,
              autoFetch: {
                method: 'GET',
                params: {
                  node: 'organization',
                  attachedNodes: {
                    orgIid: {
                      node: 'organization',
                      field: 'iid',
                      name: 'parentOrg'
                    },
                  }
                },
              },
              component: OrgForm
            },
          ]
        },

      ]
    },
    {
      path: `${ROOT}/system`,
      component: SubMainLayoutHelper,
      loginRequired: true,
      // permissions: ['123'],
      // permission: '321312',
      layout: LayoutRegistered.adminLayout,
      routes: [
        {
          path: `${ROOT}/system/roles`,
          exact: true,
          component: RoleList,
        },
        {
          path: `${ROOT}/system/permissions`,
          exact: true,
          component: PermissionList,
        }
      ]
    },

  ]
};
