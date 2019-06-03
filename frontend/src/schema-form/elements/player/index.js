import React from 'react';
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";

const ReactPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "schema-form/elements/richtext" */ 'react-player'),
  loading: Loading,
});


/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class SelectElement extends React.Component {


  render() {
    const props = {...this.props};
    delete props['options'];
    delete props['onDataEmpty'];
    return (
      <ReactPlayer {...props}/>
    );
  }
}

export default SelectElement;
