import React, { Component } from 'react';

// import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';

import StravaData from './StravaData';
import StravaLogin from './StravaLogin';

// import { Jumbotron,  } from 'react-bootstrap';

// var STRAVA_CLIENT_ID = 7610;
// var STRAVA_REDIRECT_URI = 'http://127.0.0.1:3001';

class StravaBikeServiceWeb extends Component {
    render() {
        //<StravaData />
        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2'>

                    <div className='text-center'>
                        <h2>Strava Bike Service Data</h2>

                        <p className='text-center text-muted'>Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>

                        <StravaLogin

                        />
                    </div>
                </div>
            </div>
        );
  }
}

export default StravaBikeServiceWeb;
