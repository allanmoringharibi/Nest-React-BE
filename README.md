<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Setting Up Local PostgreSQL Database with Docker Compose

This repository contains a Docker Compose file to set up a local PostgreSQL database using Docker. Follow the steps below to get started.

## Prerequisites

Before you begin, ensure that you have Docker and Docker Compose installed on your system. You can download and install Docker from the official website: [Docker](https://www.docker.com/get-started).

## Steps to Set Up

1. **Clone the Repository**: Clone this repository to your local machine
2. **Navigate to the Project Directory**: Change your current directory to the cloned repository

3. **Build Docker Images**: Before running the containers with Docker Compose, you need to build the Docker images for PostgreSQL and pgAdmin. Use the following command to build the images:

docker-compose up --build

This command will build the Docker images defined in the `docker-compose.yml` file.

4. **Run Docker Compose**: After building the Docker images, use Docker Compose to start the PostgreSQL database and pgAdmin:

docker-compose up -d

This command will start the PostgreSQL database and pgAdmin containers in detached mode.

5. **Access pgAdmin Interface**: Once the containers are up and running, you can access the pgAdmin web interface by navigating to [http://localhost:5050](http://localhost:5050) in your web browser.

- Use the following credentials to log in:
  - **Email:** admin@admin.com
  - **Password:** pgadmin

6. **Connect to PostgreSQL Database**: After logging in to pgAdmin, follow these steps to connect to the PostgreSQL database (ensure that the containers are running):

- In the pgAdmin interface, click on "Add New Server" to add a new PostgreSQL server.
- Enter the following details:
  - **Name:** Any name you prefer for the server.
  - **Host name/address:** `db` (This is the service name defined in the Docker Compose file).
  - **Port:** `5432`
  - **Username:** `postgres`
  - **Password:** `postgres`
- Click "Save" to connect to the PostgreSQL database.

## Accessing the Database

You can now access the PostgreSQL database using your preferred database client or command-line tool. Here are the connection details:

- **Host:** `localhost` or `127.0.0.1`
- **Port:** `5432`
- **Username:** `postgres`
- **Password:** `postgres`
- **Database:** `local`

## Stopping the Containers

To stop the containers and remove them, you can use the following Docker Compose command:

docker-compose down

## Start the Server

You can start the server using following command:

npm run start:docker
