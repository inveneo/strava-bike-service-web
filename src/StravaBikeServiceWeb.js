import React from 'react';

import $ from 'jquery';
import ServiceInterval from './ServiceInterval';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../public/custom.css';
import PoweredByStrava from '../public/img/api_logo_pwrdBy_strava_horiz_light.png';

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
        // get access code from temp code
        var self = this;
        var server = process.env.NODE_ENV ? 'https://clark-server.everylayer.io' : 'http://127.0.0.1:3000';
        $.ajax({
            type: 'post',
            url: server + '/v1/code',
            data: JSON.stringify({code: code}),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                self.setState({ stravaData: data }, function() {
                    self.getRides();
                });
            },
            error: function(err) {
                console.log(err);
                self.setState({error: err.responseText});
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

        var server = process.env.NODE_ENV ? 'https://clark-server.everylayer.io' : 'http://127.0.0.1:3000';
        $.ajax({
            type: 'post',
            url: server + '/v1/ridetimes',
            data: JSON.stringify(data),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                console.log('got ride times: ', data);
                self.setState({rides: data})
            },
            error: function(err) {
                console.log(err);
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
        var serviceInterval;
        if (this.state.stravaData && this.state.stravaData.athlete) {
            moreInfo = (
                <span>for {this.state.stravaData.athlete.username}</span>
            )
        }

        if (this.state.rides && this.state.rides.length) {
            serviceInterval =(
                <ServiceInterval
                    active={this.state.serviceInterval}
                    onClick={this.setServiceInterval}
                    />
                );
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
            error = (
                <div className='alert alert-danger' role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign glyphicon-padding' aria-hidden='true'></span>
                    {e.message}
                </div>
            )
        }

        return (
            <div>
                <div className='row app-top'>
                    <div className='col-xs-8 col-xs-offset-2'>
                        <div className='well'>
                            <h2 className='text-center'>
                                Bike Service Details {moreInfo}
                            </h2>
                            <h4 className='text-center'>
                                Ride time subtotals, by bike
                            </h4>
                            <img className='img-responsive center-block' src={PoweredByStrava}/>

                        </div>

                        <Help/>

                        {connectWithStrava}

                        {serviceInterval}
                        {error}
                        {data}

                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-12'>
                        {debug}
                    </div>
                </div>
            </div>
        )
    }
});

export default StravaBikeServiceWeb;
