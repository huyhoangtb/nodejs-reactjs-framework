import React from "react";
import Menu from 'layouts/common/menu';
import {connect} from 'react-redux';
import menuSchema from "./menu-schema";
import './stylesheet.css';
import {Layout} from "antd/lib/index";

const {Sider} = Layout;

class LeftAdminMenu extends React.Component {
  
  render() {
    const {layoutContext} = this.props;
    
    return (
      <Menu
        className="ui-admin-left-menu"
        mode="inline"
        schema={menuSchema}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    layoutContext: state.layoutContext
  }
}

export default connect(mapStateToProps)(LeftAdminMenu);
