import React from 'react';
import {t1} from 'i18n';
import {Input, Icon} from 'antd';
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
  const documentData = $this.props.documentData || {};
  return [
    {
      label: 'Parent Organization',
      name: 'orgIid',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        placeholder: t1('Parent Organization'),
        showSearch: true,
        suffixIcon:<Icon type="search" />,
        defaultActiveFirstOption: false,
        // showArrow: false,
        filterOption: false,
        onSearch: async (input) => await fetchNode('organization', {_q: input}),
        notFoundContent: null,
        options: {
          value: 'iid',
          label: 'name',
          data: [documentData.parentOrg]
        }
      }
    },
    {
      label: 'Company name',
      name: 'name',
      colSpan: 24,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Company name is required'}]},
      componentProps: {
        placeholder: t1('Enter company name')
      }
    },
    {
      label: 'Organization code',
      name: 'code',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'Organization code is required'}]},
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
