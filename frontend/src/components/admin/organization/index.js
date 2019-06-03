import React from 'react';
import TableSchema from './TableSchema';
import SearchSchema from './SearchSchema';
import {t1} from "../../../i18n";
import SearchFormList from "../../../schema-form/searching";

const node = 'organization';

class OrgList extends React.PureComponent {

  render() {

    return (
      <div>
        <SearchFormList
          {...this.props}
          searchButtonLabel={t1(`Search ${node}`)}
          node={node}
          searchSchema={SearchSchema}
          tableSchema={TableSchema}
        />

        {/*<XDocument*/}
        {/*node='organization'*/}
        {/*searchSchema={SearchSchema}*/}
        {/*searchTableSchema={TableSchema}*/}
        {/*nodeSchema={OrgSchema}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default OrgList;