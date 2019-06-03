import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import layoutContextAction from '../actions/layout-context';

class SubMenuLeftContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      dispatch,
      schema,
    } = this.props;

    dispatch(
      layoutContextAction.setSubMenuLeft({
        schema,
      }),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.node, nextProps.node)) {
      const { dispatch, schema, switchControls, messages } = nextProps;

      dispatch(
        layoutContextAction.setSubMenuLeft({
          schema,
        }),
      );
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(
      layoutContextAction.setSubMenuLeft({
        schema: null,
      }),
    );
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  layoutContext: state.layoutContext,
});

SubMenuLeftContext.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.any),
  layoutContext: PropTypes.shape(),
};

SubMenuLeftContext.defaultProps = {
  dispatch: (f) => f,
  schema: [],
  layoutContext: {},
};

export default connect(mapStateToProps)(SubMenuLeftContext);
