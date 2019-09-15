# Image Similarity Algorithm

Thank you for letting me take my time with completing the algorithm. I really appreciate your patience as it allowed me to finish the course 100% focused on my learning.

The length of this readme is due to the open-ended nature of the challenge. I have therefore written quite extensively about what brought me to this specific solution. In case you want to skip straight to my thoughts on the code, this can be found under 3. The Code.

## 1. About The Task

## 1.1 The Challenge To Solve

If I were to select any of the twenty plant images, the algorithm should output which other plant photos might be of interest.

### 1.2 Understanding the data

I presumed a scalable solution would rely on Google's Vision API and the image labels it returns. However, to incorporate the label data in a well-informed manner, I first had to understand the data provided from Google Cloud Vision [https://cloud.google.com/solutions/image-search-app-with-cloud-vision].
As far as I understand, a user can upload an image and the Google API returns a number of labels for the given image. Each label has:

1. Label Identifier called 'mid' which is 'An opaque entity ID for the label, such as "/m/0bt9lr" '.
2. Label Description, which describes the image, e.g. 'leaf'.
3. Score which is a number associated with the confidence that each assessment is accurate. Confidence scores range from 0 (no confidence) to 1 (very high confidence).
4. Topicality also provides a score from 0-1 which is supposed to inform about relevancy of each label. However, in the data the topicality is identical with the confidence score. I have found suggestions online which suggest that this is due to a bug.

These returned labels for each image can then be used to place images within categories based on similarity.

### 1.3 Sorting in categories

According to Google, there are two different approaches to classifying images:

1. Fixed label to category mapping
2. Word vector mapping

Ideally, one would use word vector mapping, however, I opt for fixed label to category mapping as it is the simplest solution. Down the line, it would be wise to refactor the algorithm into the word vector approach using GloVe (Global Vectors for Word Representation) as this would make the solution both much more scalable and flexible.

## 2. My Approach

### 2.1 Categorising plants after the fixed-label-to-category-mapping approach

Using fixed label to category mapping, I first created categories based on the labels the Google Vision API has returned. These can be found in the file called plantCategories.js.

During the sorting, I ran into the following paradox:

- The more generic the label, the higher the confidence score.
- The more specific the term, the lower the confidence score.

The interesting thiing is that relevant terms for sorting plants have to be more specific than 'leaf', but the price one pays is that the confidence score drops (sometimes) significantly. The question becomes how to decide between confidence scores vs label relevancy.

One way to tackle this would be to work with a confidence threshold, i.e. only use labels with a confidence score higher than, say, 0.7. I decided against this approach as I thought it would over complicate matters unnecessarily for the scope of this challenge.

More importantly, I decided to discard generic labels such as 'leaf', as I found these to add little value to sorting the images.

### 2.2 Explore Examples

Another challenge arose regarding which categories would be sensible to work with. This question was quite challenging to tackle due to my admittedly limited knowledge of plants.

To conceptually come up with a sensible solution I tried to come up with some examples.

Example:

1. If I were to select the tomato plant (5.jpg), I would probably want to see other edibles as "related images", i.e. the banana plant (4.jpg) and the eggplant (10.jpg) or the gem squash (6.jpg).
2. If I were to select the China rose (17.jpg), I would possibly want to see the rose decoration (19.jpg) or the primrose (2.jpg).
3. If I were to select the Begonia (perennial flower) (15.jpg), I would want to see another perennial plant flower (1.jpg, 2.jpg, 14.jpg, 15.jpg, 16.jpg 18.jpg). Too many possibilities? Need for further criterias?
4. If I were to select a shrubby plant (e.g. 20.jpg), I would want to see another shrub, e.g. (7.jpg, 9.jpg)
5. What if we don't have any related plants? We don't show anything? E.g. the algae (3.jpg) does not seem related to anything else (albeit my knowledge of plants is very limited).

## 3. The Code

### 3.1 Pseudo Code and Code Structure

The steps I need to take written in pseudocode.

1. Create predefined categories
2. Associate labels with the categories
3. Calculate categoryscore for each category of an individual image.
4. Determine category for an individual image
5. Add image to given category
6. Repeat this for all twenty images
7. Create a function which looks up the category of an image and returns all similar images or an error message if there are no similar images (This error message would be handled differently down the road)

### 3.2 Testing

### 3.3 Refactoring
