import {t1} from 'i18n';
import {Input} from 'antd';
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
  return [
    {
      label: 'input search data',
      name: 'searchData',
      colSpan: 12,
      component: Input,
      componentProps: {
        placeholder: t1('code, name, email, phone ...')
      }
    },
    {
      label: 'service types',
      name: 'serviceTypes',
      colSpan: 6,
      component: SelectElement,
      componentProps: {
        placeholder: 'Enter the service types',
        filterOption: false,
        options: {
          value: 'bankName',
          label: 'bankName',
          data: $this.props.bankings
        }
      },
    },
    {
      label: 'status',
      name: 'status',
      colSpan: 6,
      component: SelectElement,
      componentProps: {
        placeholder: 'select status',
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
