import Requester from "common/network/http/Request";
import {showResponseMessage} from "common";
import endpoints from "configs/endpoints";
export const requestNodeTypes = {
  FIND: 'FIND',
  GET_DETAIL: 'GET_DETAIL',
}


export const getUrlDependOnURLorNode = (url, node, type = requestNodeTypes.FIND) => {

  if (url) {
    return url;

  }

  if (type === requestNodeTypes.GET_DETAIL) {
    return endpoints.node.detail;
  }

  return endpoints.node.find;
};

export const  loadDetailDocumentByIid = async (urlDetail, node,onLoadedRowDetail, params = {}, onBeforeLoadRowDetail) => {
  const url = getUrlDependOnURLorNode(urlDetail, node, requestNodeTypes.GET_DETAIL);

  if(onBeforeLoadRowDetail) {
    onBeforeLoadRowDetail();
  }

  const responseData = await Requester.get(url, {...params, node});

  if (!responseData) {
    return;
  }
  if (onLoadedRowDetail && responseData._result) {
    onLoadedRowDetail(responseData._result);
  }
  showResponseMessage(responseData);
};
