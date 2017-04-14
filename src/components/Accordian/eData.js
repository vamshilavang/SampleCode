import React from 'react';
import _ from 'underscore';

import Question from '../common/question.js';
import Data from '../../mockAPI/data.js';
import HttpHelper from '../../Helper/httpHelper';

const styles = {
    active: {
        display: 'block'
    },
    inactive: {
        display: 'none'
    }
};

class Accordion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: Data.Questions,
            saveEMenu: true
        };
        this.data = {};
        this.data.eMenusecOne = [];
        this.data.eMenusecOneObject = {};
        this.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        this.editEMenu = this.editEMenu.bind(this);
        this.eMenuOnsave = this.eMenuOnsave.bind(this);
        this.getMappedRequiredField = this.getMappedRequiredField.bind(this);
    }

    componentDidMount() {
        //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
        //this.state.dealerInfo = HttpHelper('http://192.168.17.32:6100/api/dealer-products','get')/** Uncomment it and fetch the dealer product */
        this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
        console.log(this.state.dealerProduct);
        // plz fetch SendRequestToBE
        this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
        //this.state.responseTomap = HttpHelper(api,'get');
        console.log(this.state.responseTomap);
        //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
        this.state.responseTomap.Products = this.getMappedRequiredField();
        
        this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
        //let requestData = HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json','post',this.state.responseTomap) /**uncomment it to fetch data from server for reqFieldResponseUI */
    }


    getMappedRequiredField() {
        let responseTomap = this.state.responseTomap.Products;
        let mappedData = [];
        _.each(this.state.dealerProduct.results, function (item, i) {
            if (item['is_rateable']) {
                _.each(responseTomap, function (childitem,idx) {
                    if ((item['category_code'] == childitem['ProductTypeCode'])
                    &&(item['provider_code']==childitem['ProviderId'])
                    &&(item['dealer_id']==childitem['ProviderDealerId'])){
                        mappedData.push(childitem);
                    }
               });
            }
        });
        return mappedData;
    }

    eMenuOptionselect(qid, optvalue) {
        //console.log(qid + " " +optvalue);
        let insertIndex = -1;
        if (this.state.questions.length > 0) {
            //let keys = Object.keys(this.data.eMenusecOne)          

            this.state.questions[qid.split('q')[0]]
                .choices.forEach(function (item, i) {
                    if (item.value == optvalue) {
                        item.selected = true;
                    }
                    else {
                        item.selected = false;
                    }

                })

        }
        this.setState({ "questions": this.state.questions });
        //console.log(this.data.eMenusecOne)

    }

    eMenuOnsave() {
        this.setState({ saveEMenu: false });
        //let data = HttpHelper('https://jsonplaceholder.typicode.com/posts/1','get')
    }

    editEMenu() {
        this.setState({ "saveEMenu": true });
        //this.setState({"questions":this.data.eMenusecOne})
    }


    render() {
        const accordionToggle = this.props.active ? 'active' : 'inactive';

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 nopadding-left">
                        <strong className="col-xs-2 nopadding-left">eMenu</strong><span className="col-xs-2"><span>$</span><span>total</span></span></div>
                </div>
                <div className="row rootborder">
                    {this.state.saveEMenu == false ? (<div className="col-xs-12 emenucol-head">
                        <span className="emenuHead">Required Provider Question</span><strong style={{ float: 'right', cursor: 'pointer', textDecoration: 'underline', color: '#3f3fb5' }}
                            onClick={this.editEMenu}>Edit</strong>
                    </div>) :
                        (<section className="acc">
                            <p className="emenuHead">Required Provider Question</p>
                            <div className="col-xs-12">

                                {
                                    this.state.questions.map((q, i) => {
                                        return <Question key={i + 'q'} data={q} qId={i + 'q'} events={this.eMenuOptionselect} />
                                    })
                                }
                                <div className="btn btn-primary pull-right" onClick={this.eMenuOnsave}>Save</div>
                            </div>

                        </section>)}
                </div>
            </div>
        )
    }

}

export default Accordion;