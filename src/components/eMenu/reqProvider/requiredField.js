import React from 'react';
import _ from 'underscore';

import Question from './question';

const styles = {
    active: {
        display: 'block'
    },
    inactive: {
        display: 'none'
    }
};

const RequireProvider = (props) => {
    const questiondata = props.data.GetRequiredFieldsResponse.Products.RequiredFieldResponseProduct;

    return (
        <div>
            
            <div className="row rootborder">
                {props.IsEdit == false ? (<div className="col-xs-12 emenucol-head">
                    <span className="emenuHead">Required Provider Question</span><strong style={{ float: 'right', cursor: 'pointer', textDecoration: 'underline', color: '#3f3fb5' }}
                        onClick={props.events.editEMenu}>Edit</strong>
                </div>) :
                    (<section className="acc">
                        <p className="emenuHead">Required Provider Question</p>
                        <div className="col-xs-12">
                            {
                                _.map(questiondata, function (category, idx) {
                                    return (_.map(category.GroupedCategory, function (qs, catname) {
                                        return _.map(qs, function (q, i) {
                                            return (q.Required == 'Y' && (q.ControlType == 'RadioButton' || (q.FieldValues !== undefined && q.FieldValues.FieldValue.length >4))  ?
                                                (<Question key={category.ClientProductId.toString()+i + 'q'} categoryName={catname} clientproductId={category.ClientProductId} data={q} qId={i + 'q'} events={props.events.eMenuOptionselect} />) : null)
                                        })
                                    }))
                                })
                            }
                            <div className="btn btn-primary pull-right" onClick={props.events.eMenuOnsave}>Save</div>
                        </div>

                    </section>)}
            </div>
        </div>
    )
}

export default RequireProvider;