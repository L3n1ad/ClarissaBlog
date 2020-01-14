# Clarissa Blog App

This project is a simple blog app including admin and user authorisation, admin authorisation includes full control over comments and blog posts, geocoding to display locations on a map, a comment section and future plans to include rating system for posts and options to share posts easly on social media. A deployed version of the blog can be found on the following link: https://clarissa-blog.herokuapp.com/

## Getting Started

Instructions for API keys required for the app. It is important the use the following names for api keys because those names are used within the code to and .env recommended to secure api keys from public display

API keys require to run the app:

* [MongoDB](https://cloud.mongodb.com/)it's required only for deployment not for localhost running - MONGODB_PASSWORD=apikeygoeshere
* [Google Geocoder](https://console.cloud.google.com/) it's required to turn address from new blogs form to lang and long to be able display it on the map - GEOCODER_API_KEY=apikeygoeshere
* [Leaflat map API](https://leafletjs.com/) it's required to display a map - LEAFLET_API_KEY=apikeygoeshere

Set up environment variables for users invitation code it can be anything.

Naming needs to be used for those codes:

* [Invitation code] for general users - INVITATION_CODE=codekeygoeshere
* [Adming invitaion code] for users with admind permission - ADMIN_INVITATION_CODE=codekeygoeshere

### Prerequisites

Things needs to be installed for development, follow official documentations:

* MongoDB Compass

### Installing

A step by step series of examples that tell you how to get a development env running

To install all npm run the following code on the top level:

```
npm install
```

Run mongoDB on your local machine run the following code in the terminal and leave it running:

```
mongod
```

To run the app run the following code on the top level:

```
node app.js
```

It's recommended to install [nodemon] for easier development in this case to run the app the code is the following(server don't need to be restarted manually after every changes):

```
nodemon app.js
```


Once everything is running the app will be accessible on localhost:3001.

## Deployment

The app can be easily deployment for free on heroku servers with GitHub in order to do the please follow the instructions on the following link (https://devcenter.heroku.com/articles/git)

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [JavaScript](https://www.javascript.com/) - Main Language used
* [Express.js](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - Databe used for the project
* [Bootstrap](https://getbootstrap.com/) - Front-end component library used for styling the app
* [Body-parser](https://www.npmjs.com/package/body-parser) - NPM to be able handle data input coming from the new blog post
* [Google Geocoding API](https://console.cloud.google.com/) - Used to turn address to lang and long
* [Passport](https://www.npmjs.com/package/passport) - Used for authentication.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
