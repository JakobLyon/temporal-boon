import BannerImage from "./images/banners/AbyssalCommanderSivara.jpg";
import Headshot from "./images/headshots/AbyssalCommanderSivara.png";

export default {
  name: "Abyssal Commander Sivara",
  bannerImage: BannerImage,
  headshot: Headshot,
  spells: [
    {
      name: "Toxic Brand",
      spellid: "294715",
      description:
        "Marks the player with a poisonous brand, inflicting Nature damage every 5 sec and reducing healing recieved by 5%. This effect stacks.",
      isDebuff: true,
      trackOnFrames: true,
      trackOnTimers: false,
      mythicOnly: false
    },
    {
      name: "Frost Mark",
      spellid: "294711",
      description:
        "Marks the player with a frigid brand, inflicting Frost damage every 5 sec and reducing movement speed by 5%. This effect stacks.",
      isDebuff: true,
      trackOnFrames: true,
      trackOnTimers: false,
      mythicOnly: false
    },
    {
      name: "Unstable Mixture",
      spellid: "294847",
      description:
        "A mix of poisons catalyzes in the player, causing them to explode, inflicting Nature damage to all allies every 1 second for 3 seconds.",
      isDebuff: false,
      trackOnFrames: false,
      trackOnTimers: false,
      mythicOnly: false
    },
    {
      name: "Crushing Reverberation",
      spellid: "295332",
      description:
        "Crushes the target, inflicting Physical damage, split between the target and all players within 5 yards. Additionally, Crushing Reverberation sends a shockwave that knocks all players back.",
      isDebuff: false,
      trackOnFrames: false,
      trackOnTimers: true,
      mythicOnly: false
    },
    {
      name: "Overflowing Chill",
      spellid: "295348",
      description:
        "Causes a player and their Frost Mark to explode after 6 seconds, inflicting Frost damage split between all players within 5 yards and creating a pool of Frozen ground.",
      isDebuff: true,
      trackOnFrames: true,
      trackOnTimers: false,
      mythicOnly: false
    },
    {
      name: "Overflowing Venom",
      spellid: "295421",
      description:
        "Causes a player and their Toxic Brand to explode after 6 seconds, inflicting Frost damage split between all players within 5 yards and creating a pool of Septic ground.",
      isDebuff: true,
      trackOnFrames: true,
      trackOnTimers: false,
      mythicOnly: false
    },
    {
      name: "Overwhelming Barrage",
      spellid: "295138",
      description:
        "The caster fires a volley of poisonous and frozen bolts, inflicting either Frost or nature damage and applying either Frost Mark or Toxic Brand to each player hit.",
      isDebuff: false,
      trackOnFrames: false,
      trackOnTimers: true,
      mythicOnly: false
    }
  ]
};
