import React from "react";
import actionCommon from 'action-creators/common';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {t1} from 'i18n';
import {Icon, Drawer} from 'antd';
import './stylesheet.css';
import {history} from "store";
import Menu from "../../../layouts/common/menu";


class OverlayHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onEscKeyPress = this.onEscKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onEscKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscKeyPress, false);
  }

  onEscKeyPress = (e) => {
    const viewId = this.props.viewId || 'default';
    e = e || window.event;
    if (e.key === "Escape" || e.keyCode == 27) {
      this.onClose(viewId);
    }
  }

  onClickNewButton = () => {
    const {onClick, dispatch, url, endpoint} = this.props;

    const viewId = this.props.viewId || 'default';
    dispatch(actionCommon.setStatusOfFormView({viewId, display: true}));
    if (url || endpoint) {
      history.push(url || endpoint);
    }
    if (!onClick) {
      return;
    }
    onClick()
  }

  onClose = (viewIdDefault) => {

    const {dispatch, returnUrlOnClosed, showFormView} = this.props;
    const viewId = this.props.viewId || viewIdDefault || 'default';
    if (showFormView[viewId] && showFormView[viewId].display) {
      dispatch(actionCommon.setStatusOfFormView({viewId, display: false, title: ''}));
    }
    if (returnUrlOnClosed) {
      history.push(returnUrlOnClosed);
      return;
    }
    history.push(`${history.location.pathname}`);
  }

  getHeight = () => {
    const {placement} = this.props;

  }

  getNewRoute = () => {
    const {route, newUrl} = this.props;
    if(!route || !route.routes || route.routes.length === 0) {
      return {};
    }
    for (let i = 0; i < route.routes.length; i++) {
      if (route.routes[i].isNewRoute === true) {
        return route.routes[i];
      }
    }
    return {};
  }

  render() {
    const {status, title, hideNewButton, newUrl, menuSchema, activeMenu} = this.props;
    const placement = this.props.placement || 'top';
    const newRoute = this.getNewRoute();
    const titlePanel =
      <div className='ui-header-popup-screen'>
        <div className='ui-title'>
          {title}
          {(history.location.pathname === newRoute.path)? t1(`create new`) : ''}
        </div>
        {(history.location.pathname !== newRoute.path) &&
        <Menu
          selectedKeys={[history.location.pathname]}
          className="ui-popup-screen-menu"
          mode="horizontal"
          schema={menuSchema}/>
        }
      </div>
    return (
      <div className="ui-new-panel">
        <div className="ui-button" style={{display: (hideNewButton !== true) ? 'block' : 'none'}}>
          <Icon onClick={this.onClickNewButton} type="plus-circle" className="new-icon"/>
        </div>
        <Drawer
          className={`ui-drawer-${placement} ui-drawer-panel`}
          placement={placement}
          title={titlePanel}
          closable={true}
          onClose={this.onClose}
          visible={status}>

          <div className='ui-custom-drawer-body'>
            {this.props.children}
          </div>

        </Drawer>
      </div>

    );
  }
}

OverlayHelper.propTypes = {
  onClick: PropTypes.func,
  hideNewButton: PropTypes.bool,
  placement: PropTypes.string,
  url: PropTypes.string,
  endpoint: PropTypes.string,
  viewId: PropTypes.string,
  title: PropTypes.string,
  menuSchema: PropTypes.array,
  returnUrlOnClosed: PropTypes.string,
};
OverlayHelper.defaultProps = {
  onClick: (f) => f,
  viewId: 'default',
  menuSchema: [],
};

const mapStateToProps = (state, props) => {

  const viewId = props.viewId || 'default';
  let menuSchema = props.menuSchema;
  let activeMenu = props.activeMenu;
  let title = props.title;
  const popup = state.common.showFormView[viewId] || {};
  if (!menuSchema) {
    const popupScreenTopMenu = state.layoutContext.popupScreenTopMenu[viewId] || {};
    menuSchema = popupScreenTopMenu.schema
    activeMenu = popupScreenTopMenu.active
  }
  if (!title) {
    title = popup.title
  }

  return {
    status: popup.display,
    menuSchema,
    title,
    // isNewRoute:popup.isNewRoute,
    showFormView: state.common.showFormView,
    activeMenu
  }
}
export default connect(mapStateToProps)(OverlayHelper);
