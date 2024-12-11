# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description
This endpoint allows users to register by providing the necessary details. Upon successful registration, the user will receive a JSON Web Token (JWT) for authentication and the user details.

### Request Method
`POST`

### Headers
- **Content-Type:** `application/json`

### Request Body
The request body must be sent in JSON format and include the following fields:

| Field                  | Type    | Required | Description                                  |
|------------------------|---------|----------|----------------------------------------------|
| `fullname.firstname`   | String  | Yes      | The user's first name (minimum 3 characters).|
| `fullname.lastname`    | String  | No       | The user's last name (minimum 3 characters). |
| `email`                | String  | Yes      | The user's email address (must be valid).    |
| `password`             | String  | Yes      | The user's password (minimum 6 characters).  |

### Example Request
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

### Response
#### Success Response
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

#### Error Responses
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

### Environment Variables
Make sure to configure the following environment variables:
- **JWT_SECRET:** Secret key for JWT token generation.

### Dependencies
Ensure the following npm packages are installed:
- `express-validator`
- `mongoose`
- `bcrypt`
- `jsonwebtoken`

### How to Use
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
6. Send a POST request to `/users/register` with the required JSON body.

### Notes
- Ensure the database is running and connected before starting the server.
- Validate the token returned after registration for secure access to other endpoints.
