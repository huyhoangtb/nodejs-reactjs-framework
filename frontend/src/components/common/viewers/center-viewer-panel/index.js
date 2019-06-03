import React from "react";
import {connect} from "react-redux";
import {multiLanguage} from "i18n";
import "./stylesheet.css";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class CenterItemViewer extends React.Component {
  
  render() {
    const {width, height, disableHover} = this.props;
    const className = this.props.className || '';
    
    return (
      <div className={`center-viewer-panel ${className} ${disableHover ? '' : 'on-hover'}`} style={{width, height}}>
        {this.props.children}
      </div>
    );
  }
}

const mapPropsToState = (state) => (
  {}
);

export default connect(mapPropsToState)(multiLanguage(CenterItemViewer));
