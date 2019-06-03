import React from 'react';
import {copyTextToClipboardWithoutFormating} from "common";
import './stylesheet.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class DescItem extends React.Component {
  onCopy = () => {
    const {value, copedTitle, title} = this.props;
    this.setState({notify: copedTitle || 'coped'});
    clearTimeout(this.state.timeOutId);
    this.state.timeOutId = setTimeout(() => {
      this.setState({notify: title});
    }, 3000);
    
    copyTextToClipboardWithoutFormating(value);
  };
  
  constructor(props) {
    super(props);
    this.state = {timeOutId: undefined};
  }
  
  render() {
    const {value, copedTitle, title, isBox} = this.props;
    return (
      <i className={`copy-icon mi mi-content-copy copy-button ${isBox ? 'is-box' : ''}`}
         title={this.state.notify || title} onClick={this.onCopy}/>
    );
  }
}


export default DescItem;
