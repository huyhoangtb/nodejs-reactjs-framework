import {t1} from 'i18n';
import {Input} from 'antd';

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
  const {searchOrg} = $this.props;
  return [
    {
      label: t1('Your name'),
      name: 'name',
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Your name is required'}]},
      componentProps: {
        placeholder: t1('Enter your name')
      }
    },
    {
      label: t1('phone number'),
      decoratorOption: {rules: [{required: true, message: 'phone number is required!'}]},
      name: 'phone',
      colSpan: 12,
      component: Input,
      componentProps: {
        placeholder: 'Enter phone number',
      }
    },
    {
      label: t1('your email'),
      decoratorOption: {rules: [{required: true, message: 'phone number is required!'}]},
      name: 'email',
      colSpan: 24,
      component: Input,
      componentProps: {
        placeholder: 'you@domain.com',
      }
    },
    {
      label: 'notes',
      name: 'notes',
      colSpan: 24,
      decoratorOption: {rules: [{required: true, message: 'phone number is required!'}]},
      component: Input.TextArea,
      componentProps: {
        rows: 4,
        placeholder: 'Your message'
      },
    },
  ];
});
