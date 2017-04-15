import React from 'react';
import _ from 'underscore';

import Choice from '../../common/radioBtn'

const Question = (props) => {
    console.log("choices");
    return (
        <div >
            <div>{props.data.Caption}</div>
            <div>{props.data.Category}</div>
            <div className="control-group">
                {
                    _.map(props.data.FieldValues.FieldValue,function(c, i) {
                        return <Choice key={i} data={c} qId={props.qId} events={props.events} />
                    })
                }
            </div>
        </div>
    )
}

export default Question;