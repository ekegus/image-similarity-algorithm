import {
  categories,
  calcCategoryScore,
  determineCategory,
  checkForSimilarPlants
} from "./main";
const plantData = require("./data.json");

describe("plant categories", () => {
  test("categories should have a category called 'edible'", () => {
    expect(categories.edible).toBeDefined();
  });
  test("categories should have a category called 'shrub'", () => {
    expect(categories.shrub).toBeDefined();
  });
  test("categories should have a category called 'rose'", () => {
    expect(categories.wildflower).toBeDefined();
  });
});

describe("place image in category", () => {
  test("the tomato image should belong to the category 'edible'", () => {
    expect(determineCategory(plantData["5.jpg"])).toEqual("edible");
  });
  test("the algae image should belong to the category algae", () => {
    expect(determineCategory(plantData["3.jpg"])).toEqual("algae");
  });
  test("the algae image should NOT belong to the category edible", () => {
    expect(determineCategory(plantData["3.jpg"])).not.toEqual("edible");
  });
});

describe("category score // calc sum of labels", () => {
  test("the tomato image should have a category score ƒor edible of 9.24598115682602", () => {
    expect(calcCategoryScore(plantData["5.jpg"])).toEqual(9.24598115682602);
  });
});

describe("check for similar plants", () => {
  test("the algae should not have any similar plants", () => {
    expect(checkForSimilarPlants("3.jpg")).toEqual(
      "Sorry, we don't have any similar plants to the algae"
    );
  });
  test("the tomato plant should have three similar plants, i.e. 4.img, 6.img, 10.img", () => {
    expect(checkForSimilarPlants("5.jpg")).toEqual([
      "4.img",
      "6.img",
      "10.img"
    ]);
  });
});
