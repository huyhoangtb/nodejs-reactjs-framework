import React from "react";
import {fetchData} from "common";
import {getNodeByIid} from 'common/Node';
import {Select} from 'antd';
import userActions from 'action-creators/user'
import Endpoint from 'configs/endpoints';
import connect from "react-redux/es/connect/connect";

class SelectOrg extends React.Component {


  componentDidMount = async () => {
    const {user, dispatch} = this.props;
    if (!user) {
      return;
    }
    const orgIids = user.orgIids
    const orgs = await fetchData(Endpoint.node.findByIids, {node: 'organization', iids: orgIids});
    const currentOrg = orgs && orgs.length > 0 ? orgs[0] : undefined;
    dispatch(userActions.setCurrentWorkingOrg(currentOrg));
  }

  changeOrg = (selectOrg) => {
    const {orgs, dispatch} = this.props;
    dispatch(userActions.setCurrentWorkingOrg(getNodeByIid(selectOrg.key, orgs)));
  }

  render() {
    const orgs = this.props.orgs || [];
    const defaultIid = orgs.length > 0 ? orgs[0].iid : undefined;

    const options = [];
    orgs.map(org => {
      options.push(<Select.Option key={org.iid} value={org.iid}>{org.name}</Select.Option>);
    });

    return (
      <div className="ui-select-org">
        <Select
          labelInValue
          defaultValue={{key: defaultIid}}
          style={{width: 120}}
          onChange={this.changeOrg}
        >
          {options}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user && state.user.user,
    orgs: state.user.orgs
  }
}

export default connect(mapStateToProps)(SelectOrg);

