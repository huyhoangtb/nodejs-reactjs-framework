import {t1} from 'i18n';
import {Input} from 'antd';
import {fetchNode} from 'common';
import Validators from 'common/validate';
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
      label: 'Company name',
      name: 'name',
      colSpan: 18,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Company name is required'}]},
      componentProps: {
        placeholder: t1('Enter company name')
      }
    },
    {
      label: t1('short name'),
      name: 'shortName',
      colSpan: 6,
      decoratorOption: {rules: [{required: true, message: 'Short name is required!'}]},
      component: Input,
      componentProps: {
        placeholder: t1('Enter short name'),
      }
    },
    {
      label: 'email',
      name: 'email',
      colSpan: 12,
      component: Input,
      componentProps: {
        placeholder: t1('Enter email'),
      }
    },
    {
      label: 'phone',
      name: 'phone',
      colSpan: 12,
      component: Input,
      componentProps: {
        placeholder: 'Enter company phone',
      }
    },
    {
      label: 'address',
      name: 'address',
      colSpan: 24,
      component: Input,
      componentProps: {
        placeholder: 'address',
      }
    }
  ];
});
