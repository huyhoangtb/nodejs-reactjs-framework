import React from 'react';
import {Form,} from 'antd';
import {Select} from 'antd';
import uuidv4 from 'uuid/v4';

const getLabel = (options, item) => {
  if (!item) {
    return undefined;
  }
  const label = options && options.label ? options.label : 'name';
  if (typeof label === "function") {
    return label(item);
  }
  return item[label];
};

const getValue = (options, item) => {
  if (!item) {
    return undefined;
  }
  const value = options && options.value ? options.value : 'iid';
  if (typeof value === "function") {
    return value(item);
  }
  return item[value];
}

const mergeDataRejectSameValue = (items1, items2, options) => {
  items1 = items1 || [];
  items2 = items2 || [];
  const result = {};
  items1.map(item1 => {
    const value1 = getValue(options, item1);
    result[value1] = item1;
  });
  items2.map(item2 => {
    const value2 = getValue(options, item2);
    result[value2] = item2;
  });
  return Object.values(result);
}


/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class SelectElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {optionsData: []};
  }

  /**
   * Support for onSearch that will return the data that will be set to state
   *
   * @param input
   */
  onSearch = async (input) => {
    const {onSearch} = this.props;
    if (!onSearch) {
      return;
    }
    this.setState({optionsData: await onSearch(input, this.props.value)});
  }

  getSelectOptions = () => {
    let options = this.props.options || {};
    let optionsData = this.state.optionsData || [];

    if (!options.data && optionsData.length === 0) {
      return;
    }
    optionsData = mergeDataRejectSameValue(optionsData, options.data, options);
    const result = [];
    optionsData.map((item, index) => {
      result.push(<Select.Option key={uuidv4()}
                                 value={getValue(options, item)}>{getLabel(options, item)}</Select.Option>);
    });

    return result;
  }

  render() {
    const props = {...this.props};
    delete props['options'];
    delete props['onDataEmpty'];
    return (
      <Select {...props} onSearch={this.onSearch}>
        {this.getSelectOptions()}
      </Select>
    );
  }
}

export default SelectElement;
