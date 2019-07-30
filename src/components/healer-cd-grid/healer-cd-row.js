import React from 'react';
import { BossSpellDropdown } from './boss-spell-dropdown';
import { HealerCDDropdown } from './healer-cd-dropdown';
import { BossSpellNotes } from './boss-spell-notes'

export const HealerCDRow = () => (
    <React.Fragment>
        <p>healer cd row</p>
        <BossSpellDropdown />
        <HealerCDDropdown />
        <HealerCDDropdown />
        <HealerCDDropdown />
        <HealerCDDropdown />
        <BossSpellNotes />
    </React.Fragment>
)