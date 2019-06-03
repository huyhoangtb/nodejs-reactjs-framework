import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const AsterHome = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ 'themes/aster/pages/about-us'),
  loading: Loading,
});

export default {
  aster: AsterHome,
};
