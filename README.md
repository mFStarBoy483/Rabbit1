🛒 E-Commerce Website
This is a full-stack e-commerce web application built using React.js for the frontend and MongoDB for the backend database. The platform supports product listing, user authentication, image management, and password recovery.

🔧 Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Image Hosting: Cloudinary

Email Service (for Forgot Password): Mailtrap

Authentication: JWT-based

✨ Features
User registration and login with JWT authentication

Product catalog with add-to-cart and checkout functionality

Secure image uploads via Cloudinary

Password reset via email using Mailtrap for testing

Admin panel for managing products and users

🔐 Forgot Password Flow
The application uses Mailtrap to simulate email sending in development. When a user requests a password reset:

A reset token is generated and emailed to the user using Mailtrap.

The user clicks the link and sets a new password.

The token is validated on the backend before allowing the password change.

