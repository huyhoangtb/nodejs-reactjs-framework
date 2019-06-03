import React from 'react';
import './stylesheet.css';

export default (WrappedComponent) => {

  return class extends React.Component {

    state = {
      editing: false
    }

    edit = () => {
      this.setState({
        editing: true
      }, () => {
        this.domElm.focus();
      });
    };

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.props.onSave && this.isValueChanged()) {
          console.log('Value is changed', this.domElm.textContent);
        }
      });
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    };

    handleKeyDown = (e) => {
      const {key} = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() {
      const {editing} = this.state;
      const {className} = this.props;
      return (
        <WrappedComponent
          suppressContentEditableWarning
          className={`${editing ? 'editing' : ''} ${className}`}
          onClick={this.edit}
          contentEditable={true}
          ref={(domNode) => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.value}
        </WrappedComponent>
      )
    }
  }
}