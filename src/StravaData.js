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
            data: null
        }
    },
    getStravaData() {
        var self = this;
        console.log(self.props);
        var data = {
            accessToken: self.props.data.access_token,
            athleteId: self.props.data.athlete.id,
            bikes: self.props.data.athlete.bikes
        }
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3000/v1/times',
            data: JSON.stringify(data),
            // headers: { Authorization: self.props.data.access_token },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                console.log('data: ',data);
                self.setState({data: data})
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    componentDidMount() {
        if (this.props.data && this.props.data.access_token) {
            this.getStravaData();
        }
        // seconds
        // this.setState({serviceInterval: this.props.serviceInterval * 60 * 60}, function() {
        //     console.log('component mounted', this.state.serviceInterval);
        //     this.getStravaData();
        // });
    },
    render() {
        // var bikes;
        console.log(this.state.data);
        var bikes = this.state.data.map(function(b, i) {

            var due = (
                <Label bsStyle='success'>No</Label>
            );
            if (b.due) {
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
                            {b.timeSince}
                        </dd>

                        <dt>
                            Ride Time Until
                        </dt>
                        <dd>
                            {b.timeUntil}
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
