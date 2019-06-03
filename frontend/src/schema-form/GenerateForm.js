import React from 'react';
import {Col, Form, Row, Icon} from 'antd';
import {connect} from 'react-redux';
import {executeValidatorFromConfig, getConfigByField} from './DefaultValidators';
import uuid from 'uuid/v4'
import Sform from './Sform';
import PropTypes from 'prop-types';
import './stylesheet.css';
import Translate, {t1} from "i18n";

const FormItem = Form.Item;

/**
 * we using this method to validate data
 *
 * @param item
 * @returns {*|{}}
 */
const addValidator = (item) => {
  let decorator = item.decoratorOption || {};

  if (!decorator.rules) {
    decorator.rules = [];
  }

  const config = getConfigByField(item.name);
  if (config) {
    decorator.rules.push({
      validator: (rule, value, callback) => {
        executeValidatorFromConfig(config, rule, value, callback);
      }
    });
  }

  if (!item.validator) {
    return decorator;
  }

  decorator.rules.push({
    validator: (rule, value, callback) => {
      item.validator(rule, value, callback, this.props)
    }
  });
  return decorator;

}

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class GenerateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const nextformId = nextProps.formId;
    const {formId} = this.props;
    if (nextformId !== formId) {
      this.props.form.resetFields();
    }
  }
  onEnter = (e) => {

  }
  addDefaultDataToCustomElementForm = (itemProps) => {
    const {node} = this.props;
    //add node to the custom component if developer not set it
    if (itemProps && itemProps.onDataEmpty && !itemProps.onDataEmpty.node) {
      itemProps.onDataEmpty.node = node;
    }
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  getFields = () => {
    const {getFieldDecorator, formId} = this.props.form;
    let formData = this.props.formData || this.props.documentData;
    const {schema, schemaLayout, totalDisplay} = this.props;
    const children = [];
    const elements = schema(this);
    const count =  this.state.expand ? elements.length : totalDisplay;
    elements.map((item, i) => {
      if(item.hidden || item.render === false) {
        return;
      }
      const itemProps = item.componentProps || {};
      this.addDefaultDataToCustomElementForm(itemProps);

      if (!item.name || item.type === 'view') {
        children.push(<item.component key={uuid()} {...itemProps}/>);
        return;
      }

      let decorator = addValidator(item);

      // if the decoratorOption not have initialValue, we will auto populate the initialValue from formData
      if (!decorator.initialValue) {
        decorator = {...decorator, initialValue: formData && formData[item.name] ? formData[item.name] : undefined}
      }

      const itemLayout = item.isFull ? {} : (schemaLayout ? schemaLayout : {});

      children.push(
        <Col span={item.colSpan}
             key={`${formId || 'default'}-${item.name}-${i}`}
             style={{ display: (!count || count === -1 || (count && i < count)) ? 'block' : 'none' }}
        >
          <FormItem {...itemLayout}
                    label={item.label}>
            {getFieldDecorator(`${item.name}`, {...decorator})(
              <item.component {...itemProps}/>
            )}
          </FormItem>
        </Col>
      );
    });

    if(totalDisplay && totalDisplay !== -1) {
      children.push(
        <Col span={24} key={`${formId}.Collapse`} style={{ textAlign: 'right' }}>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            {t1('Collapse')} <Icon type={this.state.expand ? 'up' : 'down'} />
          </a>
        </Col>
      );
    }

    return children;
  }

  render() {
    return (
      <Sform ref='SForm' {...this.props}>
        <Row gutter={16}>{this.getFields()}</Row>
      </Sform>
    );
  }
}


GenerateForm.propTypes = {
  /**
   * aaaaa
   */
  className: PropTypes.string,
  leftSummitBtn: PropTypes.any,
  leftSummitBtns: PropTypes.any,
  rightSummitBtn: PropTypes.any,
  rightSummitBtns: PropTypes.any,
  confirmBeforeSummit: PropTypes.bool,
  url: PropTypes.string,
  endpoint: PropTypes.string,
  confirmText: PropTypes.string,
  submitLabel: PropTypes.string,
  nodeAction: PropTypes.string,
  formProps: PropTypes.object,
  schemaLayout: PropTypes.object,
  totalDisplay: PropTypes.number,
  attachedNodes: PropTypes.object,
  schema: PropTypes.func,
  formData: PropTypes.object,
  documentData: PropTypes.object,
  hiddenFields: PropTypes.object,
  disableResponseMessage: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  dispatchAfterSuccess: PropTypes.func,
};

GenerateForm.defaultProps = {
  className: '',
  url: '',
  endpoint: '',
  confirmText: undefined,
  totalDisplay: -1,
  nodeAction: '',
  confirmBeforeSummit: false,
  submitLabel: Translate.t1('summit'),
  formProps: {},
  hiddenFields: {},
  attachedNodes: {},
  schemaLayout: {},
  disableResponseMessage: false,
  formData: undefined,
  documentData: undefined,
  schema: () => {
  },
  onSuccess: undefined,
  onFail: undefined,
  dispatchAfterSuccess: undefined,
};


export default connect()(Form.create({name: new Date().getTime()})(GenerateForm));
