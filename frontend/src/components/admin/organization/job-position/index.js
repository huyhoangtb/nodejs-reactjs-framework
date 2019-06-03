import React from 'react';
import XDocument from 'schema-form/x-document';
import Endpoints from 'configs/endpoints';
import JobPositionSchema from './JobPositionSchema';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';

class UserDocument extends React.Component {

  render() {

    return (
      <div>
        <XDocument
          node='job_position'
          searchSchema={SearchSchema}
          searchTableSchema={TableSchema}
          nodeSchema={JobPositionSchema}
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