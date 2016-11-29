![image](https://github.com/clarkritchie/Strava-Bike-Service/blob/master/api_logo_pwrdBy_strava_stack_gray.png?raw=true)

# Strava Bike Service client

This application is a simple React front end for my [Strava Bike Service server](https://github.com/clarkritchie/strava-bike-service-server).  It was built with Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app) boostrapping tool.

Its purpose is to subtotal rides times, by bike, using data from [Strava](http://www.strava.com).  Subtotals are used to determine whether or not service is required, e.g. every 30 hours, every 50 hours, etc.  It was designed to help me track when to service the suspension components (dust seals, fork oil, etc.) on my mountain bikes.

Some setup is required -- see usage instructions in `Help.js`.  Uses OAuth for Strava authentication.

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

### Demo
* Installed [here](https://sbs.everylayer.io)
* Example:

![image](http://g.recordit.co/EZECP0qG33.gif)
