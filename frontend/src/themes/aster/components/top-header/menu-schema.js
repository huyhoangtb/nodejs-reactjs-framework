import React from 'react';
import Translate from 'i18n';

export default [
  {
    title: Translate.t1('home'),
    url: '/',
    icon: {
      position: 'left',
      type: 'home'
    },
  },
  {
    title: Translate.t1('our service'),
    url: '/services',
    icon: {
      position: 'left',
      type: 'heat-map'
    },
    subMenu: [
      {
        title: Translate.t1("outsourcing"),
        url: '/outsourcing',
        icon: {
          position: 'left',
          type: 'radius-setting'
        },
      },
      {
        title: Translate.t1("offshore"),
        url: '/offshore',
        icon: {
          position: 'left',
          type: 'radius-upleft'
        },
      },
      {
        title:  Translate.t1('consulting'),
        url: '/consulting',
        icon: {
          position: 'left',
          type: 'highlight'
        },
      },
      {
        title:  Translate.t1('success story'),
        url: '/success-story',
        icon: {
          position: 'left',
          type: 'strikethrough'
        },
      },

    ]
  },
  {
    title:  Translate.t3('FAQ'),
    url: '/faq',
    icon: {
      position: 'left',
      type: 'question-circle'
    },
  },
  {
    title:  Translate.t3('contact us'),
    url: '/contact-us',
    icon: {
      position: 'left',
      type: 'mail'
    },
  },

]
