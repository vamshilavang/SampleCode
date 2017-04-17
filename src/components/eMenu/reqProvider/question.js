import React from 'react';
import _ from 'underscore';

import Radio from '../../common/radioBtn'

const Question = (props) => {
    console.log("choices");
    return (
        <div >
            <div>{props.data.Caption}</div>
            <div className="control-group">
                {
                    _.map(props.data.FieldValues.FieldValue,function(c, i) {
                        return <Radio key={props.clientproductId+"-"+i} data={c} categoryName={props.categoryName} clientProductId={props.clientproductId} selected={props.data.Value==c.Code?true:false} qId={props.qId} events={props.events} />
                    })
                }
            </div>
        </div>
    )
}

export default Question;