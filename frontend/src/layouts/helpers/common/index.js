import React from "react";
import actionCommon from "action-creators/common";
import Requester from 'common/network/http/Request';
import Endpoints from 'configs/endpoints';
import {getParams} from "../../../common";

export const getDocumentIid = (props) => {
  const routeParams = getParams(props);
  let documentIid = routeParams.iid;
  if (!documentIid) {
    documentIid = routeParams.documentIid;
  }
  return {documentIid, routeParams};
}

/**
 * This function will use to auto fetch data from route configs
 *
 * @param props
 * @param route
 */
export const executeAutoFetch = async (config) => {

  let params = config.params ? {...config.params} : {};
  let method = config.method ? config.method : 'GET';
  let attachedNodes = params.attachedNodes ? params.attachedNodes : {};
  let node = config.node || params.node;
  let fetchAction = config.fetchAction || 'find';
  let url = config.url || Endpoints.node.detail;
  delete params.attachedNodes;

  if (Requester[method] === undefined) {
    method = method.toLowerCase();
    if (Requester[method] === undefined) {
      return;
    }
  }

  const response = await Requester[method](url, {...params},
    {
      headers: {
        nodeAction: fetchAction,
        node,
        attachedNodes: JSON.stringify(attachedNodes)
      }
    }
  );

  if (response && response._success) {
    return response._result;
  }
  return undefined;
};

/**
 * This function will use to overwrite the default sub router.
 *
 * @param $this
 * @param popup: using with popup
 * @returns {*}
 */
export const getSubRoutes = ($this, popup = true) => {
  const {route, dispatch} = $this.props;
  const {routes} = route;
  if (!routes || routes.length === 0 || !$this.state.mounted) {
    return route.routes;
  }
  const popupScreenId = route.popupScreenId || 'default';
  const result = [];


  routes.map(r => {
    result.push({
      ...r,
      component: ((props) => {

        const Component = r.component;
        let {documentIid, routeParams} = getDocumentIid(props);

        if (!r.autoFetch || (!documentIid && routeParams.length === 0)) {
          return <Component {...props} rcontext={{...routeParams}} route={r} popupScreenId={popupScreenId}/>
        }

        if (r.disableOpenPopupScreen && popup) {
          dispatch(actionCommon.setStatusOfFormView({viewId: popupScreenId, display: false, isNewRoute: r.isNewRoute}));
        }

        const autoFetchConfigs = Array.isArray(r.autoFetch) ? r.autoFetch : [r.autoFetch];
        const autoFetchConfigDetail = [];
        const autoSetValues = {};

        autoFetchConfigs.map(c => {
          const {config, key, dataName} = getConfigGivenByRoute(c, routeParams);
          autoFetchConfigDetail.push({config, key, dataName});
          autoSetValues[dataName] = $this.state[key];
          if(autoFetchConfigs.length === 1 && config.params && config.params.isMainNode !== false) {
            autoSetValues.documentData = $this.state[key];
          }

          if(config.params && config.params.isMainNode) {
            autoSetValues.documentData = $this.state[key];
          }

        });



        autoFetchConfigDetail.map(af => {
          const {config, key, dataName} = af;
          if (!key || $this.state[key]) {
            return;
          }

          $this.setState({[key]: {}});
          executeAutoFetch(config).then(detail => {
            if (!detail || !$this.state.mounted) {
              return;
            }

            $this.setState({[key]: detail});
            dispatch(actionCommon.setStatusOfFormView({
              viewId: popupScreenId,
              title: detail.name,
              isNewRoute: r.isNewRoute
            }));
          }).catch(e => {
          });
        });

        return <Component {...props} {...autoSetValues} route={r} rcontext={{...routeParams}} iid={documentIid} popupScreenId={popupScreenId}/>
      }),
    })
  });

  return result;
}


/**
 * will overwrite some config by value get from route
 * @type {Function}
 */
const getConfigGivenByRoute = ((config, routeParams) => {
  const params = {};
  if (!config.params) {
    return {config, key: undefined};
  }
  if (!config.params.iid && routeParams.iid) {
    config.params.iid = routeParams.iid;
  }
  const configKeys = Object.keys(config.params);
  configKeys.sort();

  let key = '';
  let dataName = undefined;

  configKeys.map(configKey => {
    if (configKey === 'nameAs') { //rewrite the name pass to the component
      dataName = config.params[configKey];
      return;
    }
    if (routeParams[configKey] !== undefined) {
      params[configKey] = routeParams[configKey];
      key += `${configKey}.${routeParams[configKey]}|`;
    } else {
      params[configKey] = config.params[configKey];
      key += `${configKey}.${config.params[configKey]}|`;
    }
  });
  config.params = params;
  if (!dataName) {
    dataName = params.node
  }

  return {config, key, dataName};
});

