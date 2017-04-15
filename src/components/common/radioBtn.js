import React from 'react';

const Choices = (props) => {
    return (
        <label className="choices radio-inline">
            <input type="radio" className="radio" 
            name={props.qId} checked={props.data.selected} 
            onChange={()=>props.events(props.qId,props.data.Code)} />
            <span>{props.data.Desc}</span>
        </label>
    )
}

export default Choices