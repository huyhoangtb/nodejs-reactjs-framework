import React from 'react';
import enpoints from 'configs/endpoints';
import GenerateForm from 'schema-form/GenerateForm';
import SchemaForm from './schema';
import Translate from 'i18n';
import FormCommon from 'schema-form/common';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {connect} from 'react-redux';
import userActions from "action-creators/user";
import {history} from "store";
import './stylesheet.css';
import {getParamsFromSearchString} from "../../../common";

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
    const params = getParamsFromSearchString(history.location.search);
    const redirect = params.get('redirect');
    if(!redirect) {
      history.push('/');
    } else {
      history.push(redirect);
    }

  }
  onLoginFail = (result) => {
    const msg = result && result.msg ? result.msg : Translate.t1('Your username or password wrong!..');
    this.setState({errMsg: msg, successMsg: undefined})
  }

  render() {


    return (
      <div className="ui-login-form">
        <GenerateForm
          className='login-form'
          onSuccess={this.onLoginSuccess}
          endpoint={enpoints.user.login}
          // onSuccess = {this.onLoginSuccess}
          dispatchAfterSuccess={userActions.onLoginSuccess}
          schema={SchemaForm}/>
      </div>
    );
  }
}

export default connect()(RegisterForm);
