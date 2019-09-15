const plantData = require("./data.json");
const plantCategories = require("./plantCategories");

export const categorisePlants = () => {
  const categorisedPlants = {};
  const plantsToCategorise = Object.keys(plantData);
  for (let index = 0; index < plantsToCategorise.length; index++) {
    const highestScoringCategory = determinePlantCategory(
      plantsToCategorise[index]
    );
    categorisedPlants.hasOwnProperty(highestScoringCategory)
      ? categorisedPlants[highestScoringCategory].push(
          plantsToCategorise[index]
        )
      : (categorisedPlants[highestScoringCategory] = new Array(
          plantsToCategorise[index]
        ));
  }
  return categorisedPlants;
};

export const determinePlantCategory = imageString => {
  const categoryScores = calculateCategoryScore(imageString);
  return getCategoryWithHighestScore(categoryScores);
};

export const calculateCategoryScore = imageString => {
  const imageDataLabels = plantData[imageString];
  const categoryScores = new Object();
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
  const categories = Object.keys(categoryScores).filter(category => {
    return (
      categoryScores[category] ===
      Math.max.apply(null, Object.values(categoryScores))
    );
  });
  return categories[0];
};

export const findSimilarPlantImages = imageString => {
  const categorisedPlants = categorisePlants(plantData);
  const categoryOfInputPlant = determinePlantCategory(imageString);
  for (let [plantCategories, plants] of Object.entries(categorisedPlants)) {
    if (categoryOfInputPlant === plantCategories) {
      const plantsInCategory = plants.filter(plant => {
        return plant !== imageString;
      });
      return plantsInCategory;
    }
  }
};

export const renderMessage = imageString => {
  const similarPlantImages = findSimilarPlantImages(imageString);
  const plantCategory = determinePlantCategory(imageString);
  const noOtherPlantsMessage = `Thank you for your interest in ${imageString}. Unfortunately, we don't have other images in the plant category ${plantCategory}.`;
  const seeOtherPlantsMessage = `Thank you for your interest in ${imageString}. Why don't you also check out other images in the plant category ${plantCategory}: ${similarPlantImages.join(
    ", "
  )}?`;
  return similarPlantImages.length < 1
    ? noOtherPlantsMessage
    : seeOtherPlantsMessage;
};

console.log(renderMessage("5.jpg"));
