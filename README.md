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
