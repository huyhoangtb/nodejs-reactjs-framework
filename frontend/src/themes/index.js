import React from "react";
import PageConfigReader from './pages/PageConfigReader';
import {connect} from 'react-redux'
import themeActions from './actions';
import THEME, {ThemeRegister} from './pages/register';
import ThemesConfig from 'routes/pages';

class FrontendLayout extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(themeActions.setThemeDetail(ThemeRegister[THEME.ASTER]))
  }

  render() {
    const theme = this.props.theme || {};
    return (
      <PageConfigReader pageCode={theme.code} config={ThemesConfig}>
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

export default connect(mapStateToProps)(FrontendLayout);
