import React from "react";
import PropTypes from 'prop-types';
import './stylesheet.css'

class TechItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {className, panelClassName, icon, name} = this.props;
    return (
      <div className={`${panelClassName} ptech-item`}>
        <div className={`sub_${className}`}>
        <div className={`tech-item ${className}`}>
          <img src={icon}/>
        </div>
        </div>
        <div className={`${className } name`}>{name}</div>
      </div>
    );
  }
}

TechItem.propTypes = {
  className: PropTypes.string,
  panelClassName: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string,
}

export default TechItem;

