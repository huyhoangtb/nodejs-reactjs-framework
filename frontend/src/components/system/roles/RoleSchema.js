import {t1} from '../../../i18n';
import {Input, Divider} from 'antd';
import {fetchNode} from '../../../common';
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
      label: t1('role name'),
      name: 'name',
      colSpan: 12,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'role name is required'}]},
      componentProps: {
        placeholder: t1('role name')
      }
    },
    {
      label: 'role code',
      name: 'code',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'role code is required'}]},
      component: Input,
      componentProps: {
        placeholder: t1('role code'),
      }
    },
    {
      label: t1('permission'),
      name: 'permissions',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        mode:"multiple",
        placeholder: t1("Please select permissions"),
        onSearch: async (input) => await fetchNode('permission', {_q: input}),
        options: {
          value: 'code',
          label: (permission) => permission.name || permission.code,
          onDataEmpty: {
            // endpoint: '',
            // params: '',
            summitThisValueAs: 'iid',
            node: 'permission'
          }
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
