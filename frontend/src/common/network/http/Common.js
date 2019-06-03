/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import Store from 'store';

const CommonURL = {

  getUserAuthInfo: () => {
    return Store.getState().user && Store.getState().user.authInfo ? Store.getState().user.authInfo : {};
  },

  getUser: () => {
    return Store.getState().user && Store.getState().user.user ? Store.getState().user.user : {};
  },

  getWorkingOrgInfo: () => {
    const org = Store.getState().user.currentOrg;
    const user = CommonURL.getUser();
    if(!user || Object.keys(user).length === 0 || !user.iid) {
      return {};
    }

    if (!org || !org.iid) {
      return {
        orgIid: user.orgIids[0],
        orgRootIid: user.orgRootIid
      }
    }

    return {
      orgIid: org.iid,
      orgRootIid: org.orgRootIid
    }
  },

  getURL: (url, params, configsInput) => {
    let localUrl = url;
    let localParams = params;
    let configs = configsInput || {};
    localParams = localParams || {};
    let userInfo = true;
    const domainUrl = '';
    if (domainUrl) {
      localUrl =
        domainUrl + (localUrl.startsWith('/') ? localUrl : `/${localUrl}`);
      userInfo = false;
    } else if (
      Object.prototype.hasOwnProperty.call(localParams, 'domainUrl') ||
      Object.prototype.hasOwnProperty.call(localParams, 'domain-url')
    ) {
      localUrl =
        localParams.domainUrl + localUrl.startsWith('/')
          ? localUrl
          : `/${localUrl}`;
      delete localParams.domainUrl;
    } else if (!localUrl.startsWith('http') && !localUrl.startsWith('https')) {
      localUrl = process.env.REACT_APP_SERVER_API_URL +
        (localUrl.startsWith('/') ? localUrl : `/${localUrl}`);
    }
    localParams = Object.assign({}, localParams);

    if (!configs) {
      configs = {};
    }
    let headers = configs.headers || {};
    const authInfo = CommonURL.getUserAuthInfo();
    const user = CommonURL.getUser();
    let attachedNodes = headers.attachedNodes || localParams.attachedNodes || {};
    attachedNodes = typeof attachedNodes === 'string' ? attachedNodes : JSON.stringify(attachedNodes);
    const orgInfo = CommonURL.getWorkingOrgInfo();
    configs = {
      ...configs,
      headers: {
        ...headers,
        ...orgInfo,
        attachedNodes: attachedNodes,
        node: headers.node || localParams.node,
        passport: authInfo.token,
        userIid: user.iid,

      }
    }
    delete localParams.node;
    return {
      urlProcess: localUrl,
      allParams: localParams,
      configs: configs,
    };
  },

  createFrom: (params, form) => {
    let localForm = form;
    if (!localForm) {
      localForm = new FormData();
    }
    if (!params) {
      return localForm;
    }
    Object.keys(params).forEach((key) => {
      CommonURL.simplifyParams(localForm, key, params[key]);
    });
    return localForm;
  },

  simplifyParams: (form, key, param) => {
    if (typeof param === 'undefined' || param === null) return;

    if (typeof param !== 'object' || param instanceof File) {
      form.append(key, param);
      return;
    }

    if (Array.isArray(param)) {
      param.forEach((value, i) => {
        CommonURL.simplifyParams(form, `${key}[${i}]`, value);
      });
    } else {
      Object.keys(param).forEach((subKey) => {
        CommonURL.simplifyParams(form, `${key}[${subKey}]`, param[subKey]);
      });
    }
  }
}

export default CommonURL;
