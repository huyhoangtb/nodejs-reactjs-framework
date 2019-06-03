import React from "react";
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Breadcrumb from 'antd/lib/breadcrumb';
import {connect} from 'react-redux';
import layoutContextAction from '../actions/layout-context';
import AdminTopMenu from './top-menu';
import AdminLeftMenu from './menu-left';
import AdminSubMenuLeft from './sub-menu-left';
import './stylesheet.css'
import {t1} from "../../i18n";

const {Header, Content, Footer, Sider} = Layout;

class AdminLayout extends React.Component {

  switchStateOfLeftMenu = () => {
    const {layoutContext, dispatch} = this.props;
    dispatch(layoutContextAction.setStateOfLeftMenu(!layoutContext.isOpenLeftMenu))
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const {layoutContext} = this.props;
    const defaultBreadcrumb = layoutContext.breadcrumb && layoutContext.breadcrumb.default && layoutContext.breadcrumb.default.schema || [];
    return (
      <Layout className="ui-admin-layout">
        <AdminTopMenu/>
        <Layout>
          <AdminLeftMenu/>
          <Layout>
            {/*<AdminTopMenu/>*/}
            <Header className="content-header">
              <div className="header-left">
                <div className="flex-center header-collapsed-icon" onClick={this.switchStateOfLeftMenu}>
                  <Icon
                    className="trigger"
                    type={layoutContext.isOpenLeftMenu ? 'menu-fold' : 'menu-unfold'}
                    onClick={this.toggle}
                  />
                </div>

                <Breadcrumb>
                  <Breadcrumb.Item href='/admin'>{t1('admin')}</Breadcrumb.Item>
                  {
                    defaultBreadcrumb && defaultBreadcrumb.map(breadcrumb => {
                      return <Breadcrumb.Item
                        key={`${breadcrumb.url || breadcrumb.endpoint}.${breadcrumb.id}`}
                        href={breadcrumb.url || breadcrumb.endpoint}>{breadcrumb.name || breadcrumb.label}</Breadcrumb.Item>
                    })

                  }
                </Breadcrumb>
              </div>
              <div className="header-right">
                {/*<LoginedUser/>*/}
              </div>
            </Header>

            <Content className="content-box">
              <div className="ui-main-content-panel">
                <div className="ui-sub-menu ">
                  {/*<AdminSubMenuLeft/>*/}
                </div>
                <div className="content-box-panel">
                  {this.props.children}
                </div>
              </div>

            </Content>
          </Layout>

        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layoutContext: state.layoutContext
  }
}


export default connect(mapStateToProps)(AdminLayout);

