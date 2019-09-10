# image-similarity-algorithm

## About

This md-file serves as a sort of log as I work through the algorithm problem.

## 1. Understand the problem

### 1.1 Restating the problem for myself

If I were to select any of the twenty plant images, I want a function to output which other plant photos might be of interest.

I can use the JSON data, but I don't have to.

### 1.2 Understanding the data

I presume a scalable solution would rely on Google's Vision API and the image labels it returns. However, to incorporate these label data in a well-informed manner, I first have to understand the data provided from Google Cloud Vision (https://cloud.google.com/solutions/image-search-app-with-cloud-vision).
As far as I understand, a user can upload an image and the Google API returns a number of labels for the given image. Each label has:

1. Label Identifier called 'mid' which is 'An opaque entity ID for the label, such as "/m/0bt9lr" '.
2. Label Description, which describes the image, e.g. 'leaf'.
3. Score which is a number associated with the confidence that each assessment is accurate. Confidence scores range from 0 (no confidence) to 1 (very high confidence).
4. Topicality should give a score from 0-1 0 (no confidence) to 1 (very high confidence) on relevancy of each label. However, in the data the topicality seems to be identical with the confidence score. Some seem to suggest this is because of a bug.

These returned label for each image can then be used to place images within categories based on similarity.

According to Google, there are two different approaches to classifying images:

1. Fixed label to category mapping
2. Word vector mapping

#### 1.2.1 Fixed label to category mapping

#### 1.2.2 Word vector mapping

### 1.3 What are the inputs that go into the problem?

Given that I use the data in the JSON, the algorithm would probably take the following data as an input:

1. Mapping a detected label to a predetermined category.
2. Using word vectors to find a similar category.

### 1.4 What are the outputs that should come from the solution to the problem?

Possible output could be:

1. A sorted array of images dependent on a similarity score.
2. An array with only the relevant images pushed into it if the similarity score is high enough.

## 1.5 Can the outputs be determined from the inputs? I.e. does the Google Visioin JSON file contain enough data to solve the problem?

Some shortcomings of the Google Cloud API data:

1. The quality of the 'description' for each plant can vary wildly.

- Some have generic descriptions, e.g. 'plant'.
- Others have descriptions which seem to contradict each other e.g. 8.jpg which has descriptions such as 'flower', 'plant', 'tree', 'herb'.

2. Confidence score vs label relevancy

- What if a label seem useful or relevant but the confidence score is low? Should the label be used or is it better to discard the label due to low confidence? I.e. work with a confidence threshold.

## 1.6. How should I name the important pieces of data in the algorithm, i.e. the function and variables?

I would possibly need the following to solve the algorithm:

1. function to 'calcImageSimilarity'
2.

## 2. Explore Examples

To conceptually come up with a sensible solution it might make sense to come up with some examples.

Example:

1. If I were to select the tomato plant (5.jpg), I would probably want to see other edibles as "related images", i.e. the banana plant (4.jpg) and the eggplant (10.jpg) or the gem squash (.jpg).
2. If I were to select the China rose (17.jpg), I would possibly want to see the rose decoration (19.jpg) or the primrose (2.jpg).
3. If I were to select the Begonia (perennial flower) (15.jpg), I would want to see another perennial plant flower (1.jpg, 2.jpg, 14.jpg, 15.jpg, 16.jpg 18.jpg). Too many possibilities? Need for further criterias?
4. If I were to select a shrubby plant (e.g. 20.jpg), I would want to see another shrub, e.g. (7.jpg, 9.jpg)
5. What if we don't have any related plants? We don't show anything? E.g. the algae (3.jpg) does not seem related to anything else (albeit my knowledge of plants is very limited).

## 3. Break It Down

The steps I need to take written in pseudocode.

## 4. Solve the Problem

- Consider simplifying the problem if I cannot solve the given problem.
- What is the core difficulty? I.e. data not comprehensive enough?
- Can the difficulty be temporarily ignored?
- Is it possible to write a simplified solution?
- Look at the difficulty last.

## 5. Look back an refactor
