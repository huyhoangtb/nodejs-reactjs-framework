import React from 'react';
import {connect} from 'react-redux';
import layoutContextAction from './actions/layout-context';
import PropTypes from "prop-types";

class MenuTopContext extends React.Component {
  componentWillMount() {
    const {dispatch, schema, namespace} = this.props;
    if (schema) {
      dispatch(layoutContextAction.setMenuTop(schema, namespace));
    }
  }

  render() {
    return <span className='display-none'/>;
  }
}

MenuTopContext.propTypes = {
  namespace: PropTypes.string,
  schema: PropTypes.array,
};

export default connect()(MenuTopContext);