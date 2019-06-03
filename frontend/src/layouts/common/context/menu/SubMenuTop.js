import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import layoutContextAction from '../actions/layout-context';

class SubMenuTopContext extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      schema,
      lastBreadcrumbName,
    } = this.props;

    dispatch(
      layoutContextAction.setSubMenuTop({
        schema,
        lastBreadcrumbName,
      }),
    );
  }

  componentWillUnmount() {
    this.props.dispatch(
      layoutContextAction.setSubMenuTop({
        schema: null,
        lastBreadcrumbName: null,
      }),
    );
  }

  render() {
    return null;
  }
}

SubMenuTopContext.propTypes = {
  dispatch: PropTypes.func,
  schema: PropTypes.arrayOf(PropTypes.any),
  lastBreadcrumbName: PropTypes.string,
  action: PropTypes.string,
  type: PropTypes.string,
};

SubMenuTopContext.defaultProps = {
  dispatch: (f) => f,
  schema: [],
  lastBreadcrumbName: '',
  action: '',
  type: '',
};

export default connect()(SubMenuTopContext);
