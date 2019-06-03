import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import layoutContextActions from "layouts/actions/layout-context";

class PopupScreenMenu extends React.PureComponent {

  componentDidMount() {

  const { dispatch, schema, namespace, active } = this.props;

    if(schema) {
      dispatch(layoutContextActions.setTopMenuPopupScreen({schema, active}, namespace));
    }

  }

  render() {
    return <span className='display-none'/>;
  }
}


PopupScreenMenu.propTypes = {
  namespace: PropTypes.string,
  active: PropTypes.string,
  schema: PropTypes.array,
};

export default connect()(PopupScreenMenu);
