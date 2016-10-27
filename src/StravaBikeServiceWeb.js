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
        if (!this.state.token) {
            connectWithStrava = (<StravaLogin/>);
        }

        var athlete;
        if (this.state.token && this.state.token.athlete) {
            athlete = (
                <dl>
                    <dt>Name</dt>
                    <dd>{this.state.token.athlete.firstname} {this.state.token.athlete.lastname}</dd>
                    <dt>Strava Username</dt>
                    <dd>{this.state.token.athlete.username}</dd>
                </dl>
            );
        }

        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2'>

                    <div className='text-center'>
                        <h2>Strava Bike Service Data</h2>

                        <p className='text-center text-muted'>Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>

                        {connectWithStrava}

                        {athlete}

                        <Button bsStyle='primary' onClick={this.clearState}>Clear State</Button>

                    </div>
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
