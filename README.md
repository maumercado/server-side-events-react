# MauGGer

A simple clone of Segment's event debugger.

## TODO:

-   Add meaninful automated tests for both client and server

## Installation and Getting started

Install bunyan with `npm install -g bunyan` so you can pipe logs on the terminal like `npm run server | bunyan -o short`

#### Installation and execution with Docker

You can download the image for this project by simply pulling `maumercado/debugger`, note that the port exposed is 4000.

You can also git clone this project and simply run `docker-compose up` from the root directory, as you can see the docker-compose.yml file contains 3 different images, a redis image which is used as a pub/sub for "events", an event creator or stream image, which is the publisher of "events", and of course the debugger which acts as the subscriber for receiving "events".

#### Manual Installation and execution

```
git clone git@github.com/segment-interviews/debugger-maumercado.git
cd debugger-maumercado
npm install-all
npm run server
```

Now go to http://localhost:4000/ you should see a running version of the debugger

## Running the tests

Simply run `npm run test`, for now it will simply run a couple of tests for the API, testing that is up, and it replies with a 200 for the /ping endpoint. As for the client side it tests that App.js or the initial point of the client side of this application renders correctly.

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

-   [ExpressJS](https://expressjs.com/) - Web application framework
-   [NPM](https://www.npmjs.com/) - Dependency Management
-   [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.

## Authors

-   **Mauricio Mercado** - _Everything_ ;) - [maumercado](https://github.com/maumercado)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Thanks to anyone whose code was used
