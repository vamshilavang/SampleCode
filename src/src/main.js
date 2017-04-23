import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
	<App/>, 
	document.getElementById('root')
);

 let queryparam =  function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        
        vars[hash[0]] = hash[1];
    }
    return vars;
}

localStorage.setItem("dealer_code",queryparam().dealer_code)
localStorage.setItem("dealid",queryparam().dealid)
localStorage.setItem("dealjacketid",queryparam().dealjacketid)