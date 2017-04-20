//helpers.js

import axios from 'axios';


const HttpHelper = (url, method, reqData,callback) => {

   var reqData = {
   "KeyData": {
      "ClientId": "DEM",
      "ClientDealerId": "1112016",
      "DTDealerId": "1112016",
      "RequestDate": "\/Date(1472097614353)\/"
   },
   "Vehicle": {
      "BookType": "1",
      "Year": "0",
      "PurchasePrice": "0",
      "Odometer": "0",
      "PurchaseDate": "\/Date(1472097614353)\/",
      "Type": "1",
      "InServiceDate": "\/Date(1472097614353)\/",
      "VehicleAttributes": []
   },
   "Finance": {
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
   },
   "Products": [
      {
         "ProductTypeCode": "VSC",
         "ProviderId": "APC",
         "ProviderDealerId": "000006",
         "ClientProductId": "647644",
         "ProviderProductId": ""
      }
   ]
}


    if (method.toLowerCase() == 'post') {
        if(reqData == undefined){
            reqData={};
        }
        var config = {
  headers: {'Content-Type': 'application/json'}
};
        axios.post(url,reqData,config)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    return response.data
                } else {
                    alert("Error while Fetching data");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        var config = {
  headers: {'Content-Type': 'application/json','Dealer-Code':'1112016'}
};
        axios.get(url,config)
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response.data);
                    return response.data;
                } else {
                    alert("Error while Fetching data");
                }
            })
             .catch(function (error) {
                console.log(error);
            });
    }
}

export default HttpHelper;