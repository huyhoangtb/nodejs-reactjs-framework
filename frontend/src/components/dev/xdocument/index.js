import React from 'react';
import XDocument from 'schema-form/x-document';
import OrgSchema from './OrgSchema';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';
import {connect} from "react-redux";

class Xdocument extends React.Component {

  render() {

    return (
      <div>
        <XDocument
          node='Organization'
          searchSchema={SearchSchema}
          searchTableSchema={TableSchema}
          nodeSchema={OrgSchema}
        />
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
export default connect(mapStateToProps)(Xdocument);