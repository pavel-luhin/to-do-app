# Sample TO-DO app written on MEAN stack.

Be sure that your machine have installed NodeJS with npm.

## Steps to start the app:
1. npm install
2. bower install
3. gulp build
4. node server.js
By default, server is connecting to MongoDB on 27017 port with db name 'to-do-db'.
To start develop server, gulp must be called with 'serve' argument to start watchers.

## Some options:
1. Changing default application port: specify variable PORT=%port_number% while starting.
2. Changing default DB params:
specify any/all of these variables while starting
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- DB_PORT
- DB_URL