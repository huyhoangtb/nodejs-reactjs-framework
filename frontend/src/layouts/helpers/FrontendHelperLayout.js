import React from 'react';
import PropTypes from 'prop-types';
import {t1} from 'i18n';

const getComponentByConfig = (themeId, configs) => {

  if (!configs || !configs[themeId]) {
    return <div>{t1('page not found')}</div>
  }
  return configs[themeId];
};

/**
 * Created by Peter Hoang Nguyen
 *
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class FrontendHelperLayout extends React.Component {

  render() {
    const {themeId, config} = this.props;
    const Component = getComponentByConfig(themeId, config);

    return (
      <Component themeId={themeId}/>
    )
  }
}

FrontendHelperLayout.propTypes = {
  themeId: PropTypes.string,
  config: PropTypes.array
}

export default FrontendHelperLayout;
