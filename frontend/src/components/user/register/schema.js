import {Input} from 'antd';
import ReCaptcha from 'components/common/forms/elements/recaptcha';
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
    [
      {
      label: 'Email',
      name: 'email',
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Email là bắt buộc!'}]},
      validator: Validators.emailValidator,
      componentProps: {
        placeholder: 'Enter your email!'
      }
    },
    {
      label: 'Tên hiển thị',
      name: 'displayName',
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: 'Tên hiển thị là bắt buộc!'}]},
      component: Input,
      componentProps: {
        placeholder: 'Nhập tên hiển thị',
      }
    }
    ],

    {
      label: 'Mật khẩu',
      name: 'password',
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: 'Mật khẩu là bắt buộc!'}]},
      validator: Validators.passwordValidator,
      component: Input,
      componentProps: {
        placeholder: 'Nhập mật khẩu',
        type: 'password',
      }
    },
    {
      label: 'Nhập lại',
      name: 'repassword',
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: 'Vui lòng nhập lại mật khẩu!'}]},
      validator: Validators.rePasswordValidator,
      component: Input,
      componentProps: {
        type: 'password',
        placeholder: 'Nhập mật khẩu',
      }
    },
    {
      name: 'recaptcha',
      colSpan: 24,
      isFull: true,
      decoratorOption: {rules: [{required: true, message: 'Recaptcha là bắt buộc!'}]},
      component: ReCaptcha,
    },
  ];
});
