import React from "react";
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import './stylesheet.css';

class NewButton extends React.Component {

  handleOnClick = () => {
    const {onClick} = this.props.onClick;
    if(!onClick) {
      return;
    }
    onClick()
  }

  render() {

    return (
      <div className="ui-new-panel">
        <Icon onClick={this.handleOnClick} type="plus-circle" className="new-icon"/>
      </div>

    );
  }
}
NewButton.propsTypes = {
  onClick: PropTypes.func
};
NewButton.defaultProps = {
  onClick: (f)=>f
};
export default NewButton;
