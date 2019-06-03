import React, {useState} from 'react';
import OverlayHelper from 'schema-form/helper/overlay-helper';
import connect from "react-redux/es/connect/connect";

import actionCommon from "action-creators/common";
import {matchRoutes, renderRoutes} from "react-router-config";
import {getSubRoutes} from "./common";

class PopoverSubLayoutHelper extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {showPopover: true, mounted: true, hideNewButton: true};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {location} = this.props;
    const nextLocation = nextProps.location;
    if (location.pathname === nextLocation.pathname) {
      return;
    }
    this.setPopoverDefaultStatus(nextProps);
  }

  componentDidMount() {
    this.setPopoverDefaultStatus();
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  setPopoverDefaultStatus = (props) => {
    const {dispatch, route, location} = props || this.props;
    const popupScreenId = route.popupScreenId || 'default';

    if (!location) {
      return;
    }

    let hideNewButton = true;
    let newUrl = null;
    for (let i = 0; i < route.routes.length; i++) {
      if (route.routes[i].isNewRoute === true) {
        hideNewButton = false;
        newUrl = route.routes[i].path;
        // break;
      }
    }
    this.setState({hideNewButton, newUrl})

    const branch = matchRoutes(route.routes, location.pathname);
    if (!branch || branch.length === 0) {
      return;
    }
    if(!this.state.subRoutes) {
      this.setState({subRoutes: getSubRoutes(this)});
    }
    // this.setState({subRoutes: getSubRoutes(this)});
    dispatch(actionCommon.setStatusOfFormView({viewId: popupScreenId, display: true, isNewRoute: route.isNewRoute}));
  }

  render() {
    const {route, location} = this.props;
    const {disableOpenPopupScreen} = route;
    const DefaultComponent = route.defaultComponent;
    const {subRoutes, hideNewButton, newUrl} = this.state;
    const popupScreenId = route.popupScreenId || 'default';
    const branch = matchRoutes(route.routes, location.pathname);

    if (disableOpenPopupScreen === true || !route.routes || (branch && branch.length > 0 && branch[0].route.disableOpenPopupScreen)) {
      return (<div>
        {renderRoutes([
          {
            ...route,
            exact: true,
            component: route.defaultComponent
          },
          ...subRoutes
        ])}
      </div>);
    }

    return (
      <div>
        {DefaultComponent && <DefaultComponent {...this.props}/>}
        <OverlayHelper viewId={popupScreenId} route={route} returnUrlOnClosed={route.path} url={newUrl} hideNewButton={hideNewButton}>
          {renderRoutes(subRoutes)}
        </OverlayHelper>
      </div>
    );
  }
}

export default connect()(PopoverSubLayoutHelper);