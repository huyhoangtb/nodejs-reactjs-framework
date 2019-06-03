import React from 'react';
import enpoints from 'configs/endpoints';
import {Link} from 'react-router-dom';
import Translate from 'i18n';
import FormCommon from 'schema-form/common';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {connect} from 'react-redux';
import userActions from "action-creators/user";
import {history} from "store";
import './stylesheet.css';

const FormItem = Form.Item;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginSuccess = (result) => {
    const {dispatch} = this.props;
    this.setState({errMsg: undefined, successMsg: Translate.t1('You have bean logined!..')});
    const options = {
      onSuccess: () => {
        history.push('/');
      }
    }
    dispatch(userActions.getUserInfo(options));
    
  }
  onLoginFail = (result) => {
    const msg = result && result.msg ? result.msg : Translate.t1('Your username or password wrong!..');
    this.setState({errMsg: msg, successMsg: undefined})
  }
  onLogin = (event) => {
    const options = FormCommon.submitOptions;
    options.onSuccess = this.onLoginSuccess;
    options.endpoint = enpoints.user.login;
    options.onFail = this.onLoginFail;
    options.networkMethod = 'postAsForm';
    options.checkSuccessOnField = 'access_token';
    options.dispatchFullResponse = true;
    options.dispatchAfterSuccess = userActions.receivedToken;
    
    FormCommon.submitForm(event, this.props.form, options)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    
    return (
      <div className="ui-login-form ui-user-oauth-form">
        <Form className="login-form" layout="vertical">
          <FormItem label={Translate.t1('username')}>
            {getFieldDecorator('username', {
              rules: [{required: true, message: Translate.t1('Please enter your password!')}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder={Translate.t1('username')}/>
            )}
          
          </FormItem>
          <FormItem label={Translate.t1('password')}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: Translate.t1('Please enter your password!')}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder={Translate.t1('Password')}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>{Translate.t1('Remember me')}</Checkbox>
            )}
            <Link className="login-form-forgot" to="/user/forgot-password">{Translate.t1('Forgot password')}</Link>
            <Button type="primary" onClick={this.onLogin} className="login-form-button">
              {Translate.t1('Log in')}
            </Button>
            Or <Link to='/user/register'>{Translate.t1('Register now!')}</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect()(Form.create()(RegisterForm));
