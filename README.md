# Candidate Skill Rating System

## Project Overview

This system is designed to facilitate the evaluation of candidates through a structured assessment process, incorporating user roles, candidate responses, and skill aggregation.

## Features

1. **User Management**
   - **User Table**: Contains user information with fields for `name` and `role`. The role can be either `candidate` or `reviewer`.
   - **CRUD API for User Sign-Up**: Allows new users to register with their details.

2. **Candidate Response Management**
   - **Questions Table**: A list of questions categorized by difficulty: `easy`, `medium`, and `hard`.
   - **CRUD API for Rating Responses**: Reviewers can rate the candidate’s responses, providing a structured feedback mechanism.

3. **Skill Aggregation**
   - **Aggregate Skills and Ratings**: Both candidates and reviewers can retrieve a list of skills along with their ratings.
   - **Skill Calculation Formula**: 
     \[
     \text{Skill Score} = \frac{(1 \times \text{easy\_count} \times \text{rating}) + (2 \times \text{medium\_count} \times \text{rating}) + (3 \times \text{hard\_count} \times \text{rating})}{(1 \times \text{easy\_count}) + (2 \times \text{medium\_count}) + (3 \times \text{hard\_count})}
     \]
     - This formula considers the difficulty of the questions answered and their corresponding ratings to compute an overall skill score.

## API Endpoints

- **User Registration**: 
  - **POST** `/api/users/signup` - Register a new user.
  
- **Rate Candidate Response**: 
  - **POST** `/api/responses/rate` - Reviewers submit ratings for candidate responses.

- **Get Aggregated Skills**: 
  - **GET** `/api/skills` - Retrieve a list of aggregated skills and their ratings for a specific candidate.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- MongoDB (or an equivalent database)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.dev/imranshkh283/candidate-skill-rating
   cd candidate-skill-rating
