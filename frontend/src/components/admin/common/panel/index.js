import React from 'react';
import './stylesheet.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class UIPanel extends React.Component {
  
  render() {
    const {className} = this.props;
    
    return (
      <div className={`${className || ''} ui-admin-panel`}>
        {this.props.children}
      </div>
    );
  }
}

export default UIPanel;
