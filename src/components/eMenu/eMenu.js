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
  }

  componentDidMount() {
    //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
    //this.state.dealerInfo = HttpHelper('http://192.168.17.32:6100/api/deal/v1/dealer-products/','get')/** Uncomment it and fetch the dealer product */
    this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
    console.log(this.state.dealerProduct);
    // plz fetch SendRequestToBE
    this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
    //this.state.responseTomap = HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json','post');
    console.log(this.state.responseTomap);
    //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
    this.state.responseTomap.Products = this.getMappedRequiredField();

    this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    //let requestData = HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json','post',this.state.responseTomap) /**uncomment it to fetch data from server for reqFieldResponseUI */
    this.state.reqFieldResponseUI.GetRequiredFieldsResponse.Products.RequiredFieldResponseProduct = this.getRenderdataFields();
    this.setState({ "products": this.state.reqFieldResponseUI.GetRequiredFieldsResponse.Products.RequiredFieldResponseProduct });
  }

  getMappedRequiredField() {
    let responseTomap = this.state.responseTomap.Products;
    let mappedData = [];
    _.each(this.state.dealerProduct.results, function (item, i) {
      if (item['is_rateable']) {
        _.each(responseTomap, function (childitem, idx) {
          if ((item['category_code'] == childitem['ProductTypeCode'])
            && (item['provider_code'] == childitem['ProviderId'])
            && (item['dealer_id'] == childitem['ProviderDealerId'])) {
            mappedData.push(childitem);
          }
        });
      }
    });
    return mappedData;
  }

  getRenderdataFields() {
    let grpResponseObj = {};
    let RequiredFieldResponseProduct = this.state.reqFieldResponseUI.GetRequiredFieldsResponse.Products.RequiredFieldResponseProduct;
    _.each(RequiredFieldResponseProduct, function (item, idx) {
      _.each(item.Fields.Field, function (childitem, index) {
        if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
          grpResponseObj[childitem.Category] = [];
        }
        if (childitem.Required == 'Y' && childitem.Category != 'Vehicle'
          && childitem.ControlType != 'NA') {
          if (childitem.FieldValues && childitem.FieldValues.FieldValue.length > 4) {
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

  eMenuOptionselect(ClientProductId, qid, catname, optvalue) {
    //console.log(qid + " " +optvalue);
    let questiondata = this.state.reqFieldResponseUI.GetRequiredFieldsResponse.Products.RequiredFieldResponseProduct;
    let insertIndex = -1;
    if (questiondata.length > 0) {
      _.map(questiondata, function (category, idx) {
        if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
          return (_.map(category.GroupedCategory, function (qs, i) {
            if (i == catname) {
              return _.map(qs, function (q, i) {
                if (q.Required == 'Y' && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.FieldValue.length < 4))) {
                  return q.Value = optvalue.Code;
                } else if (q.Required == 'Y' && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.FieldValue.length > 4))) {
                  return q.Value = optvalue.event.target.value;
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
