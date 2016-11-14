# Strava Bike Service client

This application is a simple web front end for my Strava Bike Service server, built using [create-react-app](https://github.com/facebookincubator/create-react-app).

Its purpose is to subtotal rides times, by bike, using data from Strava.  Subtotals are used to determine whether or not service is required.

There is some setup required -- see usage instructions.  Uses OAuth for Strava authentication.

### Run
* `npm install`
* `npm start` to run locally with development server
* `npm run build` to produce a minified production version that can be servived up by a web server

### Nginx
* In your virtual host config, serve it up as such:
```
location / {
    root  /path/to/app/build/;
    try_files $uri /index.html;
}
```
