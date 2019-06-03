import {t1} from 'i18n';
import {Input, Divider} from 'antd';
import {fetchNode} from 'common';
import SelectElement from 'schema-form/elements/Select';

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
      label: 'first name',
      name: 'firstName',
      colSpan: 6,
      component: Input,
      decoratorOption: {rules: [{required: true, message: t1('first name is required')}]},
      componentProps: {
        placeholder: t1('first name  name')
      }
    },
    {
      label: 'last name',
      name: 'lastName',
      colSpan: 10,
      decoratorOption: {rules: [{required: true, message: t1('last name code is required')}]},
      component: Input,
      componentProps: {
        placeholder: t1('last name'),
      }
    },
    {
      label: 'phone',
      name: 'phone',
      colSpan: 8,
      decoratorOption: {rules: [{required: true, message:  t1('phone is required')}]},
      component: Input,
      componentProps: {
        placeholder: 'Enter company phone',
      }
    },
    {
      component: Divider,
      componentProps: {
        orientation: 'left',
        children: 'User account'
      }
    },
    {
      label: 'email',
      name: 'email',
      colSpan: 8,
      decoratorOption: {rules: [{required: true, message:  t1('email is required')}]},
      component: Input,
      componentProps: {
        placeholder: t1('Enter email'),
      }
    },
    {
      label: 'password',
      name: 'password',
      colSpan: 8,
      decoratorOption: {rules: [{required: true, message:  t1('password is required')}]},
      component: Input.Password,
      componentProps: {
        type: 'password',
        placeholder: t1('Enter password'),
      }
    },
    {
      label: 're-password',
      name: 'rePassword',
      colSpan: 8,
      component: Input.Password,
      decoratorOption: {rules: [{required: true, message:  t1('re-password is required')}]},
      componentProps: {
        placeholder: 'Re-enter the password',
      }
    },
  ];
});
