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
      colSpan: 12,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'first name is required'}]},
      componentProps: {
        placeholder: t1('first name  name')
      }
    },
    {
      label: 'last name',
      name: 'lastName',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'last name code is required'}]},
      component: Input,
      componentProps: {
        placeholder: t1('last name'),
      }
    },
    {
      label: 'Organization',
      name: 'orgIids',
      colSpan: 12,
      component: SelectElement,
      componentProps: {
        placeholder: t1('Belong organization'),
        showSearch: true,
        defaultActiveFirstOption: false,
        showArrow: false,
        mode:"multiple",
        filterOption: false,
        onSearch: async (input) => await fetchNode('organization', {_q: input}),
        notFoundContent: null,
        options: {
          value: 'iid',
          label: 'name',
        },
        onDataEmpty: {
          // endpoint: '',
          // params: '',
          summitThisValueAs: 'iid',
          node: 'organization'
        }
      }
    },
    {
      label: t1('job position'),
      name: 'jobPositions',
      colSpan: 12,
      component: SelectElement,
      componentProps: {
        mode: "multiple",
        showSearch: true,
        defaultActiveFirstOption: false,
        showArrow: false,
        filterOption: false,
        placeholder: t1("Please select job positions"),
        onSearch: async (input, currentValue) => await fetchNode('job_position', {
          _q: input,
          $conditions: {iid: {$nin: currentValue}}
        }),
        options: {
          value: 'iid',
          label: (jobPosition) => `${jobPosition.name}`,

        },
        onDataEmpty: {
          // endpoint: '',
          params: {pageSize: 15},
          summitThisValueAs: 'iid',
          node: 'job_position'
        }
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
      component: Divider,
      componentProps: {
        orientation: 'left',
        children: 'User account'
      }
    },
    {
      label: 'username',
      name: 'username',
      colSpan: 8,
      component: Input,
      componentProps: {
        placeholder: t1('username'),
      }
    },
    {
      label: 'password',
      name: 'password',
      colSpan: 8,
      component: Input,
      componentProps: {
        type: 'password',
        placeholder: t1('Enter password'),
      }
    },
    {
      label: 're-password',
      name: 'rePassword',
      colSpan: 8,
      component: Input,
      componentProps: {
        type: 'password',
        placeholder: 'Re-enter the password',
      }
    },
    {
      component: Divider,
      componentProps: {
        orientation: 'left',
        children: 'Another info'
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
