import React, {Component} from "react";
import './stylesheet.css';

class Item extends Component {

  render() {
    const {data, hasChildren} = this.props;

    return (
      <div className='ui-item' {...this.props}>
        <div className={`${hasChildren ? 'ui-item-header' : ''}`}>{data.name}</div>
      </div>
    );
  }
}


export default Item;