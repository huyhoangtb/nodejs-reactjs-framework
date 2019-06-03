import React from "react";
import {matchRoutes, renderRoutes} from "react-router-config";
import {checkPermissionsOfRoute} from "../../configs/Roles";
import {history} from "../../store";
import uuid from 'uuid/v4';
import ReactDOM from "react-dom";
import connect from "react-redux/es/connect/connect";
import OverlayHelper from "../../schema-form/helper/overlay-helper";
import actionCommon from "../../action-creators/common";
import {getSubRoutes} from "./common";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 **/
class SubMainLayoutHelper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mounted: true};
  }

  componentDidMount() {
    this.handleOnChangeLayout();
    this.setState({subRoutes: getSubRoutes(this)});
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {location} = this.props;
    const nextLocation = nextProps.location;
    if (location.pathname === nextLocation.pathname) {
      return;
    }
    if(!this.state.subRoutes) {
      this.setState({subRoutes: getSubRoutes(this)});
    }
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  handleOnChangeLayout = (nextProps) => {
    const {dispatch, location, route, authInfo} = nextProps || this.props;
    const branches = matchRoutes(route.routes, location.pathname);
    if (!branches || branches.length === 0) {
      return;
    }

    const branchRoute = branches[0].route;
    if (branchRoute && branchRoute.layout && (!this.state.layoutId || branchRoute.layout !== this.state.layoutId)) {
      const layoutId = branchRoute.layout;
      const params = branchRoute.params || {};
      this.setState({layoutId});
    }

    branches.map(branch => {
      checkPermissionsOfRoute(branch.route, dispatch, history, authInfo);
    })
  };

  render() {
    const {subRoutes} = this.state;
    return (<div>
      {renderRoutes(subRoutes)}
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    currentLayout: state.layout,
    user: state.user.user,
    authInfo: state.user.authInfo,
  }
};

export default connect(mapStateToProps)(SubMainLayoutHelper);
