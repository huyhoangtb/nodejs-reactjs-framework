import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const AsterOffshore = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ 'themes/aster/pages/offshore'),
  loading: Loading,
});

export default {
  aster: AsterOffshore,
};
