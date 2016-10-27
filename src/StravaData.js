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
            code: null
        }
    },
    getStravaData() {
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:3000/v1/times',
            type: 'POST',
            dataType: 'json',
            cache: false,
            headers: { Authorization: self.props.code },
            success: function(data) {
                console.log('data: ', data);
                // self.setState({ data: data });
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    componentDidMount() {
        console.log(this.props);
        if (this.props.code && this.props.code.length) {
            this.getStravaData();
        }
        // seconds
        // this.setState({serviceInterval: this.props.serviceInterval * 60 * 60}, function() {
        //     console.log('component mounted', this.state.serviceInterval);
        //     this.getStravaData();
        // });
    },
    render() {
        var bikes;
        // var bikes = this.state.data.map(function(b, i) {
        //     var due = (
        //         <Label bsStyle='success'>No</Label>
        //     );
        //     if (b.dueForService) {
        //         due = (<Label bsStyle='danger'>Yes</Label>);
        //     }
        //     return (
        //         <li className='list-group-item' key={i}>
        //             <dl className='dl-horizontal'>
        //                 <dt>
        //                     Bike
        //                 </dt>
        //                 <dd>
        //                     {b.name}
        //                 </dd>
        //
        //                 <dt>
        //                     Service Required
        //                 </dt>
        //                 <dd>
        //                     {due}
        //                 </dd>
        //
        //                 <dt>
        //                     Last Service
        //                 </dt>
        //                 <dd>
        //                     {b.lastService}
        //                 </dd>
        //
        //                 <dt>
        //                     Ride Time Since
        //                 </dt>
        //                 <dd>
        //                     {b.rideTimeSince}
        //                 </dd>
        //
        //                 <dt>
        //                     Ride Time Until
        //                 </dt>
        //                 <dd>
        //                     {b.rideTimeUntil}
        //                 </dd>
        //             </dl>
        //         </li>
        //     );
        // });

        return (
            <ul className='list-group'>
                {bikes}
            </ul>
        );
    }
});

module.exports = StravaData;
