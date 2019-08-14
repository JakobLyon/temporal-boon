import React from 'react';
import { connect } from 'react-redux'; 
import { makeGetOptionsForActiveHealerSpells } from '../../redux/selectors/temporal-boon-selectors';
import _ from 'lodash';

import { addHealerSpell } from '../../redux/actions/temporal-boon-actions';
import Select from 'react-select';

const makeMapStateToProps = () => {
    const getOptionsForHealerSpells = makeGetOptionsForActiveHealerSpells();
    return (state, props) => {
        return {
            healingSpellOptions: getOptionsForHealerSpells(state, props).map(healerSpell => ({value: healerSpell.name, label: healerSpell.name, id: healerSpell.id}))
        }
    }
};

const mapDispatchToProps = dispatch => ({
    addHealerSpell: (timing, rowId, spellId) =>
      dispatch(addHealerSpell(rowId, 1, Number(_.uniqueId()), spellId, timing))
});


// TODO: FIND OUT WHICH HEALER HAS THE FIRST AVAILABILITY TO CAST AN OFF CD SPELL
export const HealerSpellDropdown = connect(makeMapStateToProps, mapDispatchToProps)(
    ({rowId, timing, addHealerSpell, healingSpellOptions, value}) => (
        <Select
            onChange={selection => {addHealerSpell(timing, rowId, selection.id)}}
            options={healingSpellOptions}
            value={value ? value : {value: 'Select...', label: 'Select...'}}
        />
));