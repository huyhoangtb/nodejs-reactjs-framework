import React from 'react';
import ReCaptcha from 'react-google-recaptcha';
import './stylesheet.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class Recaptcha extends React.Component {
  clearData = () => {
    const {input, onChange} = this.props;
    const oldValue = this.state.value;
    
    if (input) {
      input.onChange(undefined, oldValue);
    }
    if (onChange) {
      onChange(undefined, oldValue);
    }
    this.setState({value: undefined});
  }
  onRecaptchaChange = (value) => {
    const {onChange} = this.props;
    const oldValue = this.state.value;
    
    if (onChange) {
      onChange(value, oldValue);
    }
    this.setState({value});
  }
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    let errors;
    const {getFieldError, name} = this.props.form;
    
    return (
      <div className="ui-recaptcha">
        <ReCaptcha
          onExpired={this.clearData}
          sitekey="6LeS4z0UAAAAAOZa3rOsJ8Ghgg3P5IFtdp1l_wxN"
          onChange={this.onRecaptchaChange}
        />
      </div>
    );
  }
}


export default Recaptcha;
