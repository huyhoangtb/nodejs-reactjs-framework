import React from "react";
import {Layout, Icon} from 'antd';
import {Link} from 'react-router-dom';
import SelectOrg from './select-org';
import LoginedUser from 'components/common/viewers/login-user';
import connect from "react-redux/es/connect/connect";

const {Header} = Layout;

class AdminTopMenu extends React.Component {

  render() {
    return (
      <Header className="ui-header-admin">
        <div className="admin-logo-panel">
          {/*<img src={Logo}/>*/}
        </div>
        <div className="flex-grow-1">
        </div>

        {/*<Menu*/}
        {/*mode="horizontal"*/}
        {/*className="ui-header-menu"*/}
        {/*defaultSelectedKeys={['abcdef', '12312']}*/}
        {/*style={{lineHeight: '64px'}}*/}
        {/*schema={menuSchema}/>*/}
        <div className="flex-center">
          <SelectOrg/>
        </div>
        <div className="setting-top-header">
          <Link className="top-administrator" className="white-color" to={''}><Icon type="setting"/></Link>
        </div>

        <div className="flex-center">
          <LoginedUser/>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layoutContext: state.layoutContext
  }
}

export default connect(mapStateToProps)(AdminTopMenu);

