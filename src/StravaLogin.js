import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

var StravaLogin = React.createClass({
    getInitialState() {
        return {
            error: false
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
        var server = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:3000' : 'https://sbs-server.everylayer.io';
        $.ajax({
            url: server + '/v1/login',
            dataType: 'json',
            data: null,
            cache: false,
            headers: { },
            success: function(data) {
                // send the user on to authenticate this app
                window.location = data.url;
            },
            error: function(err) {
                // the server component is not running
                self.setState({error: true});
            }
        });
    },
    render() {
        if (this.state.error) {
            return (
                <div className='alert alert-danger' role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    <span className='glyphicon-padding'>
                        Sorry, there was a problem connecting to the Strava Bike Service server.  <a href='/'>Try again?</a>
                    </span>
                </div>
            );
        } else {
            return (
                <div>
                    <a href='#' onClick={this.requestAccess}>
                        <img src='/img/btn_strava_connectwith_orange.png' alt='Connect with Strava' className='img-responsive center-block' />
                    </a>
                </div>
            );
        }
    }
});

module.exports = StravaLogin;
