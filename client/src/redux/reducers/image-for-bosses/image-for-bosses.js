import { types } from "../../actions/types";

import abyssalCommander from "../../../raids/theeternalpalace/AbyssalCommanderSivara";
import blackwaterBehemoth from "../../../raids/theeternalpalace/BlackwaterBehemoth";

const getImages = () => {
  return {
    [abyssalCommander.name]: abyssalCommander.bannerImage,
    [blackwaterBehemoth.name]: blackwaterBehemoth.bannerImage
  };
};

export const imagesForBossesReducer = (state = getImages(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
