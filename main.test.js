import {
  determineCategoryForPlant,
  calculateCategoryScore,
  getCategoryWithHighestScore,
  placeOnePlantInDatabase,
  placeAllPlantsInDatabase
} from "./main";

describe("determineCategoryForPlant function", () => {
  test("the tomato plant should belong to the edibles category", () => {
    expect(determineCategoryForPlant("5.jpg")).toEqual("edibles");
  });
  test("the tomato plant should NOT belong to the wildflower category", () => {
    expect(determineCategoryForPlant("5.jpg")).not.toEqual("wildflower");
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

  // describe("placeOnePlantInDatabase function", () => {
  //   test("placing the tomato plant (5.jpg) in the database should return an object ", () => {
  //     expect(placeOnePlantInDatabase("5.jpg")).toEqual({
  //       edibles: ["5.jpg"]
  //     });
  // });
  // });
});

// describe("similar plants message", () => {
//   test("the tomato images (5.jpg) should tell the user about the banana plant (4.jpg) and the eggplant (10.jpg) and the gem squash (6.jpg)", () => {
//     expect(tellUserAboutSimilarPlants("5.jpg")).toEqual(
//       "Thank you for your interest in 5.jpg. Why don't you also check out other images in the plant category edibles: 4.jpg, 6.jpg, 10.jpg?"
//     );
//   });
// });
