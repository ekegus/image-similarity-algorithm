const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

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
  console.log(highestCategory);

  return (plantDatabase[highestCategory] = image);
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

fillDatabase = () => {};

// getSimilarPlantImages = imageString => {
//   let plantDatabase = {};
// call function to fill database with 25 images
// output string with suggestion to other plants in a given category
// };

placePlantInDatabase("3.jpg", plantCategories);
console.log(plantDatabase);
