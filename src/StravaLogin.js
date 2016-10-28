import React from 'react';
import strava from 'strava-v3';
import $ from 'jquery';
import _ from 'underscore';

var StravaLogin = React.createClass({
    getInitialState() {
        return {

        }
    },
    getDefaultProps() {
        return {
            STRAVA_CLIENT_ID: '7610',
            STRAVA_REDIRECT_URI: 'http://127.0.0.1:3001'
        }
    },
    requestAccess(url) {
        // get the request access URL from the server, send the user to that url,
        // the result of which should be a token
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:9000/v1/login',
            dataType: 'json',
            data: null,
            cache: false,
            headers: { },
            success: function(data) {
                console.log('success: ', data);
                // send the user on to authenticate this app
                window.location = data.url;
            },
            error: function(err) {
                console.log('there was a problem getting strava redirect url: ',err);
            }
        });
    },
    render() {
        return (
            <div>
                <a href='#' onClick={this.requestAccess}>
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
