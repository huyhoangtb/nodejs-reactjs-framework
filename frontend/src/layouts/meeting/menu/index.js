import React from "react";
import {connect} from 'react-redux';
import './stylesheet.css'

class MeetingMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {themeId, route} = this.props;

    return (
      <div className="ui-meeting-menu">
        <div className='ui-meeting-menu-content'>
          fadfads
        </div>
      </div>
    );
  }
}

export default connect()(MeetingMenu);

