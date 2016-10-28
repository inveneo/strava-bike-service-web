import React from 'react';

var Help = React.createClass({
    render() {
        return (
            <div>
                <p className='text-center'>
                    <a data-toggle='collapse' href='#helpCollapse' aria-expanded='false' aria-controls='helpCollapse'>
                        View Instructions <span className='glyphicon glyphicon-question-sign'></span>
                    </a>
                </p>

                <div className='collapse' id='helpCollapse'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <p className='lead'>Overview</p>
                            <p>
                                The purpose of this application is to calculate the amount
                                of time you've ridden each of your bikes since its last service.
                            </p>

                            <p className='lead'>Setup</p>
                            <ul>
                                <li>For each of your bicycles on Strava, put the date of its last service into the Notes field.</li>
                                <li>The date must be in the format YYYY-MM-DD.</li>
                                <li>Click "Connect with Strava" and authorize the application.</li>
                                <li>Pick a service interval.  Default is 30 hours.</li>
                            </ul>

                            <p className='lead'>Errata</p>
                            <ul>
                                <li>Currently, this date can be the <em>only</em> item in the Notes field.</li>
                                <li>This application only looks at mountain bikes.  Suck it, roadies!</li>
                                <li>This application is read only and does not write to your Strava account or store any of your private data.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Help;
