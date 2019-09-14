const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

let plantDatabase = {};

placeOnePlantInDatabase = imageString => {
  const highestScoringCategory = determineCategoryForPlant(imageString);
  return plantDatabase.hasOwnProperty(highestScoringCategory)
    ? plantDatabase[highestScoringCategory].push(imageString)
    : (plantDatabase[highestScoringCategory] = new Array(imageString));
};

placeAllPlantsInDatabase = plantData => {
  let plantsToPlace = Object.keys(plantData);
  return plantsToPlace.map(imageString => {
    return placeOnePlantInDatabase(imageString);
  });
};

determineCategoryForPlant = imageString => {
  const imageDataLabels = plantData[imageString];
  let categoryScores = new Object();
  for (let [plantCategory, categoryLabel] of Object.entries(plantCategories)) {
    imageDataLabels.forEach(dataLabel => {
      if (categoryLabel.indexOf(dataLabel.description) !== -1) {
        categoryScores.hasOwnProperty(plantCategory)
          ? (categoryScores[plantCategory] += dataLabel.score)
          : (categoryScores[plantCategory] = dataLabel.score);
      }
    });
  }
  return getCategoryWithHighestScore(categoryScores);
};

getCategoryWithHighestScore = categoryScores => {
  let categories = Object.keys(categoryScores).filter(category => {
    return (
      categoryScores[category] ===
      Math.max.apply(null, Object.values(categoryScores))
    );
  });
  return categories[0];
};

findSimilarPlantImages = imageString => {
  placeAllPlantsInDatabase(plantData);
  let categoryOfInputPlant = determineCategoryForPlant(
    imageString,
    plantCategories
  );
  for (let [key, value] of Object.entries(plantDatabase)) {
    if (categoryOfInputPlant === key) {
      let plantsInCategory = value.filter(element => {
        return element !== imageString;
      });
      return plantsInCategory;
    }
  }
};

generateUserMessage = imageString => {
  const similarPlantImages = findSimilarPlantImages(imageString);
  const plantCategory = determineCategoryForPlant(imageString, plantCategories);
  const noOtherPlantsMessage = `Thank you for your interest in ${imageString}. Unfortunately, we don't have other images in the plant category ${plantCategory}.`;
  const seeOtherPlantsMessage = `Thank you for your interest in ${imageString}. Why don't you also check out other images in the plant category ${plantCategory}: ${similarPlantImages.join(
    ", "
  )}?`;
  return similarPlantImages.length < 1
    ? noOtherPlantsMessage
    : seeOtherPlantsMessage;
};

console.log(generateUserMessage("5.jpg"));
