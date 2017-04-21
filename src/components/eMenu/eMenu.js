import React, { Component } from 'react';
import _ from 'underscore';

import HttpHelper from '../../Helper/httpHelper';
import RequireProvider from './reqProvider/requiredField';

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
  }

  componentDidMount() {
    //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
    //this.state.dealerProduct = HttpHelper('http://192.168.17.32:6100/api/deal/v1/dealer-products/','get')/** Uncomment it and fetch the dealer product */
    this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
    console.log(this.state.dealerProduct);
    this.state.responseTosend = this.createReqFieldResponse();
    // plz fetch SendRequestToBE
   this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
    //this.state.responseTomap = HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json','post',this.state.responseTosend);
    console.log(this.state.responseTomap);
    //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
    this.state.responseTomap.Products = this.getMappedRequiredField();

    this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    //let requestData = HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json','post',this.state.responseTomap) /**uncomment it to fetch data from server for reqFieldResponseUI */
    this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
    this.setState({ "products": this.state.reqFieldResponseUI.Products });
  }

  createReqFieldResponse(){
    let dataTosend = {};
    dataTosend['KeyData'] =  {
      "ClientId": "DEM",
      "ClientDealerId": "1112016",
      "DTDealerId": "1112016",
      "RequestDate": "\/Date(1472097614353)\/"
   };
dataTosend['Vehicle'] =  {
      "BookType": "1",
      "Year": "0",
      "PurchasePrice": "0",
      "Odometer": "0",
      "PurchaseDate": "\/Date(1472097614353)\/",
      "Type": "1",
      "InServiceDate": "\/Date(1472097614353)\/",
      "VehicleAttributes": []
   };

      dataTosend['Finance'] =  {
      "DealType": "1",
      "MSRP": "0",
      "FinancedAmount": "0",
      "FinanceTerm": "0",
      "FinanceTerm2": "0",
      "FinanceApr": "0",
      "MonthlyPayment": "0",
      "FirstPaymentDate": "\/Date(1472097614353)\/",
      "DaysToFirstPayment": "0",
      "LeaseAnnualMileage": "0"
   }
     
    
    debugger;
    let productArray =[];
    let productObject ={};
    let returnResponse;
    _.each(this.state.dealerProduct.results,function(item,index){
                 productObject = {"ProductTypeCode":item.category_code,
                  "ProviderId": item.provider_code,
                  "ProviderDealerId": item.dealer_id,
                  "ClientProductId": "647644",
                  "ProviderProductId": ""}
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
          if ((item['category_code'] == childitem['ProductTypeCode'])
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

  eMenuOptionselect(ClientProductId, qid, catname, optvalue,caption) {
    //console.log(qid + " " +optvalue);
    let questiondata = this.state.reqFieldResponseUI.Products;
    let insertIndex = -1;
    if (questiondata.length > 0) {
      _.map(questiondata, function (category, idx) {
        if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
          return (_.map(category.GroupedCategory, function (qs, i) {
            if (i == catname) {
              return _.map(qs, function (q, i) {
                if (q.Required == 'Y' && q.Caption==caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length <= 4))) {
                  return q.Value = optvalue.Code;
                } else if (q.Required == 'Y'  && q.Caption==caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                  return q.Value = optvalue.target==undefined?optvalue.Code:optvalue.target.value;
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
          <RequireProvider header='eMenu' IsEdit={this.state.saveEMenu} data={this.state.reqFieldResponseUI} events={this.events} /> :
          null}
      </div>
    );
  }
}
