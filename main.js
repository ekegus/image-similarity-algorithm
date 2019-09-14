const plantData = require("./data.json");
const plantCategories = require("./plantCategories");

export const categorisePlants = () => {
  let categorisedPlants = {};
  let plantsToPlace = Object.keys(plantData);
  for (let index = 0; index < plantsToPlace.length; index++) {
    let highestScoringCategory = determineCategoryForPlant(
      plantsToPlace[index]
    );
    categorisedPlants.hasOwnProperty(highestScoringCategory)
      ? categorisedPlants[highestScoringCategory].push(plantsToPlace[index])
      : (categorisedPlants[highestScoringCategory] = new Array(
          plantsToPlace[index]
        ));
  }
  return categorisedPlants;
};

export const determineCategoryForPlant = imageString => {
  const categoryScores = calculateCategoryScore(imageString);
  return getCategoryWithHighestScore(categoryScores);
};

export const calculateCategoryScore = imageString => {
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
  return categoryScores;
};

export const getCategoryWithHighestScore = categoryScores => {
  let categories = Object.keys(categoryScores).filter(category => {
    return (
      categoryScores[category] ===
      Math.max.apply(null, Object.values(categoryScores))
    );
  });
  return categories[0];
};

export const findSimilarPlantImages = imageString => {
  const categorisedPlants = categorisePlants(plantData);
  let categoryOfInputPlant = determineCategoryForPlant(imageString);
  for (let [key, value] of Object.entries(categorisedPlants)) {
    if (categoryOfInputPlant === key) {
      let plantsInCategory = value.filter(element => {
        return element !== imageString;
      });
      return plantsInCategory;
    }
  }
};

export const renderMessage = imageString => {
  const similarPlantImages = findSimilarPlantImages(imageString);
  const plantCategory = determineCategoryForPlant(imageString);
  const noOtherPlantsMessage = `Thank you for your interest in ${imageString}. Unfortunately, we don't have other images in the plant category ${plantCategory}.`;
  const seeOtherPlantsMessage = `Thank you for your interest in ${imageString}. Why don't you also check out other images in the plant category ${plantCategory}: ${similarPlantImages.join(
    ", "
  )}?`;
  return similarPlantImages.length < 1
    ? noOtherPlantsMessage
    : seeOtherPlantsMessage;
};

console.log(renderMessage("5.jpg"));
