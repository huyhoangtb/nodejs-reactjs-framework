import {t1} from 'i18n';
import {Input, Select} from 'antd';
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
  return [
    {
      label: 'Company name',
      name: 'companyName',
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Company name is required'}]},
      componentProps: {
        placeholder: t1('Enter company name')
      }
    },
    {
      label: 'company code',
      name: 'companyCode',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'Company code is required'}]},
      component: Input,
      componentProps: {
        placeholder: t1('Company code'),
      }
    },
    {
      label: 'short name',
      name: 'shortName',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'Short name is required!'}]},
      component: Input,
      componentProps: {
        placeholder: 'Enter short name',
      }
    },
    {
      label: 'service types',
      name: 'serviceTypes',
      colSpan: 24,
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
      label: 'address',
      name: 'address',
      colSpan: 24,
      component: Input,
      componentProps: {
        placeholder: 'address',
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
      label: 'domains',
      name: 'domains',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        mode: 'tags',
        placeholder: 'Enter the domains',
        filterOption: false,
        options: {
          value: 'bankName',
          label: 'bankName',
          data: $this.props.bankings
        }
      },
    },
    {
      label: 'notes',
      name: 'notes',
      colSpan: 24,
      component: Input.TextArea,
      componentProps: {
        rows: 4,
        placeholder: 'Enter the notes'
      },
    },
  ];
});
