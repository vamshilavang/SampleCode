import React from 'react';

class Products extends React.Component{
  render(){
    return(
      <div>
        <h3 key="productsHeading">Products</h3>
         {products}   
        <div>
        {listProducts}
        </div>       
    </div>
    )
  }
}

var allProducts = [{imageUrl: 'http://mazaaq.net/dev/images_product/41458129.png', title: 'Service Contract', price: '$500.00', platinum: true, gold: true, silver: true, basic: false}, {imageUrl: '', title: 'Pre-Paid Maintenance/Key', price: '$450.00'}, {imageUrl: '', title: 'Total Loss Protection', price: '$250.00'}],
  products = allProducts.map((product, index) =>
    <div className="r-product-row">
      <div className="row" key={'product_' + (index+1).toString()}>
        <div className="col-xs-3">
          <img src={product.imageUrl.toString()} alt="Smiley face" width="50%" />
        </div>
        <div className="col-xs-4">
          <p className="r-no-bottom-margin"><b>{product.title}</b></p>
          <p className="r-price">{product.price}</p>
          <p className="r-no-bottom-margin">Provider</p>
          <select className="form-control">
            <option>Provider</option>
          </select>          
          <p><a>Show More</a></p>        
        </div>
        <div className="col-xs-1"></div>
        <div className="col-xs-4">
          <span className="r-checkbox-span"><input type="checkbox" key="platinum" value={product.platinum} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="gold" value={product.gold} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="silver" value={product.silver} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="basic" value={product.basic} /></span>
        </div>
      </div>
      <hr/>
    </div>
);

var moreProductOptions = [{title: 'PLATINUM'}, {title: 'GOLD'}, {title: 'SILVER'},{title: 'BASIC'}],
listProducts =  moreProductOptions.map((moreProduct, index) =>
  <div className ="col-xs-3">
  <div className ="r-panel">
   <h3>{moreProductOptions.title}</h3>  
   <h6>Total Cost</h6>
   <div className="input-group default-margin-tp-btm">
    <span className="input-group-addon" id="sizing-addon2">$</span>
    <input type="text" className="form-control"/>
   </div>
   <h6>Total Price</h6>
   <div className="input-group default-margin-tp-btm">
    <span className="input-group-addon" id="sizing-addon2">$</span>
    <input type="text" className="form-control"/>
   </div>
  </div>
  </div>
);

console.log(products);

export default Products;

