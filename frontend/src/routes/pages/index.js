import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const AsterTheme = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ 'themes/aster'),
  loading: Loading,
});

export default {
  aster: AsterTheme,
};
