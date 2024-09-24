<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Project Overview

This project is designed to facilitate an assessment system with a focus on user roles, questions, and responses. 

## Features

1. **User Table**
   - Contains user information with the following structure:
     ```json
     {
       "name": "",
       "role": ""
     }
     ```
   - The `role` field is an enum that can take one of the following values:
     - `candidate`
     - `reviewer`

2. **Questions and Responses Table**
   - Stores a list of questions along with candidate responses.
   - Each question is categorized by difficulty, which can be one of:
     - `easy`
     - `medium`
     - `hard`

3. **Reviewer Functionality**
   - Reviewers can access and evaluate the responses provided by candidates from the questions table.

4. **Aggregate Skills and Ratings**
   - Both candidates and reviewers can fetch a list of aggregate skills along with their corresponding ratings.

5. **Authentication**
   - The system uses an authentication library to manage user sessions and access control.
  
# Project Overview

This project implements an assessment system featuring user roles, candidate responses, and skills aggregation.

## Tasks

1. **User Sign Up API**
   - Implement a CRUD API for user registration, allowing users to sign up with their name and role (either `candidate` or `reviewer`).

2. **Candidate Response Rating API**
   - Develop a CRUD API for reviewers to rate candidate responses. This will enable reviewers to evaluate and provide feedback on candidate submissions.

3. **Aggregate Skills Calculation**
   - Create an API endpoint to retrieve a list of aggregated skills along with ratings for each candidate. The skill calculation considers the difficulty levels with the following weightage:
     - `easy`: 1
     - `medium`: 2
     - `hard`: 3

   The formula for skill calculation is as follows:
   \[
   \text{Skill Score} = \frac{(1 \times \text{easy\_count} \times \text{rating}) + (2 \times \text{medium\_count} \times \text{rating}) + (3 \times \text{hard\_count} \times \text{rating})}{(1 \times \text{easy\_count}) + (2 \times \text{medium\_count}) + (3 \times \text{hard\_count})}
   \]
   Where:
   - `easy_count`, `medium_count`, and `hard_count` represent the number of questions answered at each difficulty level by the candidate.

