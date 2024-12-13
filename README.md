# UberC Backend API Documentation

## Overview
UberC API provides authentication and management for users and captains. JWT is used for secure token-based authentication.

---

## Endpoints

### Users
#### 1. **Register User**
- **POST** `/users/register`
- **Request Body**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "johndoe@example.com",
      "_id": "<USER_ID>"
    }
  }
  ```

#### 2. **Login User**
- **POST** `/users/login`
- **Request Body**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": { "email": "johndoe@example.com", "_id": "<USER_ID>" }
  }
  ```

#### 3. **Get User Profile**
- **GET** `/users/profile`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**
  ```json
  {
    "user": { "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "johndoe@example.com" }
  }
  ```

#### 4. **Logout User**
- **GET** `/users/logout`
- **Response**
  ```json
  { "message": "Logged out successfully" }
  ```

---

### Captains
#### 1. **Register Captain**
- **POST** `/captains/register`
- **Request Body**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "johndoe@example.com",
    "password": "securepassword123",
    "vehicle": {
      "color": "Red",       // Min: 3 characters
      "plate": "AB123CD",  // Min: 3 characters
      "capacity": 4,        // Positive integer
      "vehicleType": "car" // Must be one of: car, motorcycle, auto
    }
  }
  ```
- **Response**
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "johndoe@example.com",
      "vehicle": {
        "color": "Red", "plate": "AB123CD", "capacity": 4, "vehicleType": "car"
      },
      "_id": "<CAPTAIN_ID>"
    }
  }
  ```

#### 2. **Login Captain**
- **POST** `/captains/login`
- **Request Body**
  ```json
  {
    "email": "captain@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": { "email": "captain@example.com", "_id": "<CAPTAIN_ID>" }
  }
  ```

#### 3. **Get Captain Profile**
- **GET** `/captains/profile`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**
  ```json
  {
    "captain": { "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "captain@example.com" }
  }
  ```

#### 4. **Logout Captain**
- **GET** `/captains/logout`
- **Response**
  ```json
  { "message": "Logged out successfully" }
  ```

---

## Common Errors
- **400**: Validation or missing fields.
- **401**: Authentication failure.
- **404**: Resource not found.
- **500**: Internal server error.

---

## Environment Variables
| Variable      | Description                  |
|---------------|------------------------------|
| `JWT_SECRET`  | Secret key for JWT tokens.   |
| `DB_URI`      | MongoDB connection string.   |

---

## Setup Instructions
1. Clone the repository and navigate to the `Backend` folder.
2. Install dependencies: `npm install`
3. Configure `.env` with the required variables.
4. Start the server: `npm start`
5. Use Postman or similar tools to test the endpoints.

---

**Note:** Ensure the database is running and input fields are validated to maintain security.
