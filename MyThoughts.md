# image-similarity-algorithm

## Immediate Thoughts for Approaching the Problem

## 1. Understand the problem

### 1.1 Restating the problem for myself

If I were to select any of the twenty plant images, I want a function to output which other plant photos might be of interest. I can use the google data, but I don't have to.

It is not immediately obvious to me, how I would approach the problem if I were to not use the data provided in the attached JSON file. Further research is necessary regarding whether the algorithm could be based on the .jpg's themselves.

### 1.2 What are the inputs that go into the problem?

Given that I use the data in the JSON, the algorithm would probably take the following data as an input:

1. The JSON data
2. The data related to the specific image the user has posted.

Further research is needed to determine which parts of the data might be relevant to use. E.g.

- Which parts of the data are useless?
- Which part of the data is specific for each plant?
- Which part of the data is most relevant?
- What does the terms in the data actually mean, e.g. score, topicality etc.

### 1.3 What are the outputs that should come from the solution to the problem?

Possible output could be:

1. A sorted array of images dependent on relevance given the input.

## 1.4 Can the outputs be determined from the inputs? I.e. does the JSON file contain enough data to solve the problem?

I am not yet capable of answering this question.

## 1.5. How should I name the important pieces of data in the algorithm, i.e. the function and variables?

## 2. Explore Examples

## 3. Break It Down

The steps I need to take written in pseudocode.

## 4. Solve the Problem

- Consider simplifying the problem if I cannot solve the given problem.
- What is the core difficulty? I.e. data not comprehensive enough?
- Can the difficulty be temporarily ignored?
- Is it possible to write a simplified solution?
- Look at the difficulty last.

## 5. Look back an refactor
