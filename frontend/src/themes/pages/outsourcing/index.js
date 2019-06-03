import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const AsterOutsourcing = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ 'themes/aster/pages/outsourcing'),
  loading: Loading,
});

export default {
  aster: AsterOutsourcing,
};
