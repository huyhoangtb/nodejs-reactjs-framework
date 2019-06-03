import React from "react";
import PropTypes from 'prop-types';
import "./stylesheet.css";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class ImageBackGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const {width, height, src, className, children, bgClassName, imgClass} = this.props;
    return (
      <div className="ui-image-background" style={{width: `${width}px`, height: `${height}px`}}>
        <div className={`image-panel ${bgClassName}`}>
          {src && <img src={src} className={`${imgClass} fullscreen`} title="bg"/>}
        </div>
        <div className={`text-panel ${className}`} style={{width: `${width}px`, height: `${height}px`}}>
          {children}
        </div>
      </div>
    );
  }
}

ImageBackGround.propTypes = {
  bgClassName: PropTypes.string,
  className: PropTypes.string,
  imgClass: PropTypes.string,
  src: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default ImageBackGround;
