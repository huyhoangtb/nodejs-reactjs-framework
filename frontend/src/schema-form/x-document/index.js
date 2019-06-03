import React from 'react';
import endpoints from 'configs/endpoints';
import {getParams, getParamsFromSearchString} from 'common'
import SearchFormList from 'schema-form/searching';
import OverlayHelper from 'schema-form/helper/overlay-helper';
import {matchRoutes, renderRoutes} from "react-router-config";
import uuid from 'uuid/v4';
import FormGeneration from 'schema-form/GenerateForm';
import actionCommon from "action-creators/common";
import {connect} from "react-redux";
import {t1} from 'i18n';
import PropTypes from "prop-types";
import {loadDetailDocumentByIid} from "../common/XDocument";
import {history} from "../../store";

class XDocument extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const detailInitParams = getParamsFromSearchString(history.location.search);
    const documentIid = detailInitParams.get('documentIid');
    const nodeAction = detailInitParams.get('nodeAction');
    if (documentIid) {
      delete detailInitParams.documentIid;
      detailInitParams.iid = documentIid;
      this.loadRowByIid(detailInitParams);
    } else if (nodeAction === 'create') {
      history.push(`${history.location.pathname}?nodeAction=create`);
      this.setState({nodeAction: 'create'})
      dispatch(actionCommon.setStatusOfFormView({viewId: 'XDocument', display: true}));
    }

  }

  loadRowByIid = async (detailInitParams) => {
    const {getRowDetailUrl, getRowDetailEndpoint, node, onBeforeLoadRowDetail} = this.props;
    loadDetailDocumentByIid(getRowDetailUrl || getRowDetailEndpoint, node, this.onDetailLoaded, detailInitParams, onBeforeLoadRowDetail);
  }

  onDetailLoaded = (document) => {
    const {dispatch} = this.props;
    this.setState({documentData: document, nodeAction: 'update'});
    dispatch(actionCommon.setStatusOfFormView({viewId: 'XDocument', display: true}));
  }

  activeCreateDocumentMode = () => {
    this.setState({documentData: {}, nodeAction: 'create'});
    history.push(`${history.location.pathname}?nodeAction=create`);
  }

  onBeforeLoadDocumentDetail = () => {
    this.setState({documentData: {}});
  }

  /**
   * return the url depend on nodeAction
   */
  getDocumentFormEndpoint = () => {
    const {endpointCreateNode, endpointUpdateNode, node} = this.props;
    const {nodeAction} = this.state;

    if (nodeAction === 'create') {
      return endpointCreateNode ? endpointCreateNode : endpoints.node.create;
    }
    return endpointUpdateNode ? endpointUpdateNode : endpoints.node.update;

  }

  getDocumentFormLabel = () => {
    const {createNodeLabel, updateNodeLabel, node} = this.props;
    const {nodeAction} = this.state;

    if (nodeAction === 'create' && createNodeLabel) {
      return createNodeLabel;
    }

    if (nodeAction === 'update' && updateNodeLabel) {
      return updateNodeLabel;
    }

    if (node) {
      if (nodeAction === 'create') {
        return t1(`create ${node}`);
      }
      return t1(`update ${node}`);
    }

    if (nodeAction === 'create') {
      return 'create';
    }
    return 'update';

  }

  getPopupTitle = () => {
    const {popupTitle, node} = this.props;
    const {nodeAction} = this.state;

    if (popupTitle) {
      return popupTitle;
    }

    if (!node) {
      return t1(`create new data`);
    }

    if (node) {
      if (nodeAction === 'create') {
        return t1(`create new ${node}`);
      }
      return t1(`update ${node}`);
    }
    if (nodeAction === 'create') {
      return t1(`create new data`);
    }
    return t1(`update data`);
  }

  getOnSuccessMethod = (values) => {
    const {nodeAction} = this.state;
    const {onNodeCreateSuccess, onNodeUpdateSuccess} = this.props;
    const method = nodeAction === 'create' ? onNodeCreateSuccess : onNodeUpdateSuccess;
    if (method) {
      method(values);
    }
    if (this.searchFormPanel && this.searchFormPanel.reSearch) {
      this.searchFormPanel.reSearch();
    }
    if(values && values.iid) {
      this.onDetailLoaded(values);
      history.push(`${history.location.pathname}?documentIid=${values.iid}&nodeAction=update`);
    }

  }

  render() {
    const {node} = this.props;
    const {searchButtonLabel, searchSchema,searchAttachedNodes, searchUrl, searchEndpoint, searchFormProps, searchSchemaLayout, searchTableSchema, getRowDetailEndpoint} = this.props;
    const {nodeFormProps, nodeSchema, nodeFormLayout, createNodeLabel, updateNodeLabel} = this.props;
    const {onNodeCreateSuccess, hideNewButton, onNodeCreateFail, onNodeUpdateSuccess, onNodeUpdateFail, dispatchAfterNodeCreateOrUpdateSuccess} = this.props;
    const defaultFormProps = {
      layout: "vertical"
    }
    const {route} = this.props;
    const {nodeAction} = this.state;
    const documentData = this.state.documentData || {};
    const nodeActionEndpoint = this.getDocumentFormEndpoint();
    return (
      <div>
        <SearchFormList
          ref={searchFormPanel => {
            this.searchFormPanel = searchFormPanel
          }}
          nodeAction={nodeAction}
          {...this.props}
          searchButtonLabel={searchButtonLabel || t1(`Search ${node}`)}
          node={node}
          attachedNodes={searchAttachedNodes}
          endpoint={searchEndpoint}
          url={searchUrl}
          formProps={searchFormProps}
          searchSchemaLayout={searchSchemaLayout}
          getRowDetailEndpoint={getRowDetailEndpoint}
          searchSchema={searchSchema}
          onLoadedRowDetail={this.onDetailLoaded}
          onBeforeLoadRowDetail={this.onBeforeLoadDocumentDetail}
          tableSchema={searchTableSchema}
        />

        <OverlayHelper viewId='XDocument' hideNewButton={hideNewButton} title={this.getPopupTitle()} nodeAction={nodeAction} onClick={this.activeCreateDocumentMode}>

          <FormGeneration node={node}
                          {...this.props}
                          nodeAction={nodeAction}
                          formId={uuid()}
                          schemaLayout={nodeFormLayout}
                          formProps={nodeFormProps || defaultFormProps}
                          formData={{...documentData}}
                          schema={nodeSchema}
                          onSuccess={this.getOnSuccessMethod}
                          onFail={nodeAction === 'create' ? onNodeCreateFail : onNodeUpdateFail}
                          submitLabel={this.getDocumentFormLabel()}
                          dispatchAfterSuccess={dispatchAfterNodeCreateOrUpdateSuccess}
                          endpoint={nodeActionEndpoint}
          />
        </OverlayHelper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const viewId = props.viewId || 'XDocument';

  return {
    status: state.common.showFormView[viewId]
  }
}

XDocument.propTypes = {
  searchButtonLabel: PropTypes.string,
  searchEndpoint: PropTypes.string,
  searchUrl: PropTypes.string,
  searchSchema: PropTypes.func,
  searchSchemaLayout: PropTypes.object,
  searchFormProps: PropTypes.object,
  searchTableSchema: PropTypes.func,
  onSearchSuccess: PropTypes.func,
  onSearchFail: PropTypes.func,
  popupTitle: PropTypes.string,
  node: PropTypes.string,
  nodeSchema: PropTypes.func,
  onNodeCreateSuccess: PropTypes.func,
  onNodeCreateFail: PropTypes.func,
  onNodeUpdateSuccess: PropTypes.func,
  dispatchAfterNodeCreateOrUpdateSuccess: PropTypes.func,
  onNodeUpdateFail: PropTypes.func,
  nodeFormLayout: PropTypes.object,
  hideNewButton: PropTypes.bool,
  nodeFormProps: PropTypes.object,
  createNodeLabel: PropTypes.string,
  updateNodeLabel: PropTypes.string,
  endpointCreateNode: PropTypes.string,
  getRowDetailEndpoint: PropTypes.string,
  endpointUpdateNode: PropTypes.string,
  searchAttachedNodes: PropTypes.object
};

export default connect(mapStateToProps)(XDocument);