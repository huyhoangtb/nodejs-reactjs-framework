import {LayoutRegistered} from 'layouts/LayoutHelper';
import RootLayout from 'layouts';
import AdminRoutes from 'components/admin/routes';
import Frontend from './front-end';
import DevRoutes from 'components/dev/routes';
import SubMainLayoutHelper from "../layouts/helpers/SubMainLayoutHelper";
import Loadable from "react-loadable";
import Loading from "../components/common/viewers/loading";

const SiteInit = Loadable({
  loader: () => import(/* webpackChunkName: "aster.SiteInit" */ 'components/site/register'),
  loading: Loading,
});

const Richtext = Loadable({
  loader: () => import(/* webpackChunkName: "schema-form/elements/richtext" */ 'schema-form/elements/richtext'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "components/user/login" */ 'components/user/login'),
  loading: Loading,
});
const meetingList = Loadable({
  loader: () => import(/* webpackChunkName: "Permission" */ 'components/admin/meeting'),
  loading: Loading,
})


const ROOT = '';

const routes = [
  {
    component: RootLayout,
    routes: [
      // ...Meeting(ROOT),
      {
        path: `/meeting`,
        exact: true,
        layout: LayoutRegistered.meetLayout,
        component: meetingList
      },
      {
        path: '/richtext',
        component: Richtext,
        exact: true,
        layout: LayoutRegistered.frontend,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
        layout: LayoutRegistered.defaultLayout,
      },

      {
        path: '/login',
        component: Login,
        layout: LayoutRegistered.defaultLayout,
      },
      {
        path: `${ROOT}/site/init`,
        component: SubMainLayoutHelper,
        layout: LayoutRegistered.defaultLayout,
        routes: [
          {
            path: `${ROOT}/site/init/:step(\\d+)/:orgId(\\w+)/domain`,
            exact: true,
            component: SiteInit
          },
          {
            path: `${ROOT}/site/init/:step(\\d+)/:orgId(\\w+)/user`,
            exact: true,
            component: SiteInit,
          },
          {
            path: `${ROOT}/site/init/:step(\\d+)/:orgId(\\w+)`,
            exact: true,
            component: SiteInit,
          },
          {
            path: `${ROOT}/site/init`,
            exact: true,
            component: SiteInit,
          },
        ]
      },
      {...DevRoutes},
      {...AdminRoutes},
      {...Frontend},
    ],
  },

];

export default routes;
