import React from 'react';
import { connect } from 'react-redux';
import layoutContextAction from '../../actions/layout-context';
import PropTypes from "prop-types";

class Breadcrumb extends React.Component {
  componentWillMount() {
    const { dispatch, schema, namespace } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setBreadCrumb({schema}, namespace));
    }
  }

  render() {
    return <span className='display-none'/>;
  }
}


Breadcrumb.propTypes = {
  namespace: PropTypes.string,
  schema: PropTypes.array,
};

export default connect()(Breadcrumb);
