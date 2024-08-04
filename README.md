# BookClub API (BACK_END)

## Introduction

This API aims to be a book club management application, allowing users to perform various operations related to their book collections and accounts. It provides functionalities such as adding, updating, viewing, and deleting books, authors, genres, and user accounts. Additionally, it includes features for user authentication, including password reset via email, and managing user profile pictures.

## Dependencies

To run the API, you need the following dependencies:

- **[Docker](https://www.docker.com/)** - Containerization platform for developing, shipping, and running applications.
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment.
- **[Express](https://expressjs.com/)** - Web framework for Node.js.
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database management system.
- **[Sequelize](https://sequelize.org/)** - Promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **[Yarn](https://yarnpkg.com/)** - Package manager for JavaScript.
- **[Nodemon](https://nodemon.io/)** - Utility that monitors for any changes in your source and automatically restarts your server.
- **[Yup](https://github.com/jquense/yup)** - JavaScript schema builder for value parsing and validation.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Library to help you hash passwords.
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Library to create and verify JSON Web Tokens.
- **[Mailjet](https://www.mailjet.com/)** - Email sending service.
- **[AWS SDK](https://aws.amazon.com/sdk-for-javascript/)** - Amazon Web Services SDK for JavaScript.

## Steps to run the project

### Configuration of the Database

To set up the database, follow these steps:

1. Create a PostgreSQL instance using Docker:

   ```bash
   docker run --name postgres-bookclub -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
   ```

2. Create a .env file in the project root directory like the example below:

db_user=docker
db_password=docker
db_name=bookclub
db_host=localhost
db_port=5432

### Running the Project

To run the project.follow these steps:

1. Git clone the repository

git clone https://github.com/xcodedi/bookclub-api.git

2. Navigate to the project folder and install dependencies:

gitbash
cd bookclub-backend --
yarn install

3. Configure scripts to create the database and tables in PostgreSQL using Sequelize>

gitbash
yarn sequelize db:migrate

4.Optional- Seed the database and tables in PostgreSQL using Sequelize:

gitbash
yarn sequelize db:seed:all

5. Run the project in development mode:

gitbash
yarn start:dev

6.Run the project in production mode:

gitbash
yarn start

### Project Features

-User Authentication: Users can create an account using email and password, reset their password, and update their profile information including a profile picture using Base64 encoding and AWS S3.

-Books Management: CRUD operations for books including details like authors, genre, synopsis, pages, and book cover avatar.

-Categories and Authors: Manage categories and authors with relationships between tables using Sequelize associations.

-Favorites: Users can mark books as favorites.

-Search Functionality: Search for books by categories.

-Email Notifications: Password reset emails using Mailjet.

## Documentation:

This README provides detailed instructions for setting up the project, configuring the PostgreSQL database, and running the API in development or production mode.

To test the API, use Insomnia to import the file below:
[Insomnia.json](https://github.com/xcodedi/booksclub-api/blob/main/Insomnia_2024-08-04.json)
