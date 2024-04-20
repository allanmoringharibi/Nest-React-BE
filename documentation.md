# User Service Documentation

## Overview

The user service provides functionality for managing user data, including retrieving, creating, updating, and deleting user records.

## Endpoints

### Get All Users

- **URL:** `/users`
- **Method:** GET
- **Description:** Retrieves a list of all users.
- **Response:** An array of user objects.

### Create User

- **URL:** `/users`
- **Method:** POST
- **Description:** Creates a new user.
- **Request Body:** JSON object with the following properties:
  - `fullName` (string): The full name of the user.
- **Response:** A success message indicating that the user has been created.

### Update User

- **URL:** `/users/:id`
- **Method:** PUT
- **Description:** Updates an existing user.
- **URL Parameters:**
  - `id` (number): The ID of the user to update.
- **Request Body:** JSON object with the following properties:
  - `fullName` (string): The new full name of the user.
  - `userName` (string): The new username of the user.
- **Response:** A success message indicating that the user has been updated.

## Error Handling

The user service handles errors gracefully and returns appropriate HTTP status codes and error messages in case of failure.

---

# NestJS Server Documentation

## Overview

The NestJS server is responsible for serving the user service endpoints and handling incoming requests.

## Configuration

The NestJS server is configured to connect to a PostgreSQL database for storing user data. The database connection settings can be configured in the `app.module.ts` file.

## Interceptors

### Update Interceptor

The NestJS server uses an interceptor called UpdateInterceptor to capture changes made to user records and create historical change records in the database.

## Middleware

The NestJS server does not currently use any middleware.

## Error Handling

The NestJS server handles errors gracefully and returns appropriate HTTP status codes and error messages in case of failure.
