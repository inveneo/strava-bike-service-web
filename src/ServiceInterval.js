import React from 'react';

var ServiceInterval = React.createClass({
    getDefaultProps() {
        return {
            active: null, // currently selected
            onClick: null // what to do when clicked!
        }
    },
    handleClick(v) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(v);
        }
    },
    render() {
        var self = this;

        var values = [5,10,20,30,45,60,75,100,150,200];
        var items = values.map(function(v, i) {

            var active;
            if (v === self.props.active) {
                active='active';
            }

            return (
                <li key={i} className={active}>
                    <a href='#' onClick={()=>self.handleClick(v)}>{v}</a>
                </li>
            )
        });

        return (
            <div className='text-center'>
                <ul className='pagination'>
                    <h4>
                        Select a service interval, in hours
                    </h4>
                    {items}
                </ul>
            </div>
        )
    }
});

export default ServiceInterval;
