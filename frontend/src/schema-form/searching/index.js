import React from 'react';
import {Table, notification} from 'antd';
import {showResponseMessage} from 'common';
import {
  getUrlDependOnURLorNode,
  loadDetailDocumentByIid
} from 'schema-form/common/XDocument';
import uuid from 'uuid/v4'
import Requester from 'common/network/http/Request';
import {t1} from 'i18n';
import FormGeneration from "../GenerateForm";
import PropTypes from "prop-types";
import {history} from "store";
import './stylesheet.css';
import Breadcrumb from "../../layouts/helpers/context/Breadcrumb";

// import ObjectId from 'bson-objectid';


class SearchingForm extends React.PureComponent {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    const {searchFormValues} = this.state;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...searchFormValues,
      ...filters,
    });
  }

  fetch = async (params = {}) => {
    this.setState({loading: true});
    const {searchUrl, searchEndpoint, node, attachedNodes, hiddenFields} = this.props;
    const url = getUrlDependOnURLorNode(searchUrl || searchEndpoint, node);
    if (node) {
      params = {...hiddenFields, ...params, node}
    }
    const response = await Requester.get(url, {
        pageSize: 10,
        ...params,
      },
      {
        headers: {
          attachedNodes: JSON.stringify(attachedNodes),
          nodeAction: 'find'
        }
      }
    );

    const pagination = {...this.state.pagination};
    const responseData = response && response._result ? response._result : {pagination: {}};

    pagination.total = responseData.pagination.total;
    this.setState({
      loading: false,
      data: responseData.documents,
      pagination,
    });
    showResponseMessage(response);
    //new ObjectId(Object.values(data._result[0]._id.id))
  }

  searchAction = (event, searchFormValues = {}) => {
    this.fetch({...searchFormValues});
    this.setState({searchFormValues})
    return false;
  }

  reSearch = () => {
    const {searchFormValues} = this.state;
    this.fetch({...searchFormValues});
  }

  loadRowByIid = async (params = {}) => {
    const {getRowDetailUrl, getRowDetailEndpoint, onLoadedRowDetail, node, onBeforeLoadRowDetail, nodeAction} = this.props;
    loadDetailDocumentByIid(getRowDetailUrl || getRowDetailEndpoint, node, onLoadedRowDetail, params, onBeforeLoadRowDetail);
    history.push(`${history.location.pathname}?documentIid=${params.iid}&nodeAction=${nodeAction || 'update'}`);
  }

  render() {
    const {
      formProps, disableDefaultBreadcrumb, hiddenFields, node, searchSchema, searchSchemaLayout, tableSchema, searchUrl, searchEndpoint, searchButtonLabel, attachedNodes
    } = this.props;

    return (
      <div className="ui-search-form-panel">
        {
          !disableDefaultBreadcrumb &&
          <Breadcrumb schema={[
            {
              name: t1(node || searchButtonLabel || 'search'),
              url: searchUrl || searchEndpoint,
              id: node
            }
          ]}/>
        }
        <div className="ui-search-form">
          <FormGeneration
            {...this.props}
            ref='searchForm'
            attachedNodes={attachedNodes}
            formProps={formProps}
            schema={searchSchema}
            hiddenFields={hiddenFields}
            url={searchUrl || searchEndpoint}
            schemaLayout={searchSchemaLayout}
            // onSuccess={onSearchSuccess}
            onSummit={this.searchAction}
            // onFail={onSearchFail}
            submitLabel={t1(searchButtonLabel || 'search')}/>
        </div>
        <div className='ui-search-result'>
          <Table
            columns={tableSchema(this)}
            rowKey={uuid()}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

SearchingForm.propTypes = {
  formProps: PropTypes.object,
  searchSchema: PropTypes.func,
  hiddenFields: PropTypes.object,
  disableDefaultBreadcrumb: PropTypes.bool,
  searchSchemaLayout: PropTypes.object,
  attachedNodes: PropTypes.object,
  tableSchema: PropTypes.func,
  url: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  node: PropTypes.string,
  endpoint: PropTypes.string,
  onSearchSuccess: PropTypes.func,
  onSearchFail: PropTypes.func,
};

SearchingForm.defaultProps = {
  formProps: {},
  attachedNodes: {},
  hiddenFields: {},
  searchSchema: () => {
  },
  searchSchemaLayout: {},
  tableSchema: () => {
  },
  url: '',
  disableDefaultBreadcrumb: false,
  searchButtonLabel: t1('search'),
  node: '',
  endpoint: '',
  onSearchSuccess: () => {
  },
  onSearchFail: () => {
  },
};


export default SearchingForm;