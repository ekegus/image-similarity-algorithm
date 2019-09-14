const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

let plantDatabase = {};

determinePlantCategory = (imageString, plantCategories) => {
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
  return getCategoryWithHighestScore(categoryScores);
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

placeOnePlantInDatabase = (imageString, plantCategories) => {
  const highestCategory = determinePlantCategory(imageString, plantCategories);
  return plantDatabase.hasOwnProperty(highestCategory)
    ? plantDatabase[highestCategory].push(imageString)
    : (plantDatabase[highestCategory] = new Array(imageString));
};

placeAllPlantsInDatabase = plantData => {
  let plantsToPlace = Object.keys(plantData);
  return plantsToPlace.map(imageString => {
    return placeOnePlantInDatabase(imageString, plantCategories);
  });
};

findSimilarPlantImages = imageString => {
  placeAllPlantsInDatabase(plantData);
  let categoryOfInputPlant = determinePlantCategory(
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
  const plantCategory = determinePlantCategory(imageString, plantCategories);
  const noOtherPlantsMessage = `Thank you for your interest in ${imageString}. Unfortunately, we don't have other images in the plant category ${plantCategory}.`;
  const seeOtherPlantsMessage = `Thank you for your interest in ${imageString}. Why don't you also check out other images in the plant category ${plantCategory}: ${similarPlantImages.join(
    ", "
  )}?`;
  return similarPlantImages.length < 1
    ? noOtherPlantsMessage
    : seeOtherPlantsMessage;
};
console.log(generateUserMessage("4.jpg"));
