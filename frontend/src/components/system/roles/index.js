import React from 'react';
import XDocument from '../../../schema-form/x-document';
import Endpoints from '../../../configs/endpoints';
import RoleSchema from './RoleSchema';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';

class UserDocument extends React.Component {

  render() {

    return (
      <div>
        <XDocument
          node='role'
          searchSchema={SearchSchema}
          searchTableSchema={TableSchema}
          nodeSchema={RoleSchema}
          // searchEndpoint={Endpoints.user.find}
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