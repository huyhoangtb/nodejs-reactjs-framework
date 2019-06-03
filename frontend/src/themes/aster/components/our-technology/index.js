import React from "react";
import {Divider} from 'antd';
import Item from './Item';
import {t1} from 'i18n';
import ReactjsIcon from 'themes/aster/assets/icon/Reactjs.png';
import MobileTech from 'themes/aster/assets/svg/mobile-tech.svg';
import php from 'themes/aster/assets/svg/php.svg';
import sass from 'themes/aster/assets/images/sass.png';
import less from 'themes/aster/assets/images/less-logo.png';
import angular2 from 'themes/aster/assets/images/angular2.png';
import mongodb from 'themes/aster/assets/images/mongodb.png';
import oracle from 'themes/aster/assets/images/oracle.png';
import mysql from 'themes/aster/assets/images/mysql.png';
import redis from 'themes/aster/assets/images/redis.png';
import db2 from 'themes/aster/assets/svg/db2.svg';
import vueLogo from 'themes/aster/assets/images/vue_logo.png';
import java from 'themes/aster/assets/images/java.png';
import nodejs from 'themes/aster/assets/images/nodejs.png';
import './stylesheet.css'

class OurGoal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui-aster-technology">

        <div className='ui-title-panel'>
          <h3>~ Technology ~</h3>
        </div>
        <p className='desc'>
          Our members have strong experience.
        </p>
        <p className='desc last'>
          Technology depend on what do you want to do on your project.
        </p>

        <div className='ui-tech-content'>
          <Divider>Front-end</Divider>
          <div className='tech-item-panel'>
            <div>
              <Item className='reactjs' icon={ReactjsIcon} name={t1('react')}/>
              <Item className='sass' icon={sass} name={t1('Sass')}/>
              <Item className='less' icon={less} name={t1('less')}/>
              <Item className='angular2' icon={angular2} name={t1('angular')}/>
              <Item className='vuejs' icon={vueLogo} name={t1('vuejs')}/>
              <Item className='mobile' icon={MobileTech} name={t1('mobile app')}/>
            </div>
          </div>

          <Divider>Server side technology</Divider>
          <div className='tech-item-panel'>
            <div>
              <Item className='nodejs' icon={nodejs} name={t1('Nodejs')}/>
              <Item className='php' icon={php} name={t1('Php')}/>
              <Item className='java' icon={java} name={t1('Java')}/>
            </div>
          </div>

          <Divider>Database - cachedb</Divider>
          <div className='tech-item-panel'>
            <div>
              <Item className='mongodb' icon={mongodb} name={t1('Mongodb')}/>
              <Item className='mysql' icon={mysql} name={t1('Mysql')}/>
              <Item className='oracle' icon={oracle} name={t1('Oracle')}/>
              <Item className='db2' icon={db2} name={t1('DB2')}/>
              <Item className='redis' icon={redis} name={t1('redis')}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurGoal;

