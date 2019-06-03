import {notification} from "antd";
import {t1} from "../i18n";
import endpoints from 'configs/endpoints';
import Requester from "./network/http/Request";

export const fetchData = async (url, params = {}, showMsgWhenFail = false) => {

  const responseData = await Requester.get(url, params,);

  if (!responseData) {
    return null;
  }

  const _responseType = responseData._responseType || 'info';

  if (responseData._result) {
    return responseData._result;
  }

  notification[_responseType]({
    message: _responseType,
    description: responseData._message || t1('data not found!..'),
  });

  return null;
};



export const showResponseMessage = (responseData) => {
  if (!responseData || !responseData._message) {
    return;
  }
  /**
   * if server return the message, we will alert to the end user
   */
  if (responseData._responseType && notification[responseData._responseType]) {
    notification[responseData._responseType]({
      message: responseData._responseType,
      description: responseData._message,
    });
    return;
  }

  notification.warning({
    message: t1('generate warning message!...'),
    description: responseData._message,
  });
}

export const fetchNode = async (node, params, nodeAction = 'find', returnDocumentsOnly = true,) => {
  const response = await Requester.get(endpoints.node.find, {...params, node}, {headers: {nodeAction: nodeAction}});
  if (!returnDocumentsOnly) {
    return response;
  }
  if (!response || !response._success || !response._result) {
    return [];
  }
  return response._result.documents || [];
}

/**
 *
 * @param node
 * @param params
 * @param nodeAction
 * @param returnDocumentsOnly
 * @returns {Promise<*>}
 */
export const updateNode = async (node, params, nodeAction = 'update', returnDocumentsOnly = true) => {
  const response = await Requester.post(endpoints.node.update, {...params, node});
  if (!returnDocumentsOnly) {
    return response;
  }
  if (!response || !response._success || !response._result) {
    return [];
  }
  return response._result.documents || [];

}

export const getParams = (props) => {
  const {match} = props;
  if (match && match.params) {
    return match.params;
  }
  return {};
};

export const getParamsFromSearchString = (searchString) => {
  const params = new URLSearchParams(searchString);
  if (params) {
    return params;
  }
  return {};
};

