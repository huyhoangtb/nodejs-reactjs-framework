import React from 'react';
import {Icon, Input} from 'antd';
import {t1} from 'i18n';
import Validators from 'common/validate';

export const layout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
};

export default ($this => {
  return [
    {
      label: t1('Email/username'),
      name: 'loginName',
      isFull: true,
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: t1('Login name is required!')}]},
      componentProps: {
        placeholder: t1('Email,username, iid, code'),
        prefix: <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
      }
    },
    {
      label: 'Mật khẩu',
      name: 'password',
      isFull: true,
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: t1('Password is required!')}]},
      validator: Validators.passwordValidator,
      component: Input,
      componentProps: {
        placeholder: t1('Your password'),
        type: 'password',
        prefix: <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
      }
    }
  ];
});
