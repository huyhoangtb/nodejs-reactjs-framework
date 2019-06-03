import React from "react";
import "./stylesheet.css";
import Loading from "../loading";
import ImgStatus from '../img-status';

/**
 * Created by Ha Viet Duc
 * created date 22/04/2017
 **/
class ViewImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleLoadImageError = this.handleLoadImageError.bind(this);
  }
  
  handleImageLoaded(event) {
    this.setState({loading: false});
  }
  
  handleLoadImageError(event) {
    this.setState({loading: true});
  }
  
  render() {
    const {loading} = this.state;
    const {alt, src, width, height, onContextMenu, onMouseDown, status, onClick} = this.props;
    let {className, borderColor} = this.props;
    borderColor = borderColor || '#eb7374';
    let style = {width: '100%', height: `${height}px`};
    if (className === 'highlight') {
      style = {...style, boxShadow: `0 0 0 3px ${borderColor}`}
    } else if (className === 'small-highlight') {
      style = {...style, boxShadow: `0 0 0 1.8px ${borderColor}`}
    }
    className = className ? `${className} ui-view-image` : 'ui-view-image';
    const displayStyle = {fontSize: `${height}px`};
    return (
      <div className={className} onClick={onClick} onMouseDown={onMouseDown} onContextMenu={onContextMenu}
           style={style}>
        <ImgStatus status={status}/>
        <img
          draggable={false}
          style={loading ? {display: 'none'} : displayStyle}
          alt={alt}
          src={src}
          onError={this.handleLoadImageError}
          onLoad={this.handleImageLoaded}
        />
        {loading &&
        <Loading/>
        }
      </div>
    );
  }
}

export default ViewImage;
