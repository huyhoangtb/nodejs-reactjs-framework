import Admin from 'components/admin';
import LoginPage from 'layouts/common/login';
import {LayoutRegistered} from 'layouts/LayoutHelper';
import RootLayout from 'layouts';
import OrgList from 'components/admin/organization'
const routes = [
  {
    component: RootLayout,
    routes: [
      {
        path: '/security/user/login',
        component: LoginPage,
        layout: LayoutRegistered.frontend,
      },
      {
        path: '/timetable-viewer',
        component: Admin,
        layout: LayoutRegistered.adminLayout,
      },
      {
        path: '/',
        component: OrgList,
        layout: LayoutRegistered.adminLayout,
      },
      
      // {
      //   ...adminRoute
      // },
      // {
      //   path: '/user',
      //   component: SubMainLayoutHelper,
      //   layout: LayoutRegistered.oauthLayout,
      //   routes: [
      //     {
      //       path: '/user/logout',
      //       component: LogoutPage,
      //       exact: true,
      //     },
      //     {
      //       path: '/user/login',
      //       component: LoginPage,
      //       exact: true,
      //     },
      //     {
      //       path: '/user/register',
      //       component: RegisterNewUser,
      //       exact: true,
      //       layout: LayoutRegistered.oauthLayout
      //     },
      //   ]
      // },
    ],
  },

];

export default routes;
