import {LayoutRegistered} from "layouts/LayoutHelper";
import defaultLayout from "layouts/default";
import FrontendTheme from "themes";
import Loadable from "react-loadable";
import Loading from "../components/common/viewers/loading";

const AdminLayout = Loadable({
  loader: () => import(/* webpackChunkName: "aster.SiteInit" */ 'layouts/admin'),
  loading: Loading,
});
const MeetingLayout = Loadable({
  loader: () => import(/* webpackChunkName: "aster.SiteInit" */ 'layouts/meeting'),
  loading: Loading,
});

export default {
  [LayoutRegistered.defaultLayout]: {
    component: defaultLayout,
    isDefault: true,
  },

  [LayoutRegistered.frontend]: {
    component: FrontendTheme,
  },
  [LayoutRegistered.adminLayout]: {
    component: AdminLayout,
  },
  [LayoutRegistered.meetLayout]: {
    component: MeetingLayout,
  },
};
