import React from 'react';
import {Icon} from 'antd';
import Translate from 'i18n';

export default ($this) => {
  return [
    {
      title: Translate.t1('fullname'),
      dataIndex: 'lastName',
      sorter: true,
      render: (firstName, user) => `${user.firstName} ${user.lastName ? user.lastName : ''}`,
      width: '30',
    },
    {
      title: Translate.t1('email'),
      dataIndex: 'email',
      sorter: true,
      render: email => email,
      width: '30',
    },
    {
      title: Translate.t1('login name'),
      dataIndex: 'username',
      sorter: true,
      render: phone => phone,
      width: '30',
    },
    {
      title: Translate.t1('phone'),
      dataIndex: 'phone',
      sorter: true,
      render: phone => phone,
      width: '30',
    },
    {
      title: Translate.t1('organization'),
      dataIndex: 'orgIid',
      render: (orgIid, user) => {
        const orgs = user.organizations || [];
        return <div>
          {
            orgs.map((org, index) => {
              return <div key={`${user.iid}.${org.iid}.${index}`}>{org.name}</div>
            })
          }
        </div>
      },
      width: '20%',
    },
    {
      title: Translate.t1('action'),
      dataIndex: 'iid',
      width: '35px !important',
      style: {textAlign: 'center'},
      render: (iid, row) => {
        return (<div className='ui-flat-icon-panel'>
          <Icon type="eye" onClick={() => $this.loadRowByIid({iid: row.iid})}/>
        </div>)
      },
    }
  ];
}