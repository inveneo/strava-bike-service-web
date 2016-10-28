import React from 'react';
import { Label } from 'react-bootstrap';
import $ from 'jquery';
import _ from 'underscore';
import dateFormat from 'date-format-lite';

var ServiceData = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    },
    getDefaultProps() {
        return {
            rides: [],
            serviceInterval: 30
        }
    },
    render() {
        // console.log(this.props.rides.length);
        console.log('using service interval: ',this.props.serviceInterval);

        var self = this;
        var bikes;
        if (this.props.rides && this.props.rides.length) {

            // hours to minutes
            var serviceInterval = self.props.serviceInterval * 60 * 60;
            bikes = this.props.rides.map(function(bike, i) {
                console.log(bike);

                var lastServiceDate = new Date(bike.lastService * 1000);
                console.log('bike.lastServiceDate: ',lastServiceDate);

                // compute how much time is left
                var left = serviceInterval - (bike.minutes / 60) * 60;
                // console.log('serviceInterval: ',serviceInterval);
                // console.log('bike.minutes: ',bike.minutes);
                // console.log('Left: ', left);

                // boolean if service is due or not
                var due = (bike.minutes >= serviceInterval) ? true : false;

                // weave in our info
                bike['due'] = due,
                // bike['lastService'] = lastServiceDate;
                bike['lastServiceFormatted'] = lastServiceDate.format('MMM D YYYY');
                bike['timeSince'] = self.secondsToHms(bike.minutes);

                var l = (left > 0 ? self.secondsToHms(left) : 'Overdue for service');
                bike['timeUntil'] = l;

                // console.log('bike: ',bike);

                var serviceLabel = (
                    <div>
                        <Label bsStyle='success'>
                            <span className='glyphicon glyphicon-ok'></span>
                        </Label>
                    </div>
                );
                if (due) {
                    serviceLabel = (
                        <div>
                            <Label bsStyle='danger'>
                                <span className='glyphicon glyphicon-exclamation-sign'></span>
                            </Label>
                        </div>
                    );
                }

                return (
                    <li className='list-group-item' key={i}>
                        <dl className='dl-horizontal'>
                            <dt>
                                Bike
                            </dt>
                            <dd>
                                {bike.name}
                            </dd>

                            <dt>
                                Service Status
                            </dt>
                            <dd>
                                {serviceLabel}
                            </dd>

                            <dt>
                                Last Service Date
                            </dt>
                            <dd>
                                {bike.lastServiceFormatted}
                            </dd>

                            <dt>
                                Ride Time
                            </dt>
                            <dd>
                                {bike.timeSince}
                            </dd>

                            <dt>
                                Remaining Time
                            </dt>
                            <dd>
                                {bike.timeUntil}
                            </dd>
                        </dl>
                    </li>
                );
            });
        }

        return (
            <div>
                <ul className='list-group'>
                    {bikes}
                </ul>
                <p className='text-right text-info'>
                    <small>Using a service interval of {this.props.serviceInterval} hours</small>
                </p>
            </div>
        );
    }
});

module.exports = ServiceData;
