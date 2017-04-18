import React from 'react';
var axios = require('axios');

class GridView extends React.Component {
   constructor(props){
    super(props);
    this.updatePayment = this.updatePayment.bind(this);
    this.updateMonthCount = this.updateMonthCount.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
   
    this.changeRate = this.changeRate.bind(this);
    this.changeTerm = this.changeTerm.bind(this);


    this.getInitialValues(props);
    this.state = {
      optionDtls : this.props.optType,
      financialInfo: {},
      isLoading: true,
      rate: '',
      isRateError: false,
      rateMsg: '',
      isTermError: false,
      termMsg:''
    }
  }

  updateMonthCount(event){

    let updatedPayment = parseInt(this.state.rate) * parseInt(event.target.value);
    this.setState({monthCount:event.target.value, totalPayment: updatedPayment})
   }

  updatePayment(event){
   console.log('Cpounter Updated mode', this.state.monthCount , event.target.value);
    let updatedPayment = parseInt(this.state.monthCount) * parseInt(event.target.value);
    this.setState({rate: event.target.value, totalPayment: updatedPayment});
   }

   getApiUrl(selectedOption){
     const apiUrl =  'http://localhost:1300/src/mockAPI/';
    switch(selectedOption){
       case 'LEAS': return `${apiUrl}lease.json`;
       case 'RETL':return `${apiUrl}financialInfo.json`;
       case 'BALL': return `${apiUrl}balloon.json`;
       default: return`${apiUrl}lease.json`;
    }
   }
 
   getInitialValues(props){
    var that = this;
    axios.get(this.getApiUrl(props.selectedOption)).then(function(res){
        console.log('Result', res);
        var financialInfo = res.data;
        that.setInitialValues(financialInfo);
    })
   }
   setInitialValues(fInfo){
    console.log('FINof', fInfo);
    const  type = (fInfo.finance_method === 'RETL' && (fInfo.term === 0 || fInfo.term === 1)) ? 'CASH' : fInfo.finance_method;
   fInfo.finance_method = type;
      this.setState({
        financialInfo: fInfo,
        isLoading: false
      });
      console.log('Full State', this.state)
   }
   changeRate(event){
      console.log('Change Val :',event.target.value);
      var cVal = event.target.value;

      if(isNaN(event.target.value)){
         this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Please Enter Numaric Values'
        });
      }else if(parseFloat(cVal) > 99.99){
        console.log('More than 99')
        this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Value Should not Exceed 99.99'
        });
      }else{
           this.setState({
            rate: cVal,
            isRateError: false,
            rateMsg: ''
          });
      }
   }

   changeTerm(event){

    var tVal = event.target.value;

    if(isNaN(tVal)){
        this.setState({

          isTermError: true,
          termMsg:'Please Enter Numeric Values'

      });
    }else if(parseInt(tVal)>999){
      this.setState({

        isTermError: true,
        termMsg:'Value Should not Exceed 999'

      })
    }else{
      this.setState({

        isTermError: false,
        termMsg:''

      })
    }
   }

  render() {

    let dtls = this.state;
    const {financialInfo} = this.state;

    return (
    <div className="col-md-3 col-sm-3 col-xs-12">
      {
        !dtls.isLoading  ?
        <div className="r-panel">
          <h4> {dtls.optionDtls.name !== 'option 1' ? <input type="checkbox" name={dtls.optionDtls.name} readOnly="true" /> : null } {dtls.optionDtls.name} </h4>

          <div className="lessPad">
          <label>Term</label>
          <div className="input-group default-margin-tp-btm cus-input lessPad">
          {financialInfo.finance_method !== 'CASH' ?
          <input type="text" className={"form-control borderd hfit "+(dtls.isTermError && 'err')}
              defaultValue = {dtls.optionDtls.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(dtls.optionDtls.position) - 1))) }
              disabled = { dtls.optionDtls.position === 1 ? 'disabled' : false } onChange={this.changeTerm}/>
              :
            <input type="text" className="form-control borderd hfit" defaultValue = "cash"/>}
          </div>

          </div>
          { financialInfo.finance_method === 'LEAS' ? (
          <span>
          <label>Money Factor</label>
          <div className="input-group default-margin-tp-btm cus-input lessPad">
            <input type="text" className="form-control borderd hfit"
             defaultValue = {dtls.optionDtls.position === 1 ? (financialInfo.money_factor/2400) : '' }
             disabled = { dtls.optionDtls.position === 1 ? 'disabled' : false }/>
          </div>
          <label>Residual</label>
          <div className="input-group default-margin-tp-btm cus-input lessPad">
            <input type="text" className="form-control borderd hfit"
            defaultValue = {dtls.optionDtls.position === 1 ? financialInfo.residual_percentage : '' }
            disabled = { dtls.optionDtls.position === 1 ? 'disabled' : false }/>
            <span className="input-group-addon" id="sizing-addon2">%</span>
          </div>
          </span>

          ) :
            <span>
             <label>{financialInfo.finance_method !== 'BALL' ? 'Rate' : 'APR'}</label>
              <div className="input-group default-margin-tp-btm cus-input lessPad">
              {financialInfo.finance_method !== 'CASH' ?
              <span>
                <div className="input-group default-margin-tp-btm cus-input lessPad">
                  <input type="text" className={"form-control borderd hfit "+(dtls.isRateError && 'err')}
                  defaultValue = {dtls.optionDtls.position === 1 ? dtls.financialInfo.apr : ''}
                  disabled = { dtls.optionDtls.position === 1 ? 'disabled' : false } onChange={this.changeRate}/>
                  <span className="input-group-addon" id="sizing-addon2">%</span>
                </div>
                </span>:
               <input type="text" className="form-control borderd hfit" defaultValue = "cash"/>}
            </div>
          </span>
        }
        {financialInfo.finance_method === 'BALL' ?
          <span>
           <label>Balloon Payment</label>
           <div className="input-group default-margin-tp-btm cus-input cus-payment balloon-payment lessPad">
            <span className="input-group-addon cus-addon" id="sizing-addon2">$</span>
             <input type="text" className="form-control" 
              defaultValue = {dtls.optionDtls.position === 1 ? dtls.financialInfo.residual_percentage : '' } 
              disabled = { dtls.optionDtls.position  ? 'disabled' : false }/>
           </div>
          
          <label>Payment</label>
          <div className="input-group default-margin-tp-btm cus-input cus-payment  balloon-payment lessPad">
           <span className="input-group-addon cus-addon" id="sizing-addon2">$</span>
            <input type="text" className="form-control"  
            defaultValue = {dtls.optionDtls.position === 1 ? dtls.financialInfo.monthly_payment : '' }
            disabled = { dtls.optionDtls.position  ? 'disabled' : false }/>
          </div>
         </span>:
         <span>
          <label>Payment</label>
          <div className="input-group default-margin-tp-btm cus-input cus-payment lessPad">
           <span className="input-group-addon cus-addon" id="sizing-addon2">$</span>

            <input type="text" className="form-control"
            defaultValue = {dtls.optionDtls.position === 1 ? dtls.financialInfo.monthly_payment : '' }
            disabled = { dtls.optionDtls.position  ? 'disabled' : false }/>
          </div>
         </span>
       }
        </div>
        : <h3> Loading Info...</h3>
      }

        </div>

     )

  }

 }
export default GridView;
