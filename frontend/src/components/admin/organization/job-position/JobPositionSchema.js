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
      label: t1('Organization'),
      name: 'orgIid',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        placeholder: t1('Belong organization'),
        showSearch: true,
        defaultActiveFirstOption: false,
        showArrow: false,
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
      label: t1('Job position name'),
      name: 'name',
      colSpan: 12,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'Job position name is required'}]},
      componentProps: {
        placeholder: t1('job position name')
      }
    },
    {
      label: 'Job position code',
      name: 'code',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'Job position code is required'}]},
      component: Input,
      componentProps: {
        placeholder: t1('job position code'),
      }
    },
    {
      label: t1('roles'),
      name: 'roles',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        mode: "multiple",
        showSearch: true,
        defaultActiveFirstOption: false,
        showArrow: false,
        filterOption: false,
        placeholder: t1("Please select roles"),
        onSearch: async (input, currentValue) => await fetchNode('role', {
          _q: input,
          $conditions: {iid: {$nin: currentValue}}
        }),
        options: {
          value: 'iid',
          label: (role) => role.name || role.code,

        },
        onDataEmpty: {
          // endpoint: '',
          params: {pageSize: 15},
          summitThisValueAs: 'iid',
          node: 'role'
        }
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
      }

    },
  ];
});
