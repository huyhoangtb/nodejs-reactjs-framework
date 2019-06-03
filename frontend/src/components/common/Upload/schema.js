import {Input} from 'antd';
import {Select, InputNumber} from 'antd';
import ElementTypes from 'schema-form/ElementTypes';

export const layout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

export default ($this => {
  return [
    {
      label: 'Nhập số tiền',
      name: 'amount',
      colSpan: 24,
      component: InputNumber,
      decoratorOption: {
        // rules: [{required: true, setMessage: 'Please input your username!'}, { validator: $this.props.checkEmail }]
      },
      componentProps: {
        placeholder: 'Nhập số tiền',
        style: {width: '100%'},
        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: value => value.replace(/\$\s?|(,*)/g, '')
      }
    },
    {
      label: 'Chọn ngân hàng',
      placeholder: 'Chọn ngân hàng',
      name: 'bankingIid',
      colSpan: 24,
      component: Select,
      type: ElementTypes.SELECTION,
      componentProps: {
        showSearch: true,
        style: {width: 200},
        placeholder: 'Chọn ngân hàng',
        optionFilterProp: 'children',
      },
      options: {
        value: 'iid',
        label: 'bankName',
        data: $this.props.bankings
      }
    },
  ];
});
