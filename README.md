# Node-Booking-System
A booking system for a Dispensary using Node.js

This code is basically mostly focused on the backend of user registration and login with full security measures

Key Security Measures:

Unique Email Identification: Every user's email is treated as a distinct identifier, ensuring no duplicate accounts exist.

Password Encryption: For the sake of security, user passwords are never stored in plain text. Instead, they undergo bcrypt encryption prior to being stored in the database.

AWS S3 for Image Storage: Profile pictures of users are stored securely within the AWS S3 bucket. Moreover, every time the image is accessed or saved, a temporary presigned URL is employed.

Encrypted Image Naming: The image's name consists of the bcrypt encrypted email of the user coupled with the file extension. This information is subsequently stored in the database.

Password Verification: During the login process, the password provided by users is encrypted using bcrypt and subsequently compared against the corresponding encrypted password in the database.

Token-Based Authentication: Upon a successful login attempt, users are awarded a token from the backend. This token becomes pivotal for future interactions, serving as an authentication mechanism.

API Request Validation: Any request pertaining to user data requires the presence of a valid token. If the token isn't valid or absent, the request is denied, ensuring that only authorized interactions take place.

Environment Variables for Sensitive Data: Sensitive runtime data is never hard-coded or exposed. Instead, it's stored securely using environment variables.
