import React from "react";
import './stylesheet.css';
import PropTypes from 'prop-types';
import ImageBackGround from "components/common/viewers/image-background";
import MenuPanel from "../menu-panel";

class SubPageHeader extends React.Component {

  render() {
    const {title, imgUrl} = this.props;
    return (
      <div className='ui-sub-page-header'>
        <ImageBackGround bgClassName='contact-img' imgClass='parallax' src={imgUrl} height={250}>
          <MenuPanel/>
          <h1>
            <span>
              {title}
            </span>
          </h1>
        </ImageBackGround>
      </div>
    );
  }
}

SubPageHeader.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
}

export default SubPageHeader;

