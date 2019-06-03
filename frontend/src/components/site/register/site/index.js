import React from 'react';
import uuid from "uuid/v4";
import schema from './schema';
import {THEME} from "themes/pages/register";
import FormGeneration from "schema-form/GenerateForm";
import {Button, Steps} from 'antd';
import {t1} from "i18n";
import endpoints from "configs/endpoints";

const Step = Steps.Step;

class OrgSiteRegister extends React.Component {

  render() {
    const {onRegisterSuccess, processStep, currentStep} = this.props;
    const organization = this.props.organization || {};
    if (processStep !== currentStep) {
      return <span></span>
    }
    return (
      <div>
        <FormGeneration
          {...this.props}
          endpoint={endpoints.site.INIT_DOMAIN}
          node='domain'
          hiddenFields={{
            orgIid: organization.iid,
            orgRootIid: organization.iid,
            themeCode: THEME.ASTER
          }}
          leftSummitBtn={<Button className='m-r-20' type="secondary"
                                 onClick={this.props.onGoBack}>{t1('back to user step')}</Button>}
          onSuccess={onRegisterSuccess}
          submitLabel={t1('finish')}
          totalDisplay={2}
          formId={uuid()}
          schema={schema}
        />
      </div>
    );
  }
}

export default OrgSiteRegister;