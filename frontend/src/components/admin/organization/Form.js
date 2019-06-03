import React from 'react';
import OrgSchema from './OrgSchema';
import uuid from "uuid/v4";
import detailMenuSchema from './detail-menu-schema';
import FormGeneration from "schema-form/GenerateForm";
import PopupScreenMenu from "schema-form/helper/overlay-helper/PopupScreenMenu";
import connect from "react-redux/es/connect/connect";
import {t1} from "../../../i18n";
import {fetchNode} from "../../../common";

const node = 'organization';

class OrgForm extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetchNode(node, )
  }

  render() {
    const {popupScreenId, history, documentData} = this.props;
    return (
      <div>
        <PopupScreenMenu schema={detailMenuSchema(this)} namespace={popupScreenId}/>
        <FormGeneration
          {...this.props}
          node={node}
          onSuccess={(org) => {
            if (org.iid) {
              history.push(`/admin/organization/${org.iid}`);
            }
          }}
          nodeAction='create'
          submitLabel={(documentData && documentData.iid) ? t1('update organization') : t1('create organization')}
          formId={uuid()}
          schema={OrgSchema}
        />
      </div>
    );
  }
}

export default connect()(OrgForm);