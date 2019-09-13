const plantCategories = require("./plantCategories");
const plantData = require("./data.json");

const calcSumOfCategoryLabels = (imageString, plantCategories) => {
  const plant = plantData[imageString];
  let categoryScores = new Object();
  for (let [plantCategory, plantLabel] of Object.entries(plantCategories)) {
    plant.forEach(dataLabel => {
      if (plantLabel.indexOf(dataLabel.description) !== -1) {
        categoryScores[plantCategory] = dataLabel.score;
        // categoryScores.push(dataLabel.description);
        console.log(plantCategory);
        console.log(`Your image belongs in the ${plantCategory} category.`);
      }
    });
  }
  console.log(categoryScores);
};

calcSumOfCategoryLabels("19.jpg", plantCategories);
