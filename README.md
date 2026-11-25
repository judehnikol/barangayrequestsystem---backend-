**Barangay Document Request System – Backend API**

A RESTful backend application for managing barangay document requests, resident profiles, staff accounts, document types, and payment records.

**Tech Stack:**

- Framework: NestJS
- ORM: TypeORM
- Database: MySQL
- Authentication: JWT (JSON Web Token)
- Password Hashing: bcrypt
- API Testing: Postman

**How to Run Locally?** 

Clone this repository:

1. git clone
  - https://github.com/judehnikol/barangayrequestsystem---backend-

2. Open the backend folder:
   - cd Barangay-Document-System/backend

3. Import mysql.sql into your local MySQL server using phpMyAdmin or another MySQL client.

4. Create a .env file inside the backend folder and configure your database and JWT credentials.

5. Install dependencies:
  - npm install

6. Start the development server:
  - npm run start:dev

7. The API will run at:
  - http://localhost:3000

**API Testing**

The API endpoints can be tested using Postman. Login first to obtain a JWT access token, then include it as a Bearer Token when accessing protected routes.
