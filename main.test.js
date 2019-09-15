import {
  categorisePlants,
  calculateCategoryScore,
  determinePlantCategory,
  getCategoryWithHighestScore,
  findSimilarPlantImages,
  renderMessage
} from "./main";
const plantData = require("./data.json");

describe("determinePlantCategory function", () => {
  test("the tomato plant should belong to the edibles category", () => {
    expect(determinePlantCategory("5.jpg")).toEqual("edibles");
  });
  test("the tomato plant should NOT belong to the wildflower category", () => {
    expect(determinePlantCategory("5.jpg")).not.toEqual("wildflower");
  });
});

describe("calculateCategoryScore function", () => {
  test("the tomato plant should have a category score of 9.24598115682602", () => {
    expect(calculateCategoryScore("5.jpg")).toEqual({
      edibles: 9.24598115682602
    });
  });
  test("the plant decoration should have scores in different categories", () => {
    expect(calculateCategoryScore("19.jpg")).toEqual({
      roses: 1.6998191475868225,
      houseplants: 0.9525524377822876,
      decorative: 6.315008461475372
    });
  });
});

describe("getCategoryWithHighestScore function", () => {
  const categoryScoresForDecoration = {
    roses: 1.6998191475868225,
    houseplants: 0.9525524377822876,
    decorative: 6.315008461475372
  };
  test("highest score of the plant decoration should be 'decorative'", () => {
    expect(getCategoryWithHighestScore(categoryScoresForDecoration)).toEqual(
      "decorative"
    );
  });
  test("highest score of plant decoration should NOT be houseplants", () => {
    expect(
      getCategoryWithHighestScore(categoryScoresForDecoration)
    ).not.toEqual("houseplants");
  });
});

describe("categorisePlants function", () => {
  test("categorisePlants should categorise twenty plants", () => {
    expect(categorisePlants(plantData)).toEqual({
      algaes: ["3.jpg"],
      decorative: ["13.jpg", "18.jpg", "19.jpg"],
      edibles: ["4.jpg", "5.jpg", "6.jpg", "10.jpg"],
      houseplants: ["8.jpg"],
      perennials: ["2.jpg", "14.jpg"],
      roses: ["17.jpg"],
      shrubs: ["7.jpg", "9.jpg", "20.jpg"],
      undefined: ["12.jpg"],
      wildflowers: ["1.jpg", "11.jpg", "15.jpg", "16.jpg"]
    });
  });
});

describe("findSimilarPlantImages should return the array of images for a given category", () => {
  test("the algae image should return no similar images", () => {
    expect(findSimilarPlantImages("3.jpg")).toEqual([]);
  });
  test("the tomato image should return three similar images (4.jpg, 6.jpg, 10.jpg)", () => {
    expect(findSimilarPlantImages("5.jpg")).toEqual([
      "4.jpg",
      "6.jpg",
      "10.jpg"
    ]);
  });
});

describe("renderMessage function", () => {
  test("the tomato images (5.jpg) should tell the user about image 4.jpg, 6.jpg and 10.jpg", () => {
    expect(renderMessage("5.jpg")).toEqual(
      "Thank you for your interest in 5.jpg. Why don't you also check out other images in the plant category edibles: 4.jpg, 6.jpg, 10.jpg?"
    );
  });
  test("the algae image (3.jpg) should tell the user that there are no similar images", () => {
    expect(renderMessage("3.jpg")).toEqual(
      "Thank you for your interest in 3.jpg. Unfortunately, we don't have other images in the plant category algaes."
    );
  });
});
