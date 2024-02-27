# Venue rating app API

Simple API for a fictional venue rating app. Supports the following endpoints:

* GET `{baseUrl}/api/locations` (gets all venues in the database with given pagination parameters)
* POST `{baseUrl}/api/locations` (stores new venue via request body)
* GET `{baseUrl}/api/locations/:id` (gets single venue by given ID)
* PATCH `{baseUrl}/api/locations/:id` (updates single venue by given ID)
* PATCH `{baseUrl}/api/locations` (updates all venues by given category via request body)
* DELETE `{baseUrl}/api/locations/:id` (deletes single venue from the database by ID)

## To install the dependencies and run:
```sh
npm i && npm run start
```

## To run unit tests:
```sh
npm run test
```

___
NOTE: Runs migrations to create and seed the "locations" table on start.
