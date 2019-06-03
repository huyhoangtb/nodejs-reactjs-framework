import React from 'react';
import {connect} from 'react-redux';
import {history} from "store";
import userActionCreators from 'action-creators/user';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const {dispatch} = this.props;
    const options = {
      onSuccess: () => {
        history.push('/');
      }
    }
    dispatch(userActionCreators.logout(options));
    
  }
  
  
  render() {
    return (
      <div>logout...</div>
    );
  }
}


export default connect()(Logout);
