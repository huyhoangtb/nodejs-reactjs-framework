import React from "react";
import {Input} from 'antd';

import {formatMoney} from 'common';
import "./stylesheet.css";

class InputNumber extends React.Component {
  handleOnKeyDown = (e) => {
    
    const keyCodesAllow = [46, 8, 9, 27, 13, 110, 190, 188];
    
    if (keyCodesAllow.includes(e.keyCode) ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      //Allow numbers and numbers + shift key
      ((e.keyCode >= 48 && e.keyCode <= 57)) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      // let it happen, don't do anything
      return;
    }
// Ensure that it is a number and stop the keypress
    if ((!e.shiftKey && (e.keyCode < 48 || e.keyCode > 57)) || (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
  handleChange = (event) => {
    const {input, custom} = this.props;
    if (input) {
      input.onChange(event.target.value);
    }
  }
  handleOnBlue = () => {
    const {input} = this.props;
    if (input) {
      const value = this.makeSureHaveOnlyDot(input.value);
      input.onChange(value);
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  makeSureHaveOnlyDot(value) {
    if (!value) {
      return value;
    }
    
    const lastDot = value.lastIndexOf('.');
    if (lastDot === -1) {
      value = value.replace(/[^\d]/g, '');
      return formatMoney(value, 0, '.', ',');
    }
    let preNumber = value.substr(0, lastDot);
    if (lastDot === value.length) {
      preNumber = preNumber.replace(/[^\d]/g, '');
      return formatMoney(preNumber, 0, '.', ',');
    }
    let afterNumber = value.substr(lastDot + 1, value.length);
    if (!afterNumber) {
      preNumber = preNumber.replace(/[^\d]/g, '');
      return `${formatMoney(preNumber, 0, '.', ',')}.`;
    }
    preNumber = preNumber.replace(/[^\d]/g, '');
    afterNumber = afterNumber.replace(/[^\d]/g, '');
    
    return `${formatMoney(preNumber, 0, '.', ',')}.${afterNumber}`;
    
  }
  
  //
  // formatNumber (value) {
  //   if(!value) {
  //     return value;
  //   }
  //   const n = Number
  //   return value.toFixed(2).replace(/./g, function(c, i, a) {
  //     return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //   });
  // }
  
  
  render() {
    const {input} = this.props;
    return (
      <Input
        onKeyDown={this.handleOnKeyDown}
        onBlur={this.handleOnBlue}
        onChange={this.handleChange}
        {...this.props}
        value={input.value}
        errorText={this.props.meta.touched && this.props.meta.error ? this.props.meta.error : undefined}
      />
    );
  }
}

export default InputNumber;
