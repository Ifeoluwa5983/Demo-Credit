# Demo Credit

* A comprehensive mobile lending app that provides users with wallet functionality.
* Basic funfionality of the app includes:

  *   A user can create an account
  *   A user can fund their account
  *   A user can transfer funds to another user’s account
  *   A user can withdraw funds from their account.

### Module(s)
- Payments
- Authentication

---

## Requirements

For development, you will need Node.js (version 14 and above), mysql and a node global package installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).


## Application Project Installation

    $ git clone https://github.com/Ifeoluwa5983/Demo-Credit.git
    $ npm install

---

## Configure app

create a  `.env` file to the root folder then add url to your db to connect your mysql DBs.
An example of the structure of the `.env` is seen in `.env.example` file.

---

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies     |
|     **src/modules**             | Contains modules for the application |
|     **src/config**          | Contains application configurations including environment-specific configurations
|     **src/shared**             | Contains shared directories used by various modules across the applications.|
|     **src/routes**        | Contains routes for all modules, and also route versioning |
| **src/index.ts**            | Entry point to express app      |
| **tests**                | Contains all integration and unit test codes                         |                     |
| **database.json**        | Contains databases url            |
| **package.json**         | Contains npm dependencies as well as build scripts  |  
| **README.md**            | Contains details on how to setup the project locally and the codebase overview  | 
| **.env.example**         | Contains keys of the necessary environment variables needed in the .env file  |
| **.gitignore**           | Contains files and folders that github should ignore when pushing code to github  |
| **tsconfig.json**       | Contains typescript project configurations |

---

## Running the scripts
All the different build steps are arranged via npm scripts.
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script            | Description                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `dev`                 | Runs build in the local development environment. Can be invoked with `npm run dev` |
| `test`                | Runs tests using mocha. Can be invoked with `npm run test`      |
| `start`               | Runs build in the staging development environment. Can be invoked with `npm run start`                      |
| `migrate`              | Runs when the added migration file needs to be implemented in the DB. Can be invoked with `npm run migrate`        |

---
## Postman API Documentation
https://documenter.getpostman.com/view/27297926/2sAY4vg2aK
___

## Technologies

- NodeJS
- ExpressJS
- TypeScript
- KnexJS ORM
- Postman
- Mysql

---

## Copyright

Copyright (c) 2024 Demo Credit

---

