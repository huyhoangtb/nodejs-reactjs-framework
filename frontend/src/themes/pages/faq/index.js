import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const AsterFaq = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ 'themes/aster/pages/faq'),
  loading: Loading,
});

export default {
  aster: AsterFaq,
};
