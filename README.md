# Project Title

This project is a simple blog app including admin and user authorisation, admin authorisation includes full control over comments and blog posts, geocoding to display locations on a map, a comment section and future plans to include rating system for posts and options to share posts easly on social media.

## Getting Started

API keys require to run the app:

* It is important the use the following names for api keys because those names are used within the code to and .env recommended to secure api keys from public display

* [MongoDB]it's required only for deployment not for localhost running - MONGODB_PASSWORD=apikeygoeshere
* [Google Geocoder] it's required to turn address from new blogs form to lang and long to be able display it on the map - GEOCODER_API_KEY=apikeygoeshere
* [Leaflat map API] it's required to display a map - LEAFLET_API_KEY=apikeygoeshere
* [Invitation code] for general users - INVITATION_CODE=apikeygoeshere
* [Adming invitaion code] for users with admind permission - ADMIN_INVITATION_CODE=apikeygoeshere

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [JavaScript](https://maven.apache.org/) - Dependency Management
* [Express.js](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [MongoDB](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Bootstrap](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Multer](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Body-parser](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Google Geocoding API](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Passport](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
