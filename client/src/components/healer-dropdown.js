import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getHealers } from '../redux/selectors/temporal-boon-selectors';

const mapStateToProps = state => ({
  healers: getHealers(state)
});

export const HealerDropdown = connect(mapStateToProps)(({healers, value, onChange}) => (
  value ? (
    <Select
      options={healers.map(healer => ({value: healer, label: healer}))}
      value={{value: value, label: value}}
      onChange={healer => onChange(healer.value)}
    />
  ) : (
    <Select
      options={healers.map(healer => ({value: healer, label: healer}))}
      onChange={healer => onChange(healer.value)}
      value={{value: 'Select...', label: 'Select...'}}
    />
  )
));

HealerDropdown.propTypes = {
  healers: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

HealerDropdown.defaultProps = {
  healers: [],
  value: null
};

