import React from 'react';
import FrontendPage from 'themes/routes';
import SubMainLayoutHelper from 'layouts/helpers/SubMainLayoutHelper';
import {LayoutRegistered} from 'layouts/LayoutHelper';

const ROOT = '';

export default {
  path: ROOT,
  exact: true,
  component: SubMainLayoutHelper,
  layout: LayoutRegistered.frontend,
  routes: [
    ...FrontendPage,
  ]
};
