import React, { Component } from 'react';

class PlanOption extends Component {
  constructor() {
    super();
    this.rendorPlan=this.rendorPlan.bind(this);   
  }
  rendorPlan(planList){
      var moreProductOptions = planList,
      listProducts =  moreProductOptions.map((moreProduct, index) =>
        <div className ="col-xs-3" key={"itmVl"+index}>
          <div className ="r-panel1" key={"itmVl1"+index}>
            <h3>{moreProduct.title}</h3>  
            <h6>Cost</h6>
            <div className="input-group default-margin-tp-btm">
              <span className="input-group-addon" id="sizing-addon2">$</span>
              <input type="text" className="form-control"/>
            </div>
            <h6>Price</h6>
            <div className="input-group default-margin-tp-btm">
              <span className="input-group-addon" id="sizing-addon2">$</span>
              <input type="text" className="form-control"/>
            </div>
          </div>
        </div>
      );
      return listProducts;
  }
  render() {
     return (
         <div>
          {this.rendorPlan([{title: 'PLATINUM'}, {title: 'GOLD'}, {title: 'SILVER'},{title: 'BASIC'}])}
         </div>
     )
  }

}
export default PlanOption;