import React from "react";
import  PageConfigReader from './PageConfigReader';
import register from './register';
import connect from "react-redux/es/connect/connect";

class HelperComponent extends React.Component {

  render() {
    const theme = this.props.theme || {};
    const route = this.props.route || {};
    return (
      <PageConfigReader pageCode={theme.code} config={route.configRegister}>
        {this.props.children}
      </PageConfigReader>
    );
  }
}
const mapStateToProps = (state) => {
  const domain = state.domain || {};
  return {
    theme: domain.theme
  }
}
export default connect(mapStateToProps)(HelperComponent);
