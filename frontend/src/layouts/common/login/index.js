import React from 'react';
import LoginForm from './form';
import './stylesheet.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    return (
      <div className="ui-my-component">
        <LoginForm/>
      </div>
    );
  }
}

export default MyComponent;
