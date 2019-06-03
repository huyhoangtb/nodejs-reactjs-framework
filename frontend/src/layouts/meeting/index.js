import React from "react";
import Layout from 'antd/lib/layout'
import LeftMenu from './menu';
import {connect} from 'react-redux';
import './stylesheet.css'

const {Header, Content, Footer,} = Layout;

class AsterLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {themeId, route} = this.props;

    return (
      <div className="ui-meeting-layout">
        <LeftMenu/>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(AsterLayout);

