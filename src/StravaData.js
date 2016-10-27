import React from 'react';
import { Label } from 'react-bootstrap';
import $ from 'jquery';
import _ from 'underscore';

var StravaData = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    getDefaultProps() {
        return {
            // athleteId: '2015655',
            // serviceInterval: 30,
            // STRAVA_ACCESS_TOKEN: '15ca3b998d71c73698bdc0475afa7ed4ee78effb',
            // STRAVA_CLIENT_ID: '7610',
            // STRAVA_CLIENT_SECRET: '2c9f14fd361502b2fd7b370418038f9302541e64',
            // STRAVA_REDIRECT_URI: 'localhost'
        }
    },
    getStravaData() {
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:3000/v1/times',
            dataType: 'json',
            cache: false,
            headers: { },
            success: function(data) {
                console.log('data: ', data);
                self.setState({ data: data });
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    componentDidMount() {
        // seconds
        this.setState({serviceInterval: this.props.serviceInterval * 60 * 60}, function() {
            console.log('component mounted', this.state.serviceInterval);
            this.getStravaData();
        });

    },
    render() {
        var bikes = this.state.data.map(function(b, i) {
            var due = (
                <Label bsStyle='success'>No</Label>
            );
            if (b.dueForService) {
                due = (<Label bsStyle='danger'>Yes</Label>);
            }
            return (
                <li className='list-group-item' key={i}>
                    <dl className='dl-horizontal'>
                        <dt>
                            Bike
                        </dt>
                        <dd>
                            {b.name}
                        </dd>

                        <dt>
                            Service Required
                        </dt>
                        <dd>
                            {due}
                        </dd>

                        <dt>
                            Last Service
                        </dt>
                        <dd>
                            {b.lastService}
                        </dd>

                        <dt>
                            Ride Time Since
                        </dt>
                        <dd>
                            {b.rideTimeSince}
                        </dd>

                        <dt>
                            Ride Time Until
                        </dt>
                        <dd>
                            {b.rideTimeUntil}
                        </dd>
                    </dl>
                </li>
            );
        });

        return (
            <ul className='list-group'>
                {bikes}
            </ul>
        );
    }
});

module.exports = StravaData;
