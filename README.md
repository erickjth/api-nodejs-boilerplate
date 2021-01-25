# API Boilerplate (Fastify)

>

## About

This project uses [Fastify](https://www.fastify.io/docs/latest/Getting-Started/). An open source web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.

The boilerplate follows this structure:

-   infra (all services from the outside the app, mostly related to the SO/Network etc)

    -   database
    -   logger
    -   persistence

-   interfaces (how the app communicate with the outside)

    -   http (which is basically an API Rest)
    -   console (in case we need to run command internally via CLI)

-   models (busines models definition)
-   services (when the app implement the business rules / use cases)
-   utils (global utilities)
-   container (Dependency Container)
-   index.js (entry point)

## Getting Started

### 1. Install your dependencies

Install all dependencies
` npm install `

### 2. Setup environment file

Create a copy of `env.example` into `.env` and edit all parameters.
` cp env.example .env `

### 3. Start your app

Run server in dev mode
` npm dev `

Run server in prod mode
` npm start `
