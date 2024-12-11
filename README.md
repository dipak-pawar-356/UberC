# User Authentication API Documentation

## User Registration Endpoint

### Endpoint: `/users/register`

#### Description
This endpoint allows users to register by providing their details. Upon successful registration, the user will receive a JSON Web Token (JWT) for authentication and the user details.

#### Request Method
`POST`

#### Headers
- **Content-Type:** `application/json`

#### Request Body
The request body must be sent in JSON format and include the following fields:

| Field                  | Type    | Required | Description                                  |
|------------------------|---------|----------|----------------------------------------------|
| `fullname.firstname`   | String  | Yes      | The user's first name (minimum 3 characters).|
| `fullname.lastname`    | String  | No       | The user's last name (minimum 3 characters). |
| `email`                | String  | Yes      | The user's email address (must be valid).    |
| `password`             | String  | Yes      | The user's password (minimum 6 characters).  |

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response
##### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "_id": "<USER_ID>"
    }
  }
  ```

##### Error Responses
- **Status Code:** `400 Bad Request`
  - When validation fails:
    ```json
    {
      "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" },
        { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
      ]
    }
    ```
  - When required fields are missing:
    ```json
    {
      "message": "Please provide all the required fields"
    }
    ```

---

## User Login Endpoint

### Endpoint: `/users/login`

#### Description
This endpoint allows users to log in by providing their email and password. Upon successful authentication, the user will receive a JSON Web Token (JWT) and the user details.

#### Request Method
`POST`

#### Headers
- **Content-Type:** `application/json`

#### Request Body
The request body must be sent in JSON format and include the following fields:

| Field     | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `email`   | String | Yes      | The user's email address (must be valid).|
| `password`| String | Yes      | The user's password.                     |

#### Example Request
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response
##### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "_id": "<USER_ID>"
    }
  }
  ```

##### Error Responses
- **Status Code:** `400 Bad Request`
  - When validation fails:
    ```json
    {
      "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
      ]
    }
    ```

- **Status Code:** `401 Unauthorized`
  - When invalid credentials are provided:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

---

## User Profile Endpoint

### Endpoint: `/users/profile`

#### Description
This endpoint allows authenticated users to retrieve their profile details.

#### Request Method
`GET`

#### Headers
- **Authorization:** `Bearer <JWT_TOKEN>`

#### Response
##### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "_id": "<USER_ID>"
    }
  }
  ```

##### Error Responses
- **Status Code:** `401 Unauthorized`
  - When the token is missing or invalid:
    ```json
    {
      "message": "Authentication failed"
    }
    ```

- **Status Code:** `404 Not Found`
  - When the user does not exist:
    ```json
    {
      "message": "User not found"
    }
    ```

---

## User Logout Endpoint

### Endpoint: `/users/logout`

#### Description
This endpoint allows authenticated users to log out by invalidating their JWT.

#### Request Method
`GET`

#### Headers
- **Authorization:** `Bearer <JWT_TOKEN>`

#### Response
##### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

##### Error Responses
- **Status Code:** `401 Unauthorized`
  - When the token is missing or invalid:
    ```json
    {
      "message": "Authentication failed"
    }
    ```

---

## Environment Variables
Make sure to configure the following environment variables:
- **JWT_SECRET:** Secret key for JWT token generation.

## Setup Instructions
1. Clone the repository.
2. Navigate to the `Backend` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file with the required environment variables.
5. Start the server:
   ```bash
   npm start
   ```
6. Test the endpoints using a tool like Postman or cURL.

---

## Notes
- Ensure the database is running and connected before starting the server.
- Validate the token returned after authentication for secure access to other endpoints.

