import React, { Component } from 'react';
 
class PlanMenu extends Component {
  constructor() {
    super();
    this.rendorPlan=this.rendorPlan.bind(this);  
  }
  rendorPlan(planList){
                var listProducts =  planList.map((itm, index) =>
                  <div style={{"border": "1px solid #ccc","padding": "3px 6px","margin":" 5px"}} className ="btn" key={"itmVl1"+index} >
                   <span>{itm.title}</span>
                  </div>
                );
                return listProducts;
  }
  render() {
    return (
      <div className="pull-right menu-options">
        {this.rendorPlan([{title: 'PLATINUM'}, {title: 'GOLD'}, {title: 'SILVER'},{title: 'BASIC'}])}
      </div>
     )
   }
}
export default PlanMenu;