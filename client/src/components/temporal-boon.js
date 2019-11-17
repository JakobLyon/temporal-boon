import React from "react";
import { BossDropdown } from "./boss-dropdown";
import { BossTable } from "./boss-table";
import { TimelineGrid } from "./timeline/timeline-grid";
import { ActiveHealerDropdowns } from "./active-healer-dropdowns";
import Select from "react-select";
import { CooldownsBanner } from "./cooldowns-banner";

const items = [
  { value: "Abyssal Commander Sivara", label: "Abyssal Commander Sivara" },
  { value: "Blackwater Behemoth", label: "Blackwater Behemoth" },
  { value: "Radiance of Azshara", label: "Radiance of Azshara" },
  { value: "Lady Ashvane", label: "Lady Ashvane" },
  { value: "Orgozoa", label: "Orgozoa" },
  { value: "Queens Court", label: "Queens Court" },
  { value: `Za'qul`, label: `Za'qul` },
  { value: "Queen Azshara", label: "Queen Azshara" }
];

export const TemporalBoon = () => (
  <React.Fragment>
    <CooldownsBanner />
    <Select
      value={{ value: "The Eternal Palace", label: "The Eternal Palace" }}
      isDisabled
    />
    <BossDropdown options={items} />
    <BossTable />
    <ActiveHealerDropdowns />
    <TimelineGrid />
  </React.Fragment>
);
