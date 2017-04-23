//helpers.js

import axios from 'axios';


const HttpHelper = (url, method, reqData) => {



        if (method.toLowerCase() == 'post') {
            if (reqData == undefined) {
                reqData = {};
            }
            var config = {
                headers: { 'Content-Type': 'application/json' }
            };
            return axios.post(url, reqData, config)
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
                headers: { 'Content-Type': 'application/json', 'Dealer-Code': '1112016' }
            };
            return axios.get(url, config)
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
