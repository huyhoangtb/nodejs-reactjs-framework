/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */
import axios from 'axios';
import common from './Common';
import {t1} from 'i18n';
import Endpoints from 'configs/endpoints';
import {history} from "store";
import {notification} from 'antd';

const PROGRESS_PROCESS = 0.8;

// axios.interceptors.request.use(
//   (config) =>
//     // console.log("before request: success", config);
//     config,
//   (error) =>
//     // console.log("before request: not success");
//     Promise.reject(error),
// );
//
// // Add a response interceptor
// axios.interceptors.response.use(
//   (response) =>
//     // Do something with response data
//     // console.log("response: success");
//     response,
//   (error) =>
//     // Do something with response error
//     Promise.reject(error),
// );

class Request {
  constructor() {
    //Init cancelToken. Note: Must create cancel token for each request
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  get(url, params, configsInput) {
    const {urlProcess, allParams, configs} = common.getURL(url, params, configsInput);
    if (window.NProgress) {
      window.NProgress.start();
      window.NProgress.set(PROGRESS_PROCESS);
    }
    const $this = this;
    return axios
      .get(urlProcess, {
        params: allParams,
        ...configs
      })
      .then((response) => {
        const ret = response && response.data;
        if ($this && $this.isInvalidByAuth(response)) {
          return;
        }
        if (window.NProgress) {
          window.NProgress.done();
        }
        return ret;
      })
      .catch((error) => {
        if (window.NProgress) {
          window.NProgress.done();
        }
        if ($this && $this.isInvalidByAuth(error)) {
          return;
        }

        notification.error(
          {
            message: t1('Load data error!...'),
            description: t1('we found a error that will make the process not completed. Please try again!...'),
          }
        )
      });
  }

  post(url, params, configsInput, showProgress = true) {
    const {urlProcess, allParams, configs} = common.getURL(url, params, configsInput);
    const formPost = common.createFrom(allParams);
    const $this = this;
    if (showProgress && window.NProgress) {
      window.NProgress.start();
      window.NProgress.set(PROGRESS_PROCESS);
    }
    return axios
      .post(urlProcess, allParams, configs)
      .then((response) => {
        const ret = response && response.data;
        if ($this && $this.isInvalidByAuth(response)) {
          return;
        }
        if (window.NProgress) {
          window.NProgress.done();
        }
        return ret;
      })
      .catch((error) => {
        console.log('post response catch', error);
        if (window.NProgress) {
          window.NProgress.done();
        }
        if ($this && $this.isInvalidByAuth(error)) {
          return;
        }
        notification.error(
          {
            message: t1('Load data error!...'),
            description: t1('we found a error that will make the process not completed. Please try again!...'),
          }
        )
      });
  }

  //Cancel request by token request
  actionCancel() {
    this.source && this.source.cancel('Operation canceled by the user.');
  }

  isInvalidByAuth(error) {
    const status = error && error.response && error.response.status;

    if (status === 401 || status === 403 || status === '401' || status === '403') {
      console.log(history.location.search);
      history.push(`/login?redirect=${history.location.pathname}${history.location.search}`);
      return true;
    }
    return false;
  }
}

export default new Request();
