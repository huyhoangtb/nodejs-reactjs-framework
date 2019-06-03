import actionCreator from "../action-creators";
import Store from 'store';
import endpoints from 'configs/endpoints';

export const options = {
  /**
   * endpoint
   */
  url: null,
  endpoint: null,

  /**
   *  onSummit(event, values)
   * The function that handle the dom event.
   * return true: the submit will be continues
   * return false: the summit will be cancel
   */
  onSummit: (event, values) => {
    return true;
  },

  /**
   *  beforeSummit(event, values)
   * The function that already call before summit function.
   * return data: that can be summit to server (include the values) or void
   */
  beforeSummit: (event, values) => {
    return {}
  },

  /**
   * onSuccess(setResult)
   *
   * the function that call when request setSuccess
   */
  onSuccess: (result, values) => {
  },

  /**
   * onFail(setResult)
   *
   * the function that call when request fail
   */
  onFail: (result, values) => {
  },

  /**
   * checkSuccessOnField: string
   *
   * sometime the setResult will return from server that don't have setSuccess field (if using the 3rd partner lib)
   */
  checkSuccessOnField: null,

  /**
   * dispatchFullResponse: boolean
   *
   * true: dispatch the full response that return from server.
   * default is fail: dispatch the full response.setResult
   */
  dispatchFullResponse: false,

  /**
   * dispatchAfterSuccess: (response.setResult) => {}
   *
   * the action creator that will becall after setSuccess
   */
  dispatchAfterSuccess: false,

  /**
   * method: summit method = postAsForm || get || post || more detail check all the method on common/network/http/Request
   */
  networkMethod: null,

  namespace: undefined
};

export default {
  submitForm: (event, form, options, node) => {
    event.preventDefault();
    let {
      url, endpoint, onSummit, beforeSummit, onSuccess, disableResponseMessage, onFail, nodeAction, documentData,
      checkSuccessOnField, dispatchFullResponse, dispatchAfterSuccess, attachedNodes, hiddenFields
    } = options;
    let method = options.method || options.networkMethod || 'post';
    let data = options.data || {};
    let formData = options.formData || documentData || {};
    let submitOptions = {
      disableResponseMessage,
      onSuccess, onFail, checkSuccessOnField,
      dispatchFullResponse, dispatchAfterSuccess,
      attachedNodes, nodeAction
    };

    form.validateFields((err, values) => {
      if (!err) {
        let submitData = values || {};
        submitData = {...hiddenFields, ...submitData, ...data, node, iid: formData.iid};
        if (beforeSummit) {
          const attachedData = beforeSummit(event, submitData) || {};
          submitData = {...attachedData, ...submitData};
        }

        let urlEndpoint = url || endpoint;
        if (!urlEndpoint) {
          if (nodeAction === 'create' && !formData.iid) {
            urlEndpoint = endpoints.node.create;
          } else if (nodeAction === 'update' || formData.iid) {
            urlEndpoint = endpoints.node.update;
          }
        }
        // call onSummit and return fail to not summit to the server
        const isSubmitToServer = onSummit ? onSummit(event, submitData) : true;

        if (isSubmitToServer) {
          Store.dispatch(actionCreator.handleSummitForm(urlEndpoint, method, submitData, submitOptions));
        }
      }
    });
  },

  submitOptions: options
}

