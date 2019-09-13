const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

const calcSumOfCategoryLabels = (imageString, plantCategories) => {
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
  console.log(categoryScores);

  let highestCategory = getCategoryWithHighestScore(categoryScores);
  console.log(highestCategory);
  console.log(categoryScores[highestCategory]);
  console.log(
    `Your plant image belongs to the ${highestCategory} with a score of ${categoryScores[highestCategory]}`
  );
  // categoryScores[highestCategory]
};

const getCategoryWithHighestScore = objectOfCategoryScores => {
  let category = Object.keys(objectOfCategoryScores).filter(category => {
    return (
      objectOfCategoryScores[category] ===
      Math.max.apply(null, Object.values(objectOfCategoryScores))
    );
  });
  return category[0];
};

calcSumOfCategoryLabels("5.jpg", plantCategories);
