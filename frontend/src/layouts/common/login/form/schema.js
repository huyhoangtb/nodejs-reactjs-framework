import React from 'react';
import {Input, Icon} from 'antd';
import Validators from 'common/validate';


export default ($this => {
  return [
    {
      label: 'Email/tên đăng nhập',
      name: 'username',
      isFull: true,
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Email là bắt buộc!'}]},
      validator: Validators.emailValidator,
      componentProps: {
        placeholder: 'Enter your email!',
        prefix: <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
      }
    },
    {
      label: 'Mật khẩu',
      name: 'password',
      isFull: true,
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: 'Mật khẩu là bắt buộc!'}]},
      validator: Validators.passwordValidator,
      component: Input,
      componentProps: {
        placeholder: 'Nhập mật khẩu',
        type: 'password',
        prefix: <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
      }
    }
  ];
});
