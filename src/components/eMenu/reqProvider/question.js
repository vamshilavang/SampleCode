import React from 'react';
import _ from 'underscore';

import Radio from '../../common/radioBtn'
import Select from '../../common/select'

const Question = (props) => {
    console.log("choices");
    return (
        <div>
            {props.data.FieldValues != undefined && props.data.FieldValues.length > 0 ?
                <span>
                    <div>{props.data.Caption}</div>
                    <form>
                        <div className="radio" style={{ marginTop: '0px' }}>
                            <div className="control-group" style={{ padding: '0px' }}>
                                {props.data.FieldValues != undefined && props.data.FieldValues.length <= 4 ?
                                    _.map(props.data.FieldValues, function (c, i) {
                                        return <Radio key={props.clientproductId + "-" + i} caption={props.data.Caption} data={c} categoryName={props.categoryName} clientProductId={props.clientproductId} selected={props.data.Value == c.Code ? true : false} qId={props.qId} events={props.events.eMenuOptionselect} />
                                    }) : <Select data={props.data} categoryName={props.categoryName} caption={props.data.Caption} clientProductId={props.clientproductId} qId={props.qId} events={props.events.eMenuOptionselect} />
                                }
                            </div>
                        </div>
                    </form>
                </span> : null}
        </div>
    )
}

export default Question;    