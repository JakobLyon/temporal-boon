import { imagesForBossesReducer, getImages } from "./image-for-bosses";

describe("Images for Bosses Reducer", () => {
  it("Returns default", () => {
    const newState = imagesForBossesReducer(undefined, {});
    expect(newState).toStrictEqual(getImages());
  });
});
