//helpers.js

import axios from 'axios';


const HttpHelper = (url, method) => {
    return (
        //ajax stuff here
        axios[method](url)
            .then(function (response) {
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            })
    );
}

export default HttpHelper;