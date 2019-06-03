import React from 'react';
import enpoints from 'configs/endpoints';
import FormGeneration from 'schema-form/GenerateForm';
import schema, {layout} from './schema';
import {connect} from 'react-redux';
import userActions from "action-creators/user";
import {history} from "store";
import 'components/user/stylesheet.css';


/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class RegisterForm extends React.Component {
  onCreateUserSuccess = (result, registerUserData) => {
    const {dispatch} = this.props;
    this.setState({errMsg: undefined, successMsg: 'Success to create new user, please check your email!'});
    const options = {
      onSuccess: () => {
        history.push('/');
      }
    }
    dispatch(userActions.login(registerUserData, options));
  }
  onCreateUserFail = (result) => {
    const msg = result && result.msg ? result.msg : 'Can not create user';
    this.setState({errMsg: msg, successMsg: undefined})
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const formData = this.props.formData || {};
    const formProps = {
      layout: "vertical"
    }
    return (
      <div className="ui-org-form-data">
        <FormGeneration
          formProps={formProps}
          schema={schema}
          node='Organization'
          formData={...formData}
          // url={enpoints.organization.new}
          url={enpoints.node.create}
          schemaLayout={layout}
          onSuccess={this.onCreateUserSuccess}
          onFail={this.onCreateUserFail}
          dispatchAfterSuccess={userActions.receivedUserInfo}
          submitLabel='new company'/>

      </div>
    );
  }
}

export default connect()(RegisterForm);
