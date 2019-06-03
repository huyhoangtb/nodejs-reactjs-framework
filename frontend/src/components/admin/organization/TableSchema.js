import React from 'react';
import {Icon} from 'antd';
import Translate from '../../../i18n';
import {Link} from "react-router-dom";

export default ($this) => {
  return [
    {
      title: Translate.t1('organization code'),
      dataIndex: 'code',
      render: name => name,
      width: '30',
    },
    {
      title: Translate.t1('organization_name'),
      dataIndex: 'name',
      sorter: true,
      render: name => name,
      width: '20%',
    },
    {
      title: Translate.t1('phone'),
      dataIndex: 'phone',
      sorter: true,
      render: phone => phone,
      width: '30',
    },
    {
      title: Translate.t1('address'),
      dataIndex: 'address',
      sorter: true,
      render: address => address,
      width: '20%',
    },
    {
      title: Translate.t1('email'),
      dataIndex: 'email',
    },
    {
      title: Translate.t1('action'),
      dataIndex: 'iid',
      width: '35px !important',
      style: {textAlign: 'center'},
      render: (iid, row) => {
        return (<div className='ui-flat-icon-panel'>
          <Link to={`/admin/organization/${row.iid}`}>
            <Icon type="eye"/>
          </Link>
        </div>)
      },
    }
  ];
}