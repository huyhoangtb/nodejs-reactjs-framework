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
      label: 'permission code',
      name: 'code',
      colSpan: 12,
      decoratorOption: {rules: [{required: true, message: 'permission code is required'}]},
      component: Input,
      componentProps: {
        disabled: true,
        placeholder: t1('permission code'),
      }
    },
    {
      label: t1('permission name'),
      name: 'name',
      colSpan: 12,
      component: Input,
      decoratorOption: {rules: [{required: true, message: 'permission name is required'}]},
      componentProps: {
        placeholder: t1('permission name')
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
