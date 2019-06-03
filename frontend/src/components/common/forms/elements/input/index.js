import React from "react";
import "./stylesheet.css";

class Input extends React.Component {
  handleChange = (event) => {
    const {input, custom} = this.props;
    const {value} = this.state;
    
    if (input) {
      input.onChange(event.target.value, value);
    }
    this.setState({value: event.target.value});
  }
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const props = {...this.props};
    let {className} = props;
    const {input, meta, disable, custom} = props;
    delete props.input;
    delete props.meta;
    delete props.onFocus;
    delete props.onBlur;
    delete props.disable;
    
    const {activeClass} = this.state;
    className = className || '';
    className = `${className} ui-input ${activeClass}`;
    return (
      <input
        className={className}
        onChange={this.handleChange}
        {...input}
        {...custom}
        {...props}
      />
    );
  }
}

export default Input;
