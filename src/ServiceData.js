import React from 'react';
import { Label } from 'react-bootstrap';
import _ from 'underscore';
import moment from 'moment';

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
        var self = this;
        var bikes;
        if (this.props.rides && this.props.rides.length) {
            // hours to minutes to seconds
            var serviceInterval = self.props.serviceInterval * 60 * 60;
            bikes = this.props.rides.map((bike, i) => {
                // compute how much time is left
                var left = serviceInterval - (bike.minutes / 60) * 60;

                // boolean if service is due or not
                var due = (bike.minutes >= serviceInterval) ? true : false;

                // weave in our info
                bike.due = due;
                bike.lastServiceFormatted = moment(bike.lastService * 1000).format('LL');
                bike.lastRideDateFormatted = moment(bike.lastRideDate).format('LLL');

                bike.timeSince = self.secondsToHms(bike.minutes);

                var l = (left > 0 ? self.secondsToHms(left) : 'Overdue for service');
                bike['timeUntil'] = l;

                var serviceLabel = (
                    <div>
                        <Label bsStyle='success'>
                            <span className='glyphicon glyphicon-ok'></span>
                        </Label>
                        <span className='glyphicon-padding'>
                            No service required
                        </span>
                    </div>
                );

                var textLabel = 'text-primary';
                if (due) {
                    serviceLabel = (
                        <div>
                            <Label bsStyle='danger'>
                                <span className='glyphicon glyphicon-exclamation-sign'></span>
                            </Label>
                            <span className='glyphicon-padding'>
                                Service is required
                            </span>
                        </div>
                    );
                    textLabel = 'text-danger';
                }

                return (
                    <li className='list-group-item' key={i}>
                        <h2 className={textLabel}>{bike.name}</h2>
                        <dl className='dl-horizontal'>
                            <dt>
                                Service Status
                            </dt>
                            <dd>
                                {serviceLabel}
                            </dd>

                            <dt>
                                Last Ride Date
                            </dt>
                            <dd>
                                {bike.lastRideDateFormatted}
                            </dd>

                            <dt>
                                Last Ride
                            </dt>
                            <dd>
                                <a href={bike.lastRideUrl}>{bike.lastRide}</a>
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
