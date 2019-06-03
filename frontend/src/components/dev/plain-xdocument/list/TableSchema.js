import React from 'react';
import {Icon} from 'antd';
import Translate from 'i18n';

export default ($this) => {
  return [
    {
      title: Translate.t1('company_code'),
      dataIndex: 'companyCode',
      render: companyCode => companyCode,
      width: '30',
    },
    {
      title: Translate.t1('company_name'),
      dataIndex: 'companyName',
      sorter: true,
      render: companyName => companyName,
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
          <Icon type="eye" onClick={() => $this.loadRowByIid({iid: row.iid})}/>
        </div>)
      },
    }
  ];
}