import React from "react";
import {connect} from 'react-redux';
import {t, t1, t3} from 'i18n';
import './stylesheet.css'
import {Link} from "react-router-dom";


class AsterFooter extends React.Component {

  render() {
    return (
      <div className='ui-aster-footer'>
        <div className="ui-aster-footer-content ui-aster-home-item">
          <div className='copyright ui-left'>
            {t('Best outsourcing company in Hanoi, Vietnam © 2019 - Aster software join stock company')}
          </div>
          <div className='ui-right'>
            <div className='ui-item'>
              <Link to='/outsourcing'><span>{t1('outsourcing')}</span></Link>
            </div>
            <div className='ui-item'>
              <Link to='/offshore'><span>{t1('offshore')}</span></Link>
            </div>
            <div className='ui-item'>
              <Link to='/consulting'><span>{t1('consulting')}</span></Link>
            </div>
            <div className='ui-item'>
              <Link to='/faq'><span>{t3('faq')}</span></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AsterFooter);

