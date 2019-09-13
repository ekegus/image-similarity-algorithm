const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

let plantDatabase = {};

placePlantInDatabase = (imageString, plantCategories) => {
  const image = imageString;
  const plant = plantData[imageString];

  let categoryScores = new Object();
  for (let [plantCategory, categoryLabel] of Object.entries(plantCategories)) {
    plant.forEach(dataLabel => {
      if (categoryLabel.indexOf(dataLabel.description) !== -1) {
        categoryScores.hasOwnProperty(plantCategory)
          ? (categoryScores[plantCategory] += dataLabel.score)
          : (categoryScores[plantCategory] = dataLabel.score);
      }
    });
  }
  let highestCategory = getCategoryWithHighestScore(categoryScores);
  return plantDatabase.hasOwnProperty(highestCategory)
    ? plantDatabase[highestCategory].push(image)
    : (plantDatabase[highestCategory] = new Array(image));
};

getCategoryWithHighestScore = objectOfCategoryScores => {
  let category = Object.keys(objectOfCategoryScores).filter(category => {
    return (
      objectOfCategoryScores[category] ===
      Math.max.apply(null, Object.values(objectOfCategoryScores))
    );
  });
  return category[0];
};

placeAllPlantsInDatabase = plantData => {
  let plantsToPlace = Object.keys(plantData);
  return plantsToPlace.map(imageString => {
    return placePlantInDatabase(imageString, plantCategories);
  });
};

// getSimilarPlantImages = imageString => {
//   let plantDatabase = {};
// call function to fill database with 25 images
// output string with suggestion to other plants in a given category
// };

placeAllPlantsInDatabase(plantData);
console.log(plantDatabase);
// placePlantInDatabase("3.jpg", plantCategories);
