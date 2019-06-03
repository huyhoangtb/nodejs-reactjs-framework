import React from 'react';
import uuid from "uuid/v4";
import schema from './schema';
import FormGeneration from "schema-form/GenerateForm";
import {Button, Steps} from 'antd';
import {t1} from "i18n";
import endpoints from "../../../../configs/endpoints";

const Step = Steps.Step;

class UserSiteRegister extends React.Component {

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
          nodeAction='create'
          endpoint={endpoints.site.INIT_USER}
          node='user'
          leftSummitBtn={<Button className='m-r-20' type="secondary" onClick={this.props.onGoBack}>{t1('back')}</Button>}
          hiddenFields={
            {
              orgIids: [organization.iid],
              orgRootIid: organization.iid
            }
          }
          onSuccess={onRegisterSuccess}
          submitLabel={t1('next step')}
          formId={uuid()}
          schema={schema}
        />
      </div>
    );
  }
}

export default UserSiteRegister;