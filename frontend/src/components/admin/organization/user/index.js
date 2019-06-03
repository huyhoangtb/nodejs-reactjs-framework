import React from 'react';
import XDocument from 'schema-form/x-document';
import Endpoints from 'configs/endpoints';
import OrgSchema from './UserSchema';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';
class UserDocument extends React.Component {

  render() {
    const {route} = this.props;
    return (
      <div>
        <XDocument
          node='user'
          searchSchema={SearchSchema}
          searchTableSchema={TableSchema}
          nodeSchema={OrgSchema}
          // searchEndpoint={Endpoints.user.find}
          endpointCreateNode={Endpoints.user.create}
          searchAttachedNodes={{
            orgIids: {
              node: 'organization',
              field: 'iid',
              name:'organizations'
            },
            positionIids: {
              node: 'job_position',
              field: 'iid',
              name:'positions'
            }
          }}
        >
        </XDocument>
      </div>
    );
  }
}

export default UserDocument;