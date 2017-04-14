//helpers.js

import axios from 'axios';


const HttpHelper = (url, method, reqData) => {

   //var reqData = {"dealer_code":123,"dealer_id":1234}

    if (method.toLowerCase() == 'post') {
        axios[method](url, reqData)
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
        axios[method](url)
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response.data);
                    return response.data;
                } else {
                    alert("Error while Fetching data");
                }
            })
    }
}

export default HttpHelper;