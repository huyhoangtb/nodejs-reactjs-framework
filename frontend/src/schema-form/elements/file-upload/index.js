import React from 'react';
import {Upload} from 'antd';
import './stylesheet.css';
import {connect} from "react-redux";
import Endpoint from "../../../configs/endpoints";

const Dragger = Upload.Dragger;

class FileUpload extends React.Component {

  getComponentDefaultProps = () => {
    const {name, fileName, multiple, user, org, action, url, endpoint, onChange} = this.props;

    return {
      name: name || fileName || 'file',
      multiple,
      headers: {
        orgIid: (org && org.iid) || (user && user.orgIids && user.orgIids.length > 0 && user.orgIids[0]),
        orgRootIid: user && user.orgRootIid,
        userIid: user && user.iid
      },
      action: action || url || endpoint || Endpoint.file.upload,
      onChange(info) {
        if (onChange) onChange(info);
      }
    }
  }

  render() {
    const props = {...this.props};
    delete props.onChange;
    delete props.endpoint;
    delete props.url;
    delete props.org;
    delete props.user;
    delete props.fileName;

    return (
      <Dragger {...props} {...this.getComponentDefaultProps()}>

      </Dragger>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user || {},
    org: state.user.currentOrg || {}
  }
}

export default connect(mapStateToProps)(FileUpload);