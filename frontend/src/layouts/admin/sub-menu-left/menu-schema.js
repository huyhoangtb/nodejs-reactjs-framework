import Translate from 'i18n';

export default [
  {
    title: Translate.t1('CMS'),
    url: 'admin/cms',
    icon: {
      position: 'left',
      type: 'user'
    },
  },
  
  {
    title: Translate.t1('location'),
    url: '/admin/location',
    icon: {
      position: 'left',
      type: 'user'
    },
  },
  
  {
    title: Translate.t3('CRM'),
    url: '/admin/crm',
    icon: {
      position: 'left',
      type: 'user'
    },
  },
  
  {
    title: Translate.t1('User & Organization'),
    url: '/admin/management',
    icon: {
      position: 'left',
      type: 'user'
    },
  }
]
