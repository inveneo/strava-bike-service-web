![image](https://github.com/clarkritchie/Strava-Bike-Service/blob/master/api_logo_pwrdBy_strava_stack_gray.png?raw=true)

# Strava Bike Service client

This application is a simple web front end for my [Strava Bike Service server](https://github.com/clarkritchie/strava-bike-service-server), built with React using [create-react-app](https://github.com/facebookincubator/create-react-app).

Its purpose is to subtotal rides times, by bike, using ride data from [Strava](http://www.strava.com).  Subtotals are used to determine whether or not service is required, e.g. every 30 hours, every 50 hours, etc.  It was designed primarily to help track when to service suspension components (dust seals, fork oil, etc.).

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
* https://sbs.everylayer.io
![image](http://g.recordit.co/EZECP0qG33.gif)
