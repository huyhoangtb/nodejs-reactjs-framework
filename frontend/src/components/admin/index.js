import React from 'react';
import {Form} from 'antd';

const FormItem = Form.Item;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  // onFormRequest = (event) => {
  //   const options = FormCommon.submitOptions;
  //   options.networkMethod = 'postAsForm';
  //
  //   FormCommon.submitForm(event, this.props.form, options)
  // }
  //
  render() {
    // const {getFieldDecorator} = this.props.form;
    
    return (
      <div className="ui-my-component">
        aaaaaa
        {/*<Form className="ui-my-component-form">*/}
        {/*<FormItem>*/}
        {/*{getFieldDecorator('userName', {*/}
        {/*rules: [{required: true, message: Translate.t1('Please enter your username!')}],*/}
        {/*})(*/}
        {/*<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder={Translate.t1('username')}/>*/}
        {/*)}*/}
        {/*</FormItem>*/}
        {/**/}
        {/*<Button type="primary" onClick={this.onFormRequest} className="login-form-button">*/}
        {/*{Translate.t1('Admin')}*/}
        {/*</Button>*/}
        {/*</Form>*/}
      </div>
    );
  }
}

export default MyComponent;
