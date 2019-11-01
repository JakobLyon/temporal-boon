import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {selectedBoss} from '../redux/selectors/temporal-boon-selectors';
import {setBoss} from '../redux/actions/temporal-boon-actions';

const mapStateToProps = state => ({
  boss: selectedBoss(state)
});

const mapDispatchToProps = dispatch => ({
  setBoss: boss => 
    dispatch(setBoss(boss.value))
});

export const BossDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  boss,
  setBoss,
  options
}) => (
  <Select
    value={{value: boss, label: boss}}
    onChange={setBoss}
    options={options}
  />
));
