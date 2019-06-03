import React from "react";
import {Avatar, Icon, Popover} from 'antd';
import './stylesheet.css'

class LoginUser extends React.Component {
  
  render() {
    return (
      <Popover
        content={<a onClick={this.hide}>Close</a>}
        placement="bottom"
        title="Title"
        trigger="click"
      >
        <div className="ui-user-avatar">
          <div className="avatar">
            <Avatar icon="user"/>
          </div>
          <div className="info">
            <div className="display-name">Nguyễn Huy Hoàng </div>
            <div className="role-name">Administrator <Icon style={{fontSize: '10px'}} type="down"/></div>
          </div>
        </div>
      </Popover>
    );
  }
}

export default LoginUser;
