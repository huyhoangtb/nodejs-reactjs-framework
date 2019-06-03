import React from 'react';
import {Steps} from 'antd';
import Requester from "common/network/http/Request";
import OrgRegisterForm from './org';
import UserRegisterForm from './user';
import SetupSiteForm from './site';
import endpoints from "configs/endpoints";
import connect from "react-redux/es/connect/connect";
import {t1} from "i18n";
import {getParams, fetchData} from "common";
import './stylesheet.css';

const Step = Steps.Step;
const URL = {};

const STEP = {
  REGISTER_ORG: 1,
  REGISTER_USER: 2,
  SETUP_SITE: 3,
}

class RegisterSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const params = getParams(this.props);

    const nextPropsParams = getParams(nextProps);
    if (params.step !== nextPropsParams.step) {
      this.setState({currentStep: parseInt(nextPropsParams.step || STEP.REGISTER_ORG)});
      // this.fetchSiteInfo(nextProps);
    }
  }

  componentDidMount() {
    this.fetchSiteInfo();
    const params = getParams(this.props);
    this.setState({currentStep: parseInt(params.step || STEP.REGISTER_ORG)})
  }

  clearDataAndReturnInitStep = () => {
    const {history} = this.props;
    this.setState({organization: undefined, user: undefined});
    history.push(`/site/init`);
  }

  fetchSiteInfo = async (props) => {
    let {orgId} = getParams(props || this.props);
    if (!orgId) {
      return this.clearDataAndReturnInitStep();
    }
    await this.loadOrgInfoOfSite(orgId);
  }

  loadOrgInfoOfSite = async (orgId) => {
    let {organization, user} = this.state;

    if (!orgId) {
      this.clearDataAndReturnInitStep();
      return {organization: null, user: null};
    }

    if (organization) {
      return {organization, user};
    }

    organization = await fetchData(endpoints.site.DETAIL, {id: orgId, node: 'organization'});


    if (organization === null) {
      this.clearDataAndReturnInitStep();
      return {organization: null, user: null};
    }

    if (organization && organization.isRoot !== 1) {
      this.clearDataAndReturnInitStep();
      return {organization: null, user: null};
    }

    if (organization.ownerIid) {
      user = await fetchData(endpoints.site.DETAIL, {iid: organization.ownerIid, node: 'user'});
    }

    this.setState({organization, user});
    return {organization, user};
  }

  onRegisterOrgSuccess = async (result) => {
    const {history} = this.props;
    let organization = this.state.organization;
    if (result.nModified) {
      const responseData = await Requester.get(endpoints.node.detail, {iid: organization.iid, node: 'organization'});
      this.setState({organization: responseData && responseData._result});
    } else {
      this.setState({organization: result});
      organization = result;
    }
    history.push(`/site/init/${STEP.REGISTER_USER}/${organization._id}/user`);
  }

  gotoOrgStep = () => {
    const {history} = this.props;
    let organization = this.state.organization || {};
    history.push(`/site/init/${STEP.REGISTER_ORG}/${organization._id}`);
  }
  gotoUserStep = () => {
    const {history} = this.props;
    let organization = this.state.organization || {};
    history.push(`/site/init/${STEP.REGISTER_USER}/${organization._id}/user`);
  }

  onRegisterUserSuccess = async (result) => {
    const {history} = this.props;
    const {domain} = this.state;
    let user = this.state.user || {};
    let organization = this.state.organization || {};
    if (result.nModified) {
      const responseData = await Requester.get(endpoints.node.detail, {iid: user.iid, node: 'user'});
      this.setState({user: responseData && responseData._result});
    } else {
      this.setState({user: result});
      user = result;
    }
    history.push(`/site/init/${STEP.SETUP_SITE}/${organization._id}/domain`);
  }

  onRegisterDomainSuccess = (domain) => {
    const {history, SAAS_DOMAIN} = this.props;
    if (!domain) {
      history.push('/');
      return;
    }
    if(domain.saasDomains && domain.saasDomains.length > 0) {
      window.location = `http://${domain.saasDomains[0]}.${SAAS_DOMAIN}`;
      return;
    }
    if(domain.domains && domain.domains.length > 0) {
      window.location = `http://${domain.domains[0]}.${SAAS_DOMAIN}`;
      return;
    }
  }

  render() {
    const {history, documentData, org} = this.props;
    const {organization, user, domain} = this.state;
    return (
      <div className='ui-register-domain-layout'>
        <Steps current={this.state.currentStep - 1}>
          <Step title={t1(`Register the orgnization`)} description={t1('Setup orgnization info')}/>
          <Step title={t1('Register admin')} description={t1("You need the account to access to your site")}/>
          <Step title={t1("Register Domains")} description={t1("You can choose a domain of your site.")}/>
        </Steps>,
        <OrgRegisterForm
          documentData={this.state.organization}
          organization={organization}
          user={user}
          domain={domain}
          processStep={STEP.REGISTER_ORG}
          currentStep={this.state.currentStep}
          onRegisterSuccess={this.onRegisterOrgSuccess}/>
        <UserRegisterForm
          documentData={this.state.user}
          organization={organization}
          onGoBack={this.gotoOrgStep}
          user={user}
          domain={domain}
          processStep={STEP.REGISTER_USER}
          currentStep={this.state.currentStep}
          onRegisterSuccess={this.onRegisterUserSuccess}/>
        <SetupSiteForm
          organization={organization}
          user={user}
          SAAS_DOMAIN={this.props.SAAS_DOMAIN}
          domain={domain}
          onGoBack={this.gotoUserStep}
          documentData={domain}
          processStep={STEP.SETUP_SITE}
          currentStep={this.state.currentStep}
          onRegisterSuccess={this.onRegisterDomainSuccess}/>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    SAAS_DOMAIN: state.context.SAAS_DOMAIN
  }
}

export default connect(mapStateToProps)(RegisterSite);