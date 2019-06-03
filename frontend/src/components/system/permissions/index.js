import React from 'react';
import XDocument from '../../../schema-form/x-document';
import Endpoints from '../../../configs/endpoints';
import OrgSchema from './UserSchema';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';

class UserDocument extends React.Component {

  render() {

    return (
      <div>
        <XDocument
          node='permission'
          searchSchema={SearchSchema}
          searchTableSchema={TableSchema}
          nodeSchema={OrgSchema}
          // searchEndpoint={Endpoints.user.find}
          endpointCreateNode={Endpoints.user.create}
          hideNewButton={true}
          searchAttachedNodes={{
            orgIid: {
              node: 'organization',
              field: 'iid',
              name:'organization'
            },
            positionIids: {
              node: 'job_position',
              field: 'iid',
              name:'positions'
            }
          }}
        />
      </div>
    );
  }
}

export default UserDocument;