import React from 'react';
import _ from 'underscore';

import Question from './question';
import Select from '../../common/select'

const styles = {
    active: {
        display: 'block'
    },
    inactive: {
        display: 'none'
    }
};

const RequireProvider = (props) => {
    const questiondata = props.data.Products;
    let checkprovideridList = [];
    let checkExistinCaption = [];
    let showCaption = false;
    return (
        <div className="row">
        {questiondata.length > 0?
            <div className="row rootborder">

                {props.IsEdit == false ? (<div className="col-xs-12 emenucol-head" style={{paddingTop:'0px'}}>
                    <span className="emenuHead">Required Provider Question</span><strong style={{ float: 'right', cursor: 'pointer', textDecoration: 'underline', color: '#3f3fb5' }}
                        onClick={props.events.editEMenu}>Edit</strong>
                </div>) :
                    (<section className="acc">
                        <p className="emenuHead">Required Provider Question</p>
                        <div className="col-xs-12" style={{ marginLeft: '5px', paddingBottom: '25px',paddingTop:'5px' }}>
                            {
                                _.map(questiondata, function (category, idx) {
                                    if (checkprovideridList.length <= 0 || checkprovideridList.indexOf(category.ProviderId) == -1) {
                                        checkprovideridList.push(category.ProviderId);
                                        checkExistinCaption = [];
                                    }
                                    return (_.map(category.GroupedCategory, function (qs, catname) {
                                        return _.map(qs, function (q, i) {
                                            if (checkExistinCaption.length < 0 || checkExistinCaption.indexOf(q.Caption) == -1) {
                                                checkExistinCaption.push(q.Caption);
                                                showCaption = true;
                                            } else {
                                                showCaption = false;
                                            }
                                            return (showCaption == true && q.Required == 'Y' && (q.ControlType != 'NA' && q.ControlType != 'Calendar' || (q.FieldValues !== undefined )) ?
                                                (<Question key={category.ClientProductId.toString() + i + 'q'} categoryName={catname} clientproductId={category.ClientProductId} data={q} qId={i + 'q'} events={props.events} />) : null)
                                        })
                                    }))
                                })
                            }
                            {/* <div className="btn btn-primary pull-right" onClick={props.events.eMenuOnsave}>Save</div>*/}
                        </div>
                    </section>)}
            </div>:null}
        </div>
    )
}

export default RequireProvider;
