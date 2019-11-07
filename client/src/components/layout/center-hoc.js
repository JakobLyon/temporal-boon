import React from 'react';
import Radium from 'radium';

const styles = {
  outer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  inner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const CenterComponent = Component => {
  return Radium(class extends React.Component {
    render() {
      return (
        <div style={[styles.outer]}>
          <div style={[styles.inner]}>
            <Component/>
          </div>
        </div>
      )
    }
  })
};

export const Center = CenterComponent;