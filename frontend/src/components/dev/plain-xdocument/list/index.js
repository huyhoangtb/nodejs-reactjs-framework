import React, {Component} from 'react';
import enpoints from 'configs/endpoints';
import SearchFormList from 'schema-form/searching';
import NewButton from 'schema-form/helper/new-button';
import OrgForm from '../form';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';
import actionCommon from "action-creators/common";
import {connect} from "react-redux";

class OrgList extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onDetailLoaded = (org) => {
    const {dispatch} = this.props;
    this.setState({formData: org});
    dispatch(actionCommon.setStatusOfFormView({viewId: 'default', display: true}));
  }

  render() {
    return (
      <div>
        <SearchFormList
          searchButtonLable='Search company'
          node='Organization'
          getRowDetailEndpoint={enpoints.organization.getOrg}
          searchSchema={SearchSchema}
          onLoadedRowDetail={this.onDetailLoaded}
          tableSchema={TableSchema}
        />
        <NewButton onClick={() => this.setState({formData: {}})}>
          <OrgForm formData={this.state.formData}/>
        </NewButton>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const viewId = props.viewId || 'default';

  return {
    status: state.common.showFormView[viewId]
  }
}
export default connect(mapStateToProps)(OrgList);