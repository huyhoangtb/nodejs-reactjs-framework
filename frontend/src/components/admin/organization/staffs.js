import React from 'react';
import TableSchema from './user/TableSchema';
import SearchSchema from './user/SearchSchema';
import {t1} from "../../../i18n";
import SearchFormList from "../../../schema-form/searching";
import detailMenuSchema from "./detail-menu-schema";
import PopupScreenMenu from "../../../schema-form/helper/overlay-helper/PopupScreenMenu";

const node = 'user';

class StaffOfOrgList extends React.Component {

  render() {
    const props = {...this.props};
delete props.iid
    return (
      <div>
        <PopupScreenMenu schema={detailMenuSchema(this)} namespace={this.props.popupScreenId}/>
        <SearchFormList
          {...props}
          searchButtonLabel={t1(`Search ${node}`)}
          node={node}
          searchSchema={SearchSchema}
          tableSchema={TableSchema}
          hiddenFields={{orgIids: this.props.iid}}
          attachedNodes={{
            orgIids: {
              node: 'organization',
              field: 'iid',
              name: 'organizations'
            },
            positionIids: {
              node: 'job_position',
              field: 'iid',
              name: 'positions'
            }
          }}
        />

      </div>
    );
  }
}

export default StaffOfOrgList;