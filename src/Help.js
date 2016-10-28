import React from 'react';

var Help = React.createClass({
    render() {
        return (
            <div>
                <p className='text-center'>
                    <a data-toggle='collapse' href='#helpCollapse' aria-expanded='false' aria-controls='helpCollapse'>
                        View Instructions
                    </a>
                </p>

                <div className='collapse' id='helpCollapse'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <p className='lead'>Overview</p>
                            <p>
                                The purpose of this application is to calculate the amount
                                of time you've ridden on each of your mountain bikes since
                                its last service.  It is important to service your
                                shocks regularly by changing the oil and replacing dust wipers!
                            </p>

                            <p className='lead'>Setup</p>
                            <ul>
                                <li>For each of your bicycles on Strava, put the date of its last service into the Notes field.</li>
                                <li>The date must be in the format YYYY-MM-DD.</li>
                                <li>Currently, this date can be the <em>only</em> item in the notes field.</li>
                                <li>This application only looks at mountain bikes.  Suck it, roadies!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Help;
