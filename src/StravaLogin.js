import React from 'react';
import strava from 'strava-v3';
import $ from 'jquery';
// import { Label } from 'react-bootstrap';
import _ from 'underscore';

var StravaLogin = React.createClass({
    getInitialState() {
        return {
            propsReady: false
        }
    },
    getDefaultProps() {
        return {
            STRAVA_CLIENT_ID: null,
            STRAVA_REDIRECT_URI: null
            // STRAVA_CLIENT_SECRET: null,
            // STRAVA_ACCESS_TOKEN: null
        }
    },
    componentDidMount() {
        // console.log('props are: ',);
        var self = this;
        _.each(_.keys(this.props), function(key, i) {
            // console.log('key: ', key,', i: ', i, ' length:', _.keys(self.props).length);
            // console.log('prop: ', self.props[key]);
            process.env[key] = self.props[key];
            if (i === (_.keys(self.props).length - 1)) {
                self.setState({propsReady: true});
            }
        });

    },
    // getStravaRequestAccessURL() {
    //     var self = this;
    //     if (this.state.propsReady) {
    //         // get the access url
    //         $.ajax({
    //             url: 'http://127.0.0.1:3000/v1/login',
    //             dataType: 'json',
    //             cache: false,
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    //             },
    //             success: function(data) {
    //                 console.log('success: ', data);
    //                 self.getStravaToken(data.url);
    //             },
    //             error: function(err) {
    //                 console.log('there was a problem getting strava request access url: ',err);
    //             }
    //         });
    //     }
    // },
    // getStravaRequestAccessURL() {
    //     // view_private
    //     var url = strava.oauth.getRequestAccessURL({scope: 'view_private'}); // scope is blank for read-only
    //
    //     // returns URL like: https://www.strava.com/oauth/authorize?client_id=7610&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001&response_type=code&scope=view_private
    //
    //     console.log('auth at: ',url);
    //     // window.location = url;
    //     this.getStravaToken(url);
    // },
    login(url) {
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:3000/v1/login',
            dataType: 'json',
            data: null,
            cache: false,
            headers: { },
            success: function(data) {
                console.log('success: ', data);
                if (data.url) {
                    self.getToken(data);
                }
            },
            error: function(err) {
                console.log('there was a problem getting strava redirect url: ',err);
            }
        });

        // var request = require('request');
        // request(url, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body) // Show the HTML for the Google homepage.
        //     }
        // })
    },
    getToken(data) {
        console.log('getToken: ', data)
        $.ajax({
            url: 'http://127.0.0.1:3000/v1/token',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            cache: false,
            headers: { },
            success: function(data) {
                console.log('success: ', data);
            },
            error: function(err) {
                console.log('there was a problem: ',err);
            }
        });
    },
    render() {
        return (
            <div>
                <a href='#' onClick={this.login}>
                    <img
                        src='/img/btn_strava_connectwith_orange.png'
                        alt='Connect with Strava'
                    />
                </a>
            </div>
        );
    }
});

module.exports = StravaLogin;
