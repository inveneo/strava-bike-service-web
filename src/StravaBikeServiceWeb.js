import React from 'react';

import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';

import { Button } from 'react-bootstrap';

import StravaLogin from './StravaLogin';
import StravaData from './StravaData';

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
            code: null,
            token: null
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
        console.log('get access code from temp code: ',code);
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3000/v1/code',
            data: JSON.stringify({code: code}),
            headers: { },
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                console.log('athlete data: ',data);
                self.setState({
                    token: data
                })
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    clearState() {
        var self = this;
        console.log('clear state');
        console.log(this.state);
        this.setState(this.getEmptyData(), function() {
            console.log(self.state);
        });
    },
    render() {
        // if there's no code, show the connect to strava button
        var connectWithStrava;
        var debug;
        if (!this.state.token) {
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
        if (this.state.token && this.state.token.athlete) {
            moreInfo = (
                <span>for {this.state.token.athlete.username}</span>
            )
            data = (
                <StravaData
                    data={this.state.token}
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
                    <p className='text-center text-muted'>
                        If any bike has more than 30 hours of ride time, its time to for service!
                    </p>
                </p>
                {data}
            </div>
        );

        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2'>

                    {athlete}

                    <p className='text-center'>
                        {connectWithStrava}
                    </p>

                    {debug}

                </div>

            </div>
        )
    }
});

// class StravaBikeServiceWeb extends Component {
//     constructor(props) {
//         console.log('props: ', props);
//         var params = getQueryParams(window.location.search);
//         if (params.code) {
//             // this.setState({code: params.code});
//             this.state = {
//                 code: params.code
//             };
//         }
//
//         super(props);
//         this.state = {
//             code: props.code
//         };
//     }
//     render() {
//         return (
            // <div className='row'>
            //     <div className='col-sm-8 col-sm-offset-2'>
            //
            //         <div className='text-center'>
            //             <h2>Strava Bike Service Data</h2>
            //
            //             <p className='text-center text-muted'>Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
            //
            //             <StravaLogin/>
            //             <p>Code: {this.state.code}</p>
            //         </div>
            //     </div>
            // </div>
//         );
//     }
// }

export default StravaBikeServiceWeb;
