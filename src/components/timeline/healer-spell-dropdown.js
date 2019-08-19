import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { makeGetOptionsForActiveHealerSpells,
  getActiveHealers,
  getCastHealerSpells
} from '../../redux/selectors/temporal-boon-selectors';
import _ from 'lodash';

import { addHealerSpell } from '../../redux/actions/temporal-boon-actions';
import Select from 'react-select';

const makeMapStateToProps = () => {
    const getOptionsForHealerSpells = makeGetOptionsForActiveHealerSpells();
    return (state, props) => {
        return {
            healingSpellOptions: getOptionsForHealerSpells(state, props), 
            activeHealers: getActiveHealers(state),
            castSpells: getCastHealerSpells(state)
        }
    }
};

const mapDispatchToProps = dispatch => ({
    addHealerSpell: (timing, rowId, spellId, healerId) => {
      dispatch(addHealerSpell(rowId, healerId, Number(_.uniqueId()), spellId, timing))
    }
});

export const HealerSpellDropdown = connect(makeMapStateToProps, mapDispatchToProps)(
    ({rowId,
      timing,
      addHealerSpell,
      healingSpellOptions,
      value,
      activeHealers,
      castSpells
    }) => {
      return (
        <Select
            onChange={selection => {addHealerSpell(timing, rowId, selection.spellId, selection.healerId)}}
            options={healingSpellOptions}
            value={value}
        />)
      }
);

HealerSpellDropdown.propTypes = {
  rowId: PropTypes.number.isRequired,
  timing: PropTypes.number.isRequired,
  addHealerSpell: PropTypes.func,
  healingSpellOptions: PropTypes.array,
  value: PropTypes.object,
  activeHealers: PropTypes.array,
  castSpells: PropTypes.object
};

HealerSpellDropdown.defaultProps = {
  addHealerSpell(){},
  healingSpellOptions: [],
  value: {value: 'Select...', label: 'Select...'},
  activeHealers: [],
  castSpells: {}
};