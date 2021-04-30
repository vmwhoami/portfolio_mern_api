# Portfolio Express JSON API

A RESTFUL API built with Node and Express. It uses JWT to implement Authentication & Authorization.

## Routes

#### Portfolios

- GET - /api/v1/portfolios
- POST - /api/v1/portfolios
- GET - /api/v1/portfolios/:id
- PATCH - /api/v1/portfolios/:id
- DELETE - /api/v1/portfolios/:id

#### Registration:

- POST - /api/v1/users

#### Authentication:

- POST - /api/v1/login

#### Blog:

- GET - /api/v1/blog
- POST - /api/v1/blog
- GET - /api/v1/blog/:id
- PATCH - /api/v1/blog/:id
- DELETE - /api/v1/blog/:id

## Built With

- Node v14.15.4

## Live Demo

<!-- [Live Demo](https://mother-child.netlify.app) -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node v14.15.4
- Mongodb: "^3.6.5",
- Mongoose: "^5.12.3",

### Setup

```bash
$ git clone https://github.com/vmwhoami/mother_child_api
$ cd danceter
```

Install gems with:

```
npm install
```

Setup database with:

> Make sure you have MongoDb Atlas account create the enviroment veriable env file

```
   touch .env
   code .env
```

> Create two enviroment variables mongoURL and JWT_SECRET

mongoURL = "place your mongo db Url here replace the password with your mongo Atlas collection password and collection name respectively"
JWT_SECRET = "Create your own jwt secret"

### Usage

Start server with:

```
   npm start
```

Open `http://localhost:3000/` in your browser.

# Authors

👤 **Vitalie Melnic**

- Github: [@vmwhoami](https://github.com/vmwhoami)
- Twitter: [@vmwhoami](https://twitter.com/vmwhoami)
- Linkedin: [vitalie-melnic](https://www.linkedin.com/in/vitalie-melnic/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Microverse
