import React from "react";
import {Icon, Drawer} from 'antd';
import {t1, t3} from 'i18n';
import logo from '../../assets/svg/aster-logo.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './stylesheet.css'
import Menu from "../../../../layouts/common/menu";
import menuSchema from "./menu-schema";


class ContactHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  showMenu = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <div className='ui-aster-contact-header'>

        <div className='ui-contact-content ui-mobile-header ui-aster-home-item'>
          <div className='ui-left ui-logo'>
            <img src={logo}/>
          </div>
          <div className='ui-right'>
            <Icon type="menu" onClick={this.showMenu} className='top-mobile-menu'/>
          </div>
        </div>

        <div className='ui-contact-content ui-desktop-header ui-aster-home-item'>
          <div className='ui-left'>
            <div className='ui-item'>
              <Icon type="phone"/>
              <span>(+84)966 298 666</span>
            </div>
            <div className='ui-item'>
              <Icon type="mail"/>
              <span>vntopmas@gmail.com</span>
            </div>
          </div>

          <div className='ui-right'>
            <div className='ui-item'>
              <Link to='/'><span>{t1('home')}</span></Link>
            </div>
            <div className='ui-item'>
              <Link to='/about-us'><span>{t1('about')}</span></Link>
            </div>
            {/*<div className='ui-item'>*/}
            {/*<Link to='/faq'><span>{t3('faq')}</span></Link>*/}
            {/*</div>*/}
            <div className='ui-item'>
              <Link to='/contact-us'><span>{t1('contact us')}</span></Link>
            </div>
          </div>
        </div>

        <Drawer
          className='ui-aster-mobile-menu'
          title={
            <div className='ui-left'>
              <div className='ui-logo ui-item'>
                <img src={logo}/>
              </div>
            </div>
          }
          placement="top"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Menu
            mode="inline"
            onClick={this.onClose}
            className="ui-header-menu"
            defaultSelectedKeys={['abcdef', '12312']}
            style={{lineHeight: '64px'}}
            schema={menuSchema}/>
        </Drawer>
      </div>
    );
  }
}

export default connect()(ContactHeader);

