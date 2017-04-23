import React from 'react';

const Radio = (props) => {
    return (
        <label className="choices">
            <input type="radio" className="radio"
            name={props.clientProductId+"-"+props.qId} checked={props.selected} 
            onChange={()=>props.events(props.clientProductId,props.clientProductId+"-"+props.qId,props.categoryName,props.data,props.caption)} />
            <span>{props.data.Desc}</span>
        </label>
    )
}

export default Radio