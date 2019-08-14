import React from 'react';
import { connect } from 'react-redux';
import { makeGetCastHealerSpellsByRowId } from '../../redux/selectors/temporal-boon-selectors';

import { HealerSpellDropdown } from './healer-spell-dropdown';

const makeMapStateToProps = () => {
    const getCastHealerSpellsById = makeGetCastHealerSpellsByRowId();
    return (state, props) => ({
        castSpells: getCastHealerSpellsById(state, props)
    })
}

export const HealerSpells = connect(makeMapStateToProps)(({rowId, timing, castSpells, castSpellsIds}) => (
    <React.Fragment>
        {castSpells.map(castSpell =>
        {
            return (<HealerSpellDropdown
                key={castSpell.id}
                rowId={rowId}
                timing={timing}
                value={{value: castSpell.name, label: castSpell.name}}
            />)
            })}
        <HealerSpellDropdown
            key={0}
            rowId={rowId}
            timing={timing}
            value="Select..."
        />
    </React.Fragment>
));