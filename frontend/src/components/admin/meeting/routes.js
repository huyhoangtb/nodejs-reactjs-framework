import React from 'react';
import SubMainLayoutHelper from 'layouts/helpers/SubMainLayoutHelper';
import {LayoutRegistered} from 'layouts/LayoutHelper';
import PopoverSubLayoutHelper from 'layouts/helpers/PopoverSubLayoutHelper';
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";


const meetingList = Loadable({
  loader: () => import(/* webpackChunkName: "Permission" */ 'components/admin/meeting'),
  loading: Loading,
})


export default (root) => {
  return {
    path: `${root}/meeting`,
    component: SubMainLayoutHelper,
    layout: LayoutRegistered.defaultLayout,
    routes: [
      {
        path: `${root}/meeting`,
        exact: true,
        component: meetingList
      },
    ]
  }
};
