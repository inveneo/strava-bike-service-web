import React from 'react';
import { Label } from 'react-bootstrap';
import _ from 'underscore';
import moment from 'moment';
require('moment-duration-format');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    secondsToHm(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        return ((h > 0 ? h + ":" + (m < 10 ? '0' : '') : '') + m);
    },
    getDefaultProps() {
        return {
            data: [],
            serviceInterval: 30
        }
    },
    render() {
        var self = this;
        var bikes;

        if (this.props.data.length) {
            // hours to minutes to seconds
            var serviceIntervalMins = self.props.serviceInterval * 60;
            bikes = this.props.data.map((item, i) => {
                var textLabel = 'text-primary';
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

                if (item.bike.minutes > serviceIntervalMins) {
                    textLabel = 'text-danger';
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
                }

                var time = moment.duration(item.bike.minutes, 'minutes').format('h:mm');
                return (
                    <li className='list-group-item' key={i}>
                        <h2 className={textLabel}>{item.bike.name}</h2>
                        <dl className='dl-horizontal'>
                            <dt>
                                Last Ride
                            </dt>
                            <dd>
                                <a href={item.last.url}>{item.last.name}</a>
                            </dd>
                            <dt>
                                Last Ride
                            </dt>
                            <dd>
                                {moment(item.last.date).format('LLL')}
                            </dd>
                            <dt>
                                Last Service
                            </dt>
                            <dd>
                                {moment(item.bike.lastService*1000).format('LL')}
                            </dd>
                            <dt>
                                Ride Time
                            </dt>
                            <dd>
                                {time} ({numberWithCommas(item.bike.minutes)} minutes)
                            </dd>
                            <dt>
                                Service Status
                            </dt>
                            <dd>
                                {serviceLabel}
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
