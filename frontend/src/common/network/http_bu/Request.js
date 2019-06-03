/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */
import axios from 'axios';
import common from './Common';
import Store, {history} from 'store';
import userActionCreators from '../../../action-creators/user';
import {notification} from 'antd';

const PROGRESS_PROCESS = 0.8;

const addCommonHeader = () => {
  let token = Store.getState().user.token || {};
  if (token && token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
    if (token.user_info) {
      axios.defaults.headers.common['x-user-id'] = `${token.user_info.user_id}`;
    }
    // axios.defaults.headers.common['x-user-id'] = `ABE75151-6CC3-4790-9E11-762801EAC16A`;
  }
};


const addCommonZipHeader = () => {
  return;
  let oauth = Store.getState().user.oauth || {};
  if (!oauth || Object.keys(oauth).length === 0 || !oauth.access_token) {
    // oauth = detail().oauth;
  }
  if (oauth && oauth.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${oauth.access_token}`;
  }
  axios.defaults.headers.common['content-type'] = 'application/json';
  axios.defaults.async = true;
  axios.defaults.responseType = 'arraybuffer';
  axios.defaults.crossDomain = true;
};


class Request {
  
  getDefault = (url, params) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(params);
    return xmlHttp.response
  }
  
  get = (url, params, isRetry, onSuccess, onFail) => {
    const {urlProcess, allParams} = common.getURL(url, this.attachSecurityToParams(params));
    // const oauth = Store.getState().user.oauth || {};
    addCommonHeader();
    const that = this;
    window.NProgress.start();
    window.NProgress.set(PROGRESS_PROCESS);
    
    return axios.get(urlProcess, {
      params: allParams,
    }).then((response) => {
      window.NProgress.done();
      this.notifyMsg(response);
      if (onSuccess) {
        onSuccess(response);
      }
      return (response && response.data) || {};
    })
      .catch((error) => {
        window.NProgress.done();
        const response = error.response || {};
        if (response && response.status === 401) {
          Store.dispatch(userActionCreators.logout());
          history.push('/login');
        }
      });
  }
  
  getJSON = (url, params, isRetry, onSuccess) => {
    axios.defaults.headers.common['content-type'] = 'application/json';
    return this.get(url, params, isRetry, onSuccess);
  }
  
  postAsForm = (url, params, isRetry, notUseHeader) => {
    addCommonHeader();
    axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
    const r = new Request();
    return this.post(url, params, isRetry, notUseHeader);
  };
  
  postJson = (url, params, isRetry, notUseHeader) => {
    addCommonHeader();
    axios.defaults.headers['content-type'] = 'application/json';
    return this.post(url, params, isRetry, notUseHeader);
  };
  
  post = (url, params, isRetry, notUseHeader) => {
    
    const {urlProcess, allParams} = common.getURL(url, this.attachSecurityToParams(params));
    // const oauth = Store.getState().user.oauth || {};
    const that = this;
    window.NProgress.start();
    window.NProgress.set(PROGRESS_PROCESS);
    return axios.post(urlProcess, allParams)
      .then((response) => {
        window.NProgress.done();
        this.notifyMsg(response);
        return response.data || {};
      })
      .catch((error) => {
        window.NProgress.done();
        const response = error.response || {};
        if (response && response.status === 401) {
          Store.dispatch(userActionCreators.logout());
          history.push('/login');
        }
      });
  }
  
  postAsBody = (url, params, isRetry, onSuccess, onFail) => {
    const {urlProcess} = common.getURL(url, params);
    // const oauth = Store.getState().user.oauth || {};
    const that = this;
    addCommonHeader();
    window.NProgress.start();
    window.NProgress.set(PROGRESS_PROCESS);
    axios.defaults.headers.common['content-type'] = 'application/json';
    return axios.post(urlProcess, params)
      .then((response) => {
        window.NProgress.done();
        this.notifyMsg(response);
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data || {};
      })
      .catch((error) => {
        const response = error.response || {};
        window.NProgress.done();
        if (onFail) {
          onFail();
        }
        // if (response.status === 401 && oauth.refresh_token && !isRetry) {
        //   // const request = new Request();
        //   //
        //   // return request.redoNetworkAction(url, params, 'post');
        // }
      });
  }
  
  postAsBodyNoOauth = (url, params, isRetry, onSuccess, onFail) => {
    const {urlProcess} = common.getURL(url, params);
    // const oauth = Store.getState().user.oauth || {};
    const that = this;
    delete axios.defaults.headers.common['x-user-id'];
    delete axios.defaults.headers.common['Authorization'];
    axios.defaults.headers.common['content-type'] = 'application/json';
    window.NProgress.start();
    window.NProgress.set(PROGRESS_PROCESS);
    return axios.post(urlProcess, params)
      .then((response) => {
        window.NProgress.done();
        this.notifyMsg(response);
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data || {};
      })
      .catch((error) => {
        window.NProgress.done();
        const response = error.response || {};
        if (onFail) {
          onFail();
        }
        // if (response.status === 401 && oauth.refresh_token && !isRetry) {
        //   // const request = new Request();
        //   //
        //   // return request.redoNetworkAction(url, params, 'post');
        // }
      });
  }
  
  attachSecurityToParams = (params) => {
    let p = params || {};
    p = {
      ...p,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: process.env.REACT_APP_CLIENT_GRANT_TYPE
    };
    return p;
  };
  
  
  notifyMsg = (response) => {
    const responseData = response && response.data;
    if (responseData && responseData.msg) {
      if (responseData.success) {
        notification['info']({
          message: "Thông báo!!!",
          description: responseData.msg,
          
        });
      } else if (!responseData.success) {
        notification['error']({
          message: "Thông báo!!!",
          description: responseData.msg,
          
        })
      }
    }
  }
  
}

const r = new Request();
export default r;
