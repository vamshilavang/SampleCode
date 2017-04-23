import React, { Component } from 'react';
import _ from 'underscore';

import HttpHelper from '../../Helper/httpHelper';
import RequireProvider from './reqProvider/requiredField';
import TermRate from './termAndRateOption/termRate';
import ProductHeading from './productView/productHeading';

export default class eMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saveEMenu: true,
            products: [],
            active: true
        };
        this.events = {};
        this.data = {};
        this.data.eMenusecOne = [];
        this.data.eMenusecOneObject = {};
        this.events.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        this.events.editEMenu = this.editEMenu.bind(this);
        this.events.eMenuOnsave = this.eMenuOnsave.bind(this);
        this.events.eMenuSelect = this.eMenuSelect.bind(this);
        //this.events.handleChange = this.handleChange.bind(this);
        this.getMappedRequiredField = this.getMappedRequiredField.bind(this);
        this.getRenderdataFields = this.getRenderdataFields.bind(this);
        this.createReqFieldResponse = this.createReqFieldResponse.bind(this);
        this.createRequestdataTosend = this.createRequestdataTosend.bind(this);
    }

    //  componentDidMount() {
    //    //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
    //    HttpHelper('http://192.168.17.32:6100/api/deal/v1/dealer-products/', 'get').then(function (data) {
    //      this.state.dealerProduct = data;
    //      this.state.responseTosend = this.createReqFieldResponse();
    //      this.createRequestdataTosend();
    //    }.bind(this));/** Uncomment it and fetch the dealer product */
    //    //this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
    //
    //    // plz fetch SendRequestToBE
    //    //this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
    //
    //    //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
    //
    //
    //    //this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    // /**uncomment it to fetch data from server for reqFieldResponseUI */
    //
    //  }

    componentDidMount() {
        //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))

        this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
        this.state.responseTosend = this.createReqFieldResponse();
        // plz fetch SendRequestToBE
        this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');

        //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
        this.state.responseTomap.Products = this.getMappedRequiredField();

        this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
        this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
        this.setState({ "products": this.state.reqFieldResponseUI.Products });

    }



    createRequestdataTosend(){
        HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json', 'post', this.state.responseTosend).then(function (data) {
            this.state.responseTomap = data;
            this.state.reqFieldResponseUI = data;
            this.state.reqFieldResponseUI.Products  = this.getMappedRequiredField();
            this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
            this.setState({ "products": this.state.reqFieldResponseUI.Products });
            //this.createRequiredJson();
        }.bind(this));
    }

    createReqFieldResponse() {
        let dataTosend = {};
        dataTosend["KeyData"] = {"ClientId": "DEM", "ClientDealerId": this.state.dealerProduct.results[0].dealer_id,
            "DTDealerId": this.state.dealerProduct.results[0].dealer_id, "RequestDate": "\/Date(1472097614353)\/"};

        dataTosend["Vehicle"] =  { "BookType": "1",  "Type": "1" };
        dataTosend["Finance"] = { "DealType": "1"};

        debugger;
        let productArray = [];
        let productObject = {};
        let returnResponse;
        _.each(this.state.dealerProduct.results, function (item, index) {
            productObject = {
                "ProductTypeCode": item.category_code,
                "ProviderId": item.provider_code,
                "ProviderDealerId": ""
            }
            productArray.push(productObject);
        })
        dataTosend['Products'] = productArray;

        return dataTosend;
    }

    getMappedRequiredField() {
        let responseTomap = this.state.responseTomap.Products;
        let mappedData = [];
        _.each(this.state.dealerProduct.results, function (item, i) {
            if (item['is_rateable']) {
                _.each(responseTomap, function (childitem, idx) {
                    if (('VSC' == childitem['ProductTypeCode'])
                        && (item['provider_code'] == childitem['ProviderId'])) {
                        mappedData.push(childitem);
                    }
                });
            }
        });
        return mappedData;
    }

    getRenderdataFields() {
        let grpResponseObj = {};
        let RequiredFieldResponseProduct = this.state.reqFieldResponseUI.Products;
        _.each(RequiredFieldResponseProduct, function (item, idx) {
            _.each(item.Fields, function (childitem, index) {
                if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
                    grpResponseObj[childitem.Category] = [];
                }
                if (childitem.Required == 'Y' && childitem.Category != 'Vehicle'
                    && childitem.ControlType != 'NA') {
                    if (childitem.FieldValues && childitem.FieldValues.length > 4) {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                    else {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                }
            });
            RequiredFieldResponseProduct[idx]['GroupedCategory'] = grpResponseObj;
            grpResponseObj = {};
        })
        return RequiredFieldResponseProduct
    }

    eMenuOptionselect(ClientProductId, qid, catname, optvalue, caption) {
        //console.log(qid + " " +optvalue);
        let questiondata = this.state.reqFieldResponseUI.Products;
        let insertIndex = -1;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
                    return (_.map(category.GroupedCategory, function (qs, i) {
                        if (i == catname) {
                            return _.map(qs, function (q, i) {
                                if (q.Required == 'Y' && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length <= 4))) {
                                    return q.Value = optvalue.Code;
                                } else if (q.Required == 'Y' && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                                    return q.Value = optvalue.target == undefined ? optvalue.Code : optvalue.target.value;
                                }
                            })
                        }
                    }))
                }
            })


            // this.state.questions[qid.split('q')[0]]
            //   .choices.forEach(function (item, i) {
            //     if (item.value == optvalue) {
            //       item.selected = true;
            //     }
            //     else {
            //       item.selected = false;
            //     }
            //   })
        }
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
    }

    eMenuSelect(ClientProductId, qid, catname, optvalue) {
        console.log("called");
    }

    eMenuOnsave() {
        this.setState({ "saveEMenu": false });
        //let data = HttpHelper('https://jsonplaceholder.typicode.com/posts/1','get')
    }

    editEMenu() {
        this.setState({ "saveEMenu": true });
        //this.setState({"questions":this.data.eMenusecOne})
    }

    render() {
        return (
            <div>
                {this.state.reqFieldResponseUI ?

                      <RequireProvider header='eMenu' IsEdit={this.state.saveEMenu} data={this.state.reqFieldResponseUI} events={this.events} />
                     :
                    null}
              <TermRate events={this.events.eMenuOnsave}/>
                {!this.state.saveEMenu?

                      <ProductHeading/>
                    :null}
            </div>
        );
    }
}
