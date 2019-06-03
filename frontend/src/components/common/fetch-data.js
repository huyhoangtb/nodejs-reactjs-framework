import React from 'react';
import Requester from "../../common/network/http/Request";

const LoadData = (config) => (Component) => {

  const {params, node, url, endpoint, onSuccess, onFail, setName} = config;

  class Wrapped extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const data = this.fetch();
      if (setName) {
        this.setState({[setName]: data});
      } else if (node) {
        this.setState({[setName]: data});
      } else {
        this.setState({'dataAutoFetch': data});
      }
    }

    fetch = async () => {
      const responseData = await Requester.get(endpoint || url, {...params, node});

      if (!responseData) {
        return;
      }
      if (onSuccess && responseData._success) {
        onSuccess(responseData._result);
        return responseData._result;
      }
      if (onFail && !responseData._success) {
        onFail(responseData);
        return responseData._result;
      }
    }

    render() {
      <Component {...config} {...this.state}/>
    }
  }

  return Wrapped
}