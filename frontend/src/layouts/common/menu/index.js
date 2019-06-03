import React from 'react';
import {history} from "store/index";
import Icon from 'antd/lib/icon'
import Menu from "antd/lib/menu";
import './stylesheet.css';
import PropTypes from "prop-types";

const {SubMenu, Item} = Menu;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class MenuRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultOpenKeys: []};
  }

  onMenuClick = (e) => {
    if (e && e.key) {
      history.push(e.key);
    }
  }
  getTitleFromItem = (item, index) => {


    const result = [];
    if (item.icon && item.icon.position === 'left') {
      const className = item.title ? '' : 'm-r-0-i';
      result.push(<Icon key={`${index}_left`} className={className} type={item.icon.type}/>);
    }
    result.push(<span key={`${index}_midle`}> {item.title} </span>);

    if (item.icon && item.icon.position === 'right') {
      const className = item.title ? '' : 'm-l-0-i';
      result.push(<Icon key={`${index}_right`} className={className} type={item.icon.type}/>);
    }

    return result;
  }

  generateMenu = (schema, defaultOpenKeys = []) => {
    const menus = [];
    if(!schema) {
      return menus;
    }
    schema.map((item, index) => {
      // const key = item.id || item.key || item.url;
      const className = item.className ? item.className : '';
      const key = `${item.url}`;
      if (!item.subMenu) {
        return menus.push(<Item className={className} key={key}>
          {this.getTitleFromItem(item)}
        </Item>);
      }

      if (item.open !== false) {
        defaultOpenKeys.push(key);
      }
      const subMenu = this.generateMenu(item.subMenu, defaultOpenKeys);
      menus.push(
        <SubMenu className={className} key={key} title={this.getTitleFromItem(item, index)}>
          {subMenu.menus}
        </SubMenu>
      );
    });
    return {
      menus,
      defaultOpenKeys
    };
  }

  render() {
    const className = this.props.className || '';
    const style = this.props.style || {};
    const onClick = this.props.onClick || (() => {
    });
    const {theme, mode, schema, selectedKeys, openKeys} = this.props;
    const defaultSelectedKeys = this.props.defaultSelectedKeys || [history.location.pathname];
    const {menus, defaultOpenKeys} = this.generateMenu(schema);
    const dfo = defaultOpenKeys || [];
    return (

      <Menu
        className={`${className} ui-menu-panel`}
        style={style}
        theme={theme}
        mode={mode}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={[...dfo]}
        onClick={(e) => {
          onClick(e);
          this.onMenuClick(e);
        }}
      >
        {menus}
      </Menu>

    );
  }
}

MenuRender.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.string,
  openKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  mode: PropTypes.string,
  defaultSelectedKeys: PropTypes.array,
  schema: PropTypes.array,
};

export default MenuRender;
