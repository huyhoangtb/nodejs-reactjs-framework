import React from 'react';
import {Icon} from 'antd';
import Translate from '../../../i18n';

export default ($this) => {
  return [
    {
      title: Translate.t1('role code'),
      dataIndex: 'code',
      sorter: true,
      render: email => email,
      width: '15%',
    },
    {
      title: Translate.t1("role name"),
      dataIndex: 'name',
      sorter: true,
      render: name => name,
      width: '20%',
    },
    {
      title: Translate.t1('organization'),
      dataIndex: 'orgIid',
      render: (orgIid, user) => user.organization && user.organization.name,
      width: '30%',
    },
    {
      title: Translate.t1('notes'),
      dataIndex: 'notes',
      render: notes => notes,
      width: '30%',
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