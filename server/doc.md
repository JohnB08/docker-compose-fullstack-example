# Express Server API Documentation
## Overview
This documentation provides details about the endpoints available in the Express server API.

**Base URL**: http://localhost:3000

## Authentication
No authentication is required to access the endpoints.

## Endpoints
### Login
 - **Endpoint:** POST /login
 - **Description:** Authenticates a user with the provided username and password.
 - **Request Body:**
     - **username** (string, required): The username of the user.
    - **password** (string, required): The password of the user.
 - **Responses:**
     - **200 OK:** Successful authentication. Returns the user information.
    - **401 Unauthorized:** Invalid login credentials or missing username.
     - **404 Not Found:** User with the provided username does not exist.
     - **500 Internal Server Error:** Internal database error.


Example Request


```javascript
{
  "username": "example_user",
  "password": "example_password"
}
```


Example Response (Success)

```javascript
{
  "message": "Authentication Successful.",
  "user": {
    "id": 1,
    "username": "example_user"
  }
}
```
### Create User

 - **Endpoint:** POST /create
 - **Description:** Creates a new user with the provided username and password.
 - **Request Body:**
     - **username** (string, required): The username of the new user.
     - **password** (string, required): The password of the new user.
 - **Responses:**
     - **200 OK:** User successfully created. Returns the created user information.
     - **400 Bad Request:** User with the provided username already exists.
     - **500 Internal Server Error:** Internal server error.

Example Request


```javascript
{
  "username": "new_user",
  "password": "new_password"
}

```
Example Response (Success)

```javascript
{
  "message": "User Successfully Created",
  "user": {
    "id": 2,
    "username": "new_user"
  }
}
```
