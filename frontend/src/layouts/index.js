import React from "react";
import {connect} from "react-redux";
import Translate, {t1} from "i18n";
import contextActions from 'action-creators/context'
import {matchRoutes, renderRoutes} from "react-router-config";
import LayoutRegister from "./register";
import {checkPermissionsOfRoute} from 'configs/Roles';
import {BackTop, Icon, notification} from 'antd';
import ReactDOM from "react-dom";
import {history} from "../store";
import userActionCreators from "../action-creators/user";
import "./layout-common.css";
import "antd/dist/antd.less";
import styleConfigs from "../configs/style";

const defaultLoadingProps = {
  type: 'bars',
  color: styleConfigs.PRIMARY_COLOR,
  height: 'auto',
  width: '40px'
}

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 **/
class Layouts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      router: {}
    };
  }

  componentDidMount() {
    window.messagePopup = ReactDOM.findDOMNode(this.refs.messagePopup);
    this.handleOnChangeLayout();
  }

  componentWillMount() {
    const {dispatch, siteConfigs} = this.props;
    dispatch(contextActions.getApplicationContext());
    window.NProgress.configure({
      template: `<div class="bar" role="bar"><div class="peg" ></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.handleOnChangeLayout(nextProps);
    }
  }

  componentWillUnmount() {
    window.messagePopup = undefined;
    window.removeEventListener('resize', this.updateWindowDimensions);
  }



  handleOnChangeLayout = (nextProps) => {
    const {dispatch, location, route, authInfo} = nextProps || this.props;
    if (!location) {
      return;
    }
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
      checkPermissionsOfRoute(branchRoute, dispatch, history, authInfo);
    });


  }
  render() {
    const {children, route} = this.props;
    const layoutId = this.state.layoutId
    let Notify = this.props.Notify || {};

    if (!layoutId) {
      return (<div>Site not found</div>);
    }
    const CurrentLayoutConfig = LayoutRegister[layoutId];
    return (
      <div className="ui-root-layout">

        <CurrentLayoutConfig.component onLayoutChange={this.handleOnChangeLayout}>
          {renderRoutes(route.routes)}
        </CurrentLayoutConfig.component>

        <BackTop >
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentLayout: state.layout,
    user: state.user.user,
    authInfo: state.user.authInfo,
  }
};

export default connect(mapStateToProps)(Layouts);
