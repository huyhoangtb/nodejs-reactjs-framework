import Translate from 'i18n';

export default [
  {
    title: Translate.t1('Manage organization'),
    url: '/admin/organization',
    icon: {
      position: 'left',
      type: 'bank'
    },
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'folder'
        },
        title: Translate.t1("Organization"),
        url: '/admin/organization'
      },
      {
        icon: {
          position: 'left',
          type: 'user'
        },
        title: Translate.t1("Users"),
        url: '/admin/organization/users'
      },
      {
        icon: {
          position: 'left',
          type: 'idcard'
        },
        title: Translate.t1("Job position"),
        url: '/admin/organization/job-positions'
      },
    ]
  },
  {
    title: Translate.t1('System'),
    url: '/admin/system',
    icon: {
      position: 'left',
      type: 'setting'
    },
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'stop'
        },
        title: Translate.t1("Permissions"),
        url: '/admin/system/permissions'
      },
      {
        icon: {
          position: 'left',
          type: 'radius-setting'
        },
        title: Translate.t1("Roles"),
        url: '/admin/system/roles'
      }
    ]
  }
]
