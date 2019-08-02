import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { updateTiming } from '../../redux/actions/temporal-boon-actions';

const mapDispatchToProps = dispatch => ({
  updateTiming: (timing, id) => dispatch(updateTiming(timing, id))
});

export const TimingInput = connect(null, mapDispatchToProps)(
  ({disabled,
  value,
  updateTiming,
  id}) => (
    <TextField
      value={value}
      disabled={disabled}
      type={'number'}
      onChange={event => updateTiming(Number(event.currentTarget.value), id)}
    />
));

TimingInput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  id: PropTypes.number,
  updateTiming: PropTypes.func
};

TimingInput.defaultProps = {
  disabled: false,
  value: null,
  id: null,
  updateTiming(){}
};