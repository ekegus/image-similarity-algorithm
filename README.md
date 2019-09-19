# Image Similarity Algorithm

Thank you for letting me take my time completing the algorithm. I appreciate your patience as it allowed me to finish the course 100% focused on my learning.

The length of this readme is due to the open-ended nature of the challenge which made me write quite extensively about what brought me to this specific solution. In case you want to skip straight to my code outline, this can be found under 3. The Code.

## 1. About the Task

### 1.1 The Challenge to Solve

If I were to select any of the twenty plant images, the algorithm should output which other plant photos might be of interest.

To see the result:

1. Run `yarn install`.
2. Run `yarn test`.
3. See the console.log output from line 77 which currently checks for plants related to '5.jpg'.
4. To see recommendations for other plants change line 77 to a plant of your choice, e.g. '1.jpg'.

### 1.2 Understanding the Data

I decided to use Google's Vision API and the image labels it returns. However, to incorporate the label data in a well-informed manner, I first had to understand the data provided from Google Cloud Vision [https://cloud.google.com/solutions/image-search-app-with-cloud-vision].
As far as I understand, a user can upload an image and the Google API returns a number of labels for the given image. Each label has:

1. Label Identifier called 'mid' which is 'An opaque entity ID for the label, such as "/m/0bt9lr" '.
2. Label Description, which describes the image, e.g. 'leaf'.
3. A score which is a number associated with the confidence that each assessment is accurate. Confidence scores range from 0 (no confidence) to 1 (very high confidence).
4. Topicality also provides a score from 0-1 which is supposed to inform about the relevancy of each label. However, in the data, the topicality is identical with the confidence score. I have found suggestions online which suggest that this is due to a bug.

These returned labels for each image can then be used to place images within categories based on similarity.

### 1.3 Sorting in Categories

According to Google, there are two different approaches to classifying images:

1. Fixed label to category mapping
2. Word vector mapping

Ideally, one would use word vector mapping, however, I decided to use the fixed label to category mapping because it is the simplest solution. Down the line, it would be wise to refactor the algorithm into the word vector approach using GloVe (Global Vectors for Word Representation) as this would make the solution both much more scalable and flexible.

## 2. My Approach

### 2.1 Categorising Plants After the Fixed-Label-to-Category-Mapping Approach

Using fixed label to category mapping, I first created categories based on the labels the Google Vision API has returned. These can be found in the file called plantCategories.js.

During the sorting of labels, I ran into the following paradox:

- The more generic the label, the higher the confidence score.
- The more specific the term, the lower the confidence score.

To sort plants I need to use labels more specific than 'leaf', but the price one pays for more specific labels is that the confidence score drops – (sometimes) significantly. The question becomes how to decide between confidence scores vs label relevancy.

One way to tackle this would perhaps be to work with a confidence threshold, i.e. only to use labels with a confidence score higher than, say, 0.7. However, I decided against this approach as I thought it would over-complicate matters unnecessarily as I couldn't decide on an appropriate principle of demarcation.

I did, however, decide to discard labels which I found too generic to add any value, e.g. 'leaf'.

### 2.2 Explore Examples

Another challenge arose regarding which categories would be sensible to work with. This was especially challenging due to my limited knowledge of plants.

To conceptually come up with a sensible solution I tried to come up with some examples.

Example (these are not necessarily corresponding to the final result. They are just the examples I created to sort of guide my thinking):

1. If I were to select the tomato plant (5.jpg), I would probably want to see other edibles as "related images", i.e. the banana plant (4.jpg) and the eggplant (10.jpg) or the gem squash (6.jpg).
2. If I were to select the China rose (17.jpg), I would possibly want to see the rose decoration (19.jpg) or the primrose (2.jpg).
3. If I were to select the Begonia (perennial flower) (15.jpg), I would want to see another perennial plant (1.jpg, 2.jpg, 14.jpg, 15.jpg, 16.jpg 18.jpg). Too many possibilities? Need for further criterias?
4. If I were to select a shrubby plant (e.g. 20.jpg), I would want to see another shrub, e.g. (7.jpg, 9.jpg)
5. What if we don't have any related plants? We don't show anything? For example, the algae (3.jpg) does not seem related to anything else.

## 3. The Code

### 3.1 Code Structure

The code consists of the following functions:

1. categorisePlants: takes the 20 plant images and categorises them in an object which I thought of as a kind of plant database.
2. determinePlantCategory: takes in an individual plant and return the category which the plant belongs to.

To determine a plant category I need two further functions:

3. calculateCategoryScore: takes in an image and calculates the sums of confidence scores for each category. The output is an object with the summed scores for each category.
4. getCategoryWithHighestScore: takes in the object of scores outputted by the calculateCategoryScore function. It returns the category with the highest score which is used in the determinePlantCategory function.

And lastly the functions which returns the similar plants:

5. findSimilarPlantImages: takes in an individual plant. It checks which category the plant belongs to and outputs other plants in the same category.
6. renderMessage: takes in an individual plant and outputs a message dependent on whether there are other plants in the given category.

### 3.2 Testing

I created a couple of unit tests for each function using Jest. This helped me think about how to structure the code and which steps I would need to take to solve the task.

### 3.3 Refactoring

1. 12.jpg (maple tree/leave) is not placed in a category and figures under 'undefined'. This is obviously not a viable solution. However, I decided to leave it as a) it isn't obvious to me which category would be most suitable for the maple tree; b) it examplifies (I think) how a GloVe approach could have solved this issue by using semantic vectors.
2. The name 'imageString' used for refering to the images/file names, e.g. '1.jpg', could be more specific. Cannot come up with something better for now.
3. The solution uses looping/iterating methods extensively, e.g. for-loops, filter, map, Object.keys/values/entries. Sometimes these are even nested, e.g. lines 55-57. Although my knowledge of performance is limited, I believe this would be problematic if I were to work with a dataset much bigger than 20 images. The many iterators also decreases the readability of the code. If I had more time, my next step would probably consists in trying to research performance and learn about how this could be improved.
4. I would possibly refactor the categorisedPlants object into an array of objects instead of an object of objects as I think this might make the code more readable.
5. Finally, I would try to implement global vectors using [https://nlp.stanford.edu/projects/glove/].
