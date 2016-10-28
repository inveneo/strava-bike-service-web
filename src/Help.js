import React from 'react';

var Help = React.createClass({
    getInitialState() {
        return {
            open: false
        }
    },
    handleClick() {
        console.log('click');
        this.setState({open: !this.state.open});
    },
    render() {
        var action = (<span>View</span>);
        if (this.state.open) {
            action = (<span>Hide</span>);
        }

        return (
            <div>
                <p className='text-center'>
                    <a data-toggle='collapse' href='#helpCollapse' onClick={()=>this.handleClick()} aria-expanded='false' aria-controls='helpCollapse'>
                        {action} Instructions <span className='glyphicon glyphicon-question-sign'></span>
                    </a>
                </p>

                <div className='collapse' id='helpCollapse'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <p className='lead'>Overview</p>
                            <ul>
                                <li>The purpose of this application is to calculate the amount
                                of time you've ridden each of your bikes since its last service.
                                </li>
                                <li>To achieve this, it subtotals ride times, by bike, using your own ride data from Strava.</li>
                                <li>It was originally designed to track when to service suspension parts on mountain bikes, and was inspired by <a href='http://www.pedalwrencher.com/'>Pedal Wrencher</a>.</li>
                            </ul>

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
                                <li>This application is read-only, i.e. it does not write to your Strava account or store any of your private data.</li>
                                <li>This application is experimental, and provided "as-is".  Suggestions may be sent by <a href='mailto&#58;&#99;%6Ca&#114;k&#114;itch&#105;e&#64;%79&#37;61hoo&#46;com'>email</a>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Help;
