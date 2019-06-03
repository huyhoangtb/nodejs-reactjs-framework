import React from "react";
import {Layout} from 'antd';
import Menu from 'layouts/common/menu';
import {connect} from 'react-redux';
import menuSchema from "./menu-schema";
// import Logo from './lotuslms_logo.png';
// import LogoSmall from './lotuslms_logo_small.png';
import './stylesheet.css';
import {history} from "../../../store";

const {SubMenu} = Menu;
const {Sider} = Layout;

class LeftAdminMenu extends React.Component {
  
  render() {
    const {layoutContext} = this.props;
    
    return (
      <Sider width={250}
             collapsed={!layoutContext.isOpenLeftMenu}
             className="ui-admin-left-menu-panel ant-layout-sider">
        {/*<div className="admin-logo-panel">*/}
          {/*<img src={layoutContext.isOpenLeftMenu ? Logo : LogoSmall}/>*/}
        {/*</div>*/}
        <Menu
          className="ui-admin-left-menu"
          mode="inline"
          selectedKeys={[history.location.pathname]}
          schema={menuSchema}/>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layoutContext: state.layoutContext
  }
}

export default connect(mapStateToProps)(LeftAdminMenu);
