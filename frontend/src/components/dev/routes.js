import React, { Suspense, lazy } from 'react';
import async from 'routes/async';
import SubMainLayoutHelper from 'layouts/helpers/SubMainLayoutHelper';
import {LayoutRegistered} from 'layouts/LayoutHelper';
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";
import OrgList from 'components/admin/organization';

const ROOT = '/dev';

const Richtext = Loadable({
  loader: () => import(/* webpackChunkName: "dev/elements/richtext" */ 'schema-form/elements/richtext'),
  loading: Loading,
});

const dragdrop = Loadable({
  loader: () => import(/* webpackChunkName: "dev/elements/dragdrop" */ 'components/dev/dragdrop'),
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
      component: async(() => import('components/admin')),
    },
    {
      path: `${ROOT}/dragdrop`,
      component: dragdrop,
    },
    {
      path: `${ROOT}/richtext`,
      exact: true,
      component: Richtext,
    }
  ]
};
