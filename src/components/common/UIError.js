import React from 'react';

export class UIError extends React.Component {
    render() {
        return (<div className="control-group error">
            <div className="controls help-block err">{this.props.errormsg}</div>
        </div>);
    }
}