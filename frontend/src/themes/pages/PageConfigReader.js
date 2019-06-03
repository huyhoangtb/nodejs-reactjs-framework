import React from 'react';
import PropTypes from 'prop-types';
import {t1} from 'i18n';

const getComponentByConfig = (code, configs) => {

  if (!configs || !configs[code]) {
    return () => <div>{t1('page not found')}</div>
  }
  return configs[code];
};

/**
 * Created by Peter Hoang Nguyen
 *
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class PageConfigReader extends React.Component {

  render() {
    const {themeId, pageCode, config} = this.props;



    const Component = getComponentByConfig(themeId || pageCode, config);

    return <Component {...this.props} themeId={themeId || pageCode}>
      {this.props.children}
    </Component>
      ;
  }
}

PageConfigReader.propTypes = {
  themeId: PropTypes.string,
  pageCode: PropTypes.string,
  config: PropTypes.object
}

export default PageConfigReader;
