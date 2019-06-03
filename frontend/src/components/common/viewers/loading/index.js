import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
}
const loading = {
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  zIndex: 1,
  maxWidth: '100px',
  top: '150px',
  left: '50%'
}

class Loading extends React.Component {

  render() {
    const {className} = this.props;

    return (
      <div style={loading} className={className}>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#e29d00'}
          loading={this.props.isLoading}
        />
      </div>
    )
  }
}

export default Loading;