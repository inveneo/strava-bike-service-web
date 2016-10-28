import React from 'react';

import $ from 'jquery';
import ServiceInterval from './ServiceInterval';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';

import { Button } from 'react-bootstrap';

import StravaLogin from './StravaLogin';
import ServiceData from './ServiceData';
import Help from './Help';

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

var StravaBikeServiceWeb = React.createClass({
    getInitialState() {
        return this.getEmptyData();
    },
    getEmptyData() {
        return {
            code: null, // temporary access code, used to get full access_code
            stravaData: null, // includes access_token plus athlete data
            rides: [], // bikes with ride time since last service pre-calculated
            serviceInterval: 30, // default, in hours
            error: null
        }
    },
    componentDidMount() {
        var params = getQueryParams(window.location.search);
        if (params && params.code) {
            // this is a temporary authorization code, get the full code now
            console.log('strava temporary code: ',params.code);
            this.getAccessCode(params.code);
        }
    },
    getAccessCode(code) {
        var self = this;
        // get access code from temp code
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3000/v1/code',
            data: JSON.stringify({code: code}),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                // console.log('got back athlete: ', data.athlete.username);
                self.setState({ stravaData: data }, function() {
                    self.getRides();
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    getRides() {
        var self = this;
        // console.log('getRides: ',self.state.stravaData);
        var data = {
            accessToken: this.state.stravaData.access_token,
            athleteId: this.state.stravaData.athlete.id,
            bikes: this.state.stravaData.athlete.bikes
        }

        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3000/v1/ridetimes',
            data: JSON.stringify(data),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                console.log('got ride times: ', data);
                self.setState({rides: data})
            },
            error: function(err) {
                console.log('setting error: ', JSON.parse(err.responseText));
                self.setState({error: err.responseText});
            }
        });
    },
    clearState() {
        // for debugging, clear state
        this.setState(this.getEmptyData());
    },
    setServiceInterval(value) {
        this.setState({serviceInterval: value});
    },
    render() {
        // if there's no code, show the connect to strava button
        var connectWithStrava;
        var debug;
        if (!this.state.stravaData) {
            connectWithStrava = (<StravaLogin/>);
        } else {
            debug = (
                <p className='text-center'>
                    <Button bsStyle='primary' onClick={this.clearState}>Clear State</Button>
                </p>
            );
        }

        var moreInfo;
        var data;
        if (this.state.stravaData && this.state.stravaData.athlete) {
            moreInfo = (
                <span>for {this.state.stravaData.athlete.username}</span>
            )
        }

        if (this.state.rides && this.state.rides.length) {
            data = (
                <ServiceData
                    rides={this.state.rides}
                    serviceInterval={this.state.serviceInterval}
                />
            );
        }

        var athlete = (
            <div>
                <p className='text-center'>
                    <h2>Strava Bike Service Data {moreInfo}</h2>
                    <p className='text-center text-muted'>
                        Subtotal ride times for each mountain bike.
                    </p>
                </p>

            </div>
        );

        var error;
        if (this.state.error && this.state.error.length) {
            var e = JSON.parse(this.state.error);
            console.log(e);
            error = (
                <div className='alert alert-danger' role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    &nbsp;{e.message}
                </div>
            )
        }

        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2'>

                    <p className='text-center'>
                        <h2>Strava Bike Service Data {moreInfo}</h2>
                        <h4>
                        Subtotal ride times for your mountain bikes
                        </h4>
                    </p>

                    <Help/>

                    {<ServiceInterval
                        active={this.state.serviceInterval}
                        onClick={this.setServiceInterval}
                    />}

                    <p className='text-center'>
                        {connectWithStrava}
                    </p>

                    {error}

                    {data}

                    {debug}

                </div>

            </div>
        )
    }
});

export default StravaBikeServiceWeb;
