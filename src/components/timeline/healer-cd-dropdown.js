import React from 'react';
import { connect } from 'react-redux'; 
import { makeGetOptionsForHealerSpells } from '../../redux/selectors/temporal-boon-selectors';
import _ from 'lodash';

import { addHealerSpell } from '../../redux/actions/temporal-boon-actions';
import Select from 'react-select';

const mapDispatchToProps = dispatch => ({
    addHealerSpell: (timing, rowId) => dispatch(addHealerSpell(rowId, 1, Number(_.uniqueId()), 1, timing))
});

// const makeMapStateToProps = () => {
//     const getOptionsForHealerSpells = makeGetOptionsForHealerSpells();
//     return (state, props) => {
//         return {
//             healingSpellOptions: getOptionsForHealerSpells(state, props)
//         }
//     }
// };

// TODO: FIND OUT WHICH HEALER HAS THE FIRST AVAILABILITY TO CAST AN OFF CD SPELL
export const HealerCDDropdown = connect(null, mapDispatchToProps)(({id, timing, addHealerSpell}) => (
    <React.Fragment>
        <Select
            onChange={() => addHealerSpell(timing, id)}
            options={[{value: 'Totem', label: 'Totem'}]}
        />
    </React.Fragment>
));