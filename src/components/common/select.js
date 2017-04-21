import React from 'react';

const Select = (props) => {
    return (
        <div className="r-small-bottom-margin">
            <select className="form-control" style={{width:'auto'}}  value={props.data}
            onChange={(event)=>props.events(props.clientProductId,props.clientProductId+"-"+props.qId,props.categoryName,event)} >
                {
                    props.data.FieldValues.FieldValue.map((c, i) => {
                        return <option key={i} value={c.Code}>{c.Desc}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Select