import React from 'react';
import uuid from "uuid/v4";
import schema from './schema';
import FormGeneration from "schema-form/GenerateForm";
import {Steps} from 'antd';
import {t1} from "i18n";
import endpoints from "configs/endpoints";

const Step = Steps.Step;

class OrgSiteRegister extends React.Component {

  render() {
    const {onRegisterSuccess, processStep, currentStep, organization} = this.props;
    if (processStep !== currentStep) {
      return <span></span>
    }
    return (
      <div>
        <FormGeneration
          {...this.props}
          endpoint={endpoints.site.INIT_ORG}
          node='organization'
          nodeAction='create'
          onSuccess={onRegisterSuccess}
          hiddenFields={{
            isRoot: 1,
            ...organization
          }}
          submitLabel={t1('next step')}
          totalDisplay={2}
          formId={uuid()}
          schema={schema}
        />
      </div>
    );
  }
}

export default OrgSiteRegister;