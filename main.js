const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

let plantDatabase = {};

determineCategory = (imageString, plantCategories) => {
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
  const highestCategory = determineCategory(imageString, plantCategories);
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
  let categoryOfInputPlant = determineCategory(imageString, plantCategories);
  for (let [key, value] of Object.entries(plantDatabase)) {
    if (categoryOfInputPlant === key) {
      let filteredImages = value.filter(element => {
        return element !== imageString;
      });
      let otherPlantsInSameCategory = filteredImages.join(", ");
      return otherPlantsInSameCategory;
    }
  }
};

generateUserMessage = imageString => {
  let similarPlantImages = findSimilarPlantImages(imageString);
  return `Thank you for your interest in ${imageString}, why don't you also check out image: ${similarPlantImages}?`;
};

console.log(generateUserMessage("5.jpg"));
