
export default {
  emailValidator: (rule, value, callback, $formProps) => {
    if (!value) {
      callback();
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      callback('Email address is invalid');
    } else {
      callback();
    }
  },
  passwordValidator: (rule, value, callback, $formProps) => {
    if (!value) {
      callback();
      return;
    }
    if (value.length < 3) {
      callback('Password must be at least 6 characters ');
    } else {
      callback();
    }
  },
  rePasswordValidator: (rule, value, callback, $formProps) => {
    if (!value) {
      callback();
      return;
    }
    if (value.length < 3) {
      callback('re-password must be at least 6 characters ');
    } else if (value !== $formProps.form.getFieldValue('password')) {
      callback('Passwords and re-password must be inconsistent!');
    } else {
      callback();
    }
  },
  minTotalCurrencyInOrderValidator: (rule, value, callback, $formProps) => {
    if (!value) {
      callback();
      return;
    }
    try {
      if (parseInt(value) < 0) {
        callback(`Số lượng mua không hợp lệ.`);
        return;
      }
    } catch (ex) {
      
    }
    const order = $formProps.order;
    if (!order) {
      callback();
      return;
    }
    
    const currencyTotal = order.currencyTotal || 0;
    let minTotal = $formProps.order.minTotal || 0;
    const feeRate = order.feeRate || 0;
    
    const maxOfTotal = currencyTotal - currencyTotal * feeRate / 100;
    
    if (maxOfTotal < value) {
      callback(`Số lượng mua tối đa không vượt quá ${maxOfTotal}`);
      return;
    }
    if (minTotal > maxOfTotal) {
      minTotal = maxOfTotal;
    }
    if (minTotal > value) {
      callback(`Số lượng mua tối thiểu là ${minTotal}`);
    } else {
      callback();
    }
  },

};
