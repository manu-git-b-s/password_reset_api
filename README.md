# Password Reset API

Welcome to the Password Reset and User Management API! This repository contains the source code and documentation for a Node.js API built with Express.js for managing users and handling password resets. The API utilizes various libraries and tools including dotenv, cors, bcryptjs, jsonwebtoken, nodemon, nodemailer, mongoose, and is deployed on Render.

## Features

- **User Authentication**: Implements user authentication using bcryptjs for hashing passwords and jsonwebtoken for generating and verifying authentication tokens.
- **User Registration**: Allows users to register by providing their email and password.
- **User Login**: Enables registered users to log in with their email and password.
- **Password Reset Request**: Provides an endpoint for users to request a password reset by providing their email address.
- **Secure Verification**: Utilizes secure methods for verifying the identity of users requesting password resets.
- **Token Generation**: Generates unique tokens for password reset requests to prevent unauthorized access.
- **Password Update**: Allows users to securely update their passwords after successful verification.
- **Email Notifications**: Uses nodemailer to send email notifications for password reset requests.
- **Database Integration**: Integrates with MongoDB using mongoose for storing user data securely.
- **Environment Variables**: Utilizes dotenv for managing environment variables.
- **Cross-Origin Resource Sharing (CORS)**: Implements CORS to allow requests from authorized domains.

## Getting Started

To get started with the Password Reset and User Management API, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using `https://github.com/manu-git-b-s/password_reset_api.git`.

2. **Install Dependencies**: Install the necessary dependencies by running `npm install`.

3. **Set Environment Variables**: Create a `.env` file in the root directory and define environment variables such as database connection URI, email configuration, and JWT secret.

4. **Database Setup**: Set up a MongoDB database either locally or using a cloud service like MongoDB Atlas. Update the `.env` file with the appropriate database connection URI.

5. **Start the Server**: Start the server by running `npm start` or `npm run dev` if using nodemon for development. The API will be accessible at the specified port (default is 8080).

6. **Testing**: Test the API endpoints using tools like Postman or curl to ensure everything is working as expected.

7. **Deployment**: Deploy the API to Render or any other hosting provider by following their deployment instructions.

## API Endpoints

- `POST /register`: Register a new user.
- `GET /list-all-users`: List all users.
- `POST /login`: Log in with existing credentials.
- `POST /forgotPassword`: Request a password reset.
- `POST /resetPassword`: Reset password using the provided token.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/feature-name`).
6. Create a new Pull Request.

## Support

For any questions or issues, please open an issue on the GitHub repository or contact [manupriyan722@gmail.com].

## Deployed Render Link

[Password Reset API](https://password-reset-api-gs13.onrender.com)
