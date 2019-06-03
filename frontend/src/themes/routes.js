import HelperComponent from "./pages/HelperComponent";
import homeRegisterConfig from './pages/home';
import outsourcingConfig from './pages/outsourcing';
import offshoreConfig from './pages/offshore';
import faqConfig from './pages/faq';
import consultingConfig from './pages/consulting';
import successStoryConfig from './pages/success-story';
import aboutUsConfig from './pages/about-us';
import contactUsRegisterConfig from './pages/contact-us';

const ROOT = '';

export default [
  {
    path: `${ROOT}/contact-us`,
    exact: true,
    component: HelperComponent,
    configRegister: contactUsRegisterConfig
  },

  {
    path: `${ROOT}/outsourcing`,
    exact: true,
    component: HelperComponent,
    configRegister: outsourcingConfig
  },
  {
    path: `${ROOT}/offshore`,
    exact: true,
    component: HelperComponent,
    configRegister: offshoreConfig
  },
  {
    path: `${ROOT}/consulting`,
    exact: true,
    component: HelperComponent,
    configRegister: consultingConfig
  },
  {
    path: `${ROOT}/faq`,
    exact: true,
    component: HelperComponent,
    configRegister: faqConfig
  },
  {
    path: `${ROOT}/success-story`,
    exact: true,
    component: HelperComponent,
    configRegister: successStoryConfig
  },
  {
    path: `${ROOT}/about-us`,
    exact: true,
    component: HelperComponent,
    configRegister: aboutUsConfig
  },
  {
    path: ROOT,
    exact: true,
    component: HelperComponent,
    configRegister: homeRegisterConfig
  },
]