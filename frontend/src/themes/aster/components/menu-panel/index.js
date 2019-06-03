import React from "react";
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import menuSchema from './menu-schema';
import Menu from 'layouts/common/menu';
import {connect} from 'react-redux';
import logo from '../../assets/svg/aster-logo.svg';
import './stylesheet.css'


class MenuPanel extends React.Component {

  render() {
    return (
      <div className='ui-aster-menu'>
        <div className='ui-aster-menu-content'>
          <div className='top-banner'>
            <div className='ui-logo'>
              <img src={logo}/>
            </div>
            <div className='ui-menu-panel'>
              <Menu
                mode="horizontal"
                className="ui-header-menu"
                defaultSelectedKeys={['abcdef', '12312']}
                style={{lineHeight: '64px'}}
                schema={menuSchema}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect()(MenuPanel);

