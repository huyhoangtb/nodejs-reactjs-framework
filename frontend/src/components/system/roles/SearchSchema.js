import {t1} from '../../../i18n';
import {Input} from 'antd';
import SelectElement from '../../../schema-form/elements/Select';

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
      label: t1('Please enter your the code or name of some roles'),
      name: '_q',
      colSpan: 16,
      component: Input,
      componentProps: {
        placeholder: t1("enter the role's code, name ")
      }
    },
    {
      label: t1('status'),
      name: 'status',
      colSpan: 8,
      component: SelectElement,
      componentProps: {
        placeholder: t1('select status'),
        filterOption: false,
        options: {
          value: 'bankName',
          label: 'bankName',
          data: $this.props.bankings
        }
      },
    },
  ];
});
