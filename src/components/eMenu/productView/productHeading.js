  import React, { Component } from 'react';
  import Product from './ProductView';
  import PlanOption from './planList';
  import PlanMenu from './planMenu';

  class ProductHeading extends Component {
    constructor() {
      super();
      this.state = {
        productsArr : [
                       {imageUrl: 'http://localhost:1300/src/components/eMenu/productView/img/car1.jpg', title: 'Service Contract', price: '$500.00', platinum: true, gold: true, silver: true, basic: false}, 
                       {imageUrl: 'http://localhost:1300/src/components/eMenu/productView/img/key-replacementb428x300.png', title: 'Pre-Paid Maintenance/Key', price: '$450.00'}, 
                       {imageUrl: 'http://localhost:1300/src/components/eMenu/productView/img/extended-warranty428x300.png', title: 'Total Loss Protection', price: '$250.00'}]
      }
    }
    render() {
      let products = this.state.productsArr;
      return (
        <div className="container-fluid">
          <div className="row">
          <PlanMenu showRates={true} />
          <div>
            <h3 className="r-bottom" key="productsHeading">Products</h3>
            <hr className="r-top-no-margin" />
            {
              products.map((product, i) =>
              <Product Key={"product_" + i.toString()} optType={product} />
            )
              }              
          </div>
          <div>
          <PlanOption />
          </div>
        </div>
        </div>
      );
    }
  }
   
  export default ProductHeading;