import React from 'react';
import {Icon} from 'antd';
import Translate from 'i18n';

export default [
  {
    title: <span>{Translate.t3('Syllabus')} <Icon style={{fontSize: '10px'}} type="down"/></span>,
    url: 'admin/cms',
    subMenu: [
      {
        title: Translate.t1("News"),
        url: 'admin/cms/news'
      },
      {
        title: Translate.t1("Categories"),
        url: 'admin/cms/category'
      }
    ]
  },
  
  {
    title: <span>{Translate.t1('User & Organization')} <Icon style={{fontSize: '10px'}} type="down"/></span>,
    url: '/admin/management',
    subMenu: [
      {
        title: Translate.t1("Organization"),
        url: '/admin/management/org'
      },
      {
        title: Translate.t1("User"),
        url: '/admin/management/user'
      },
      {
        title: Translate.t1("Roles"),
        url: '/admin/management/role'
      },
      {
        title: Translate.t1("Role Group"),
        url: '/admin/management/role-group'
      }
    ]
  }
]
