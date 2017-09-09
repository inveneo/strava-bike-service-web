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
            athlete: null, // detailed athelete info, used to be returned with the OAuth token exchange
            data: [], // array of bike and ride data
            serviceInterval: 30, // default, in hours
            error: null,
            loading: false
        }
    },
    componentDidMount() {
        var params = getQueryParams(window.location.search);
        if (params && params.code) {
            // this is a temporary authorization code, get the full code now
            this.getAccessCode(params.code);
        }
    },
    getAccessCode(code) {
        // get access code from temp code
        var self = this;
        var server = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:3000' : 'https://sbs-server.everylayer.io';
        $.ajax({
            type: 'post',
            url: `${server}/v1/code`,
            data: JSON.stringify({code: code}),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                self.setState({ stravaData: data }, () => {
                    // fetch detailed athelete info, which includes bikes and whatnot
                    self.getAthlete();
                });
            },
            error: function(err) {
                self.setState({error: err.responseText});
            }
        });
    },
    getAthlete() {
        var self = this;

        this.setState({loading: true}, () => {
            var server = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:3000' : 'https://sbs-server.everylayer.io';
            $.ajax({
                type: 'get',
                url: `${server}/v1/athlete/${this.state.stravaData.athlete.id}`,
                headers: { },
                contentType: 'application/json; charset=utf-8',
                success: function(athlete) {
                    self.setState({
                        athlete: athlete,
                        loading: false
                    }, () => {
                        // now fetch ride detail
                        self.getBikesAndRides();
                    })
                },
                error: function(err) {
                    self.setState({error: err.responseText, loading: false});
                }
            });

        });
    },
    getBikesAndRides() {
        var self = this;

        var data = {
            athleteId: this.state.athlete.id,
            bikes: this.state.athlete.bikes
        }

        this.setState({loading: true}, () => {
            var server = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:3000' : 'https://sbs-server.everylayer.io';
            $.ajax({
                type: 'post',
                url: `${server}/v1/ridetimes`,
                data: JSON.stringify(data),
                headers: { },
                contentType: 'application/json; charset=utf-8',
                success: function(data) {
                    self.setState({
                        data: data,
                        loading: false
                    });
                },
                error: function(err) {
                    self.setState({
                        error: err.responseText,
                        loading: false
                    });
                }
            });

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
                    <Button bsStyle='primary' onClick={this.clearState}>Start Over</Button>
                </p>
            );
        }

        var moreInfo;
        var data;
        var serviceInterval;
        if (this.state.stravaData && this.state.athlete) {
            moreInfo = (
                <span>for {this.state.athlete.username}</span>
            )
        }

        if (this.state.loading) {
            serviceInterval = (
                <div className='loader'>Loading Strava data...</div>
            );
        } else {
            if (this.state.data.length) {
                serviceInterval =(
                    <ServiceInterval
                        active={this.state.serviceInterval}
                        onClick={this.setServiceInterval}
                    />
                );
                data = (
                    <ServiceData
                        data={this.state.data}
                        serviceInterval={this.state.serviceInterval}
                    />
                );
            }
        }

        var error;
        if (this.state.error && this.state.error.length) {
            var e = JSON.parse(this.state.error);
            error = (
                <div className='alert alert-danger' role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    <span className='glyphicon-padding'>
                        {e.message}
                    </span>
                </div>
            )
        }

        return (
            <div>
                <div className='row app-top'>
                    <div className='col-xs-8 col-xs-offset-2'>
                        <div className='well'>
                            <h2 className='text-center'>
                                MTB Service Details {moreInfo}
                            </h2>
                            <h4 className='text-center'>
                                Your rides times, subtotaled by mountain bike
                            </h4>
                            <img role='presentation' className='img-responsive center-block' src={PoweredByStrava}/>

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
