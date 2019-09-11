const plantData = require("./data.json");

// create predefined categories with labels
// each category is associated with one or more labels
//
// ignore score for now --> 1. easier / 2. some of the more important labels has a lower score

// create each category with a limited amount of labels

export let categories = {
  edible: [
    "Natural foods",
    "Local food",
    "Bush tomato",
    "Tomato",
    "Fruit",
    "Vegetable",
    "Food",
    "Plum tomato",
    "Vegan nutrition",
    "Vegetarian food"
  ]
};

export const calcSumOfCategoryLabels = imageString => {
  const plant = plantData[imageString];
  plant.forEach(dataLabel => {
    console.log(`${dataLabel.description} : ${dataLabel.score}`);
    console.log(dataLabel.description);

    console.log(categories.edible.indexOf(dataLabel.description));
  });

  //check if label exists --> If it does, i.e. if it is not -1 add score to the category.
  // console.log(categories.edible.indexOf("Local m"));

  // console.log(plantData[imageString].score);
  // console.log(plantData[imageString].score);
};

calcSumOfCategoryLabels("5.jpg");
