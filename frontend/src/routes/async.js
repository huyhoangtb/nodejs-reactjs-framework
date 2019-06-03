import React from 'react';
import Loadable from 'react-loadable';
import commonAction from 'action-creators/common';
import styleConfigs from 'configs/style';
import {connect} from "react-redux";

const defaultLoadingProps = {
  type: 'bars',
  color: styleConfigs.PRIMARY_COLOR,
  height: 15,
  width: 45
};

class Loading extends React.Component {
  
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(commonAction.showLoadingPage(true));
  }
  
  componentWillUnmount() {
    const {dispatch} = this.props;
    setTimeout(() => {
      dispatch(commonAction.showLoadingPage(false))
    }, 0);
  }
  
  render() {
    return (<span></span>);
  }
}


export default (loader) => Loadable({
  loader: loader,
  loading: connect()(Loading),
})
