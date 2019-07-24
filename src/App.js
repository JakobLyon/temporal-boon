import React from 'react';
import logo from './logo.svg';
import './App.css';

import Select from 'react-select';

const items = [
  {value: 'Abyssal Commander Sivara'},
  {value: 'Blackwater Behemoth'},
  {value: 'Radiance of Azshara'},
  {value: 'Lady Ashvane'},
  {value: 'Orgozoa'},
  {value: 'Queens Court'},
  {value: `Za'qul`},
  {value: 'Queen Azshara'}
]

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class App extends React.Component {
  state = {
    value: ''
  }

  render() {
    return (
      <Select options={options} />
    )
  }
}

export default App;
