import React from 'react';
import { HealerCDRow } from './healer-cd-row';

export const HealerCDGrid = () => (
  <React.Fragment>
    <p>healer cd grid</p>

    {/* bossSpellsWithCds.map(spell => (<HealerCDRow spell={spell}/>)) */}
    <HealerCDRow />
  </React.Fragment>
)