import React from 'react';
import ExpandedProduct from './ExpandedProduct'
 
class Product extends React.Component{
  constructor(props){
    super(props);
 
    this.state = {
      imageUrl: this.props.optType.imageUrl,
      title: this.props.optType.title,
      showMore: false,
      price: this.props.optType.price,
      platinum: this.props.optType.platinum,
      gold: this.props.optType.gold,
      silver: this.props.optType.silver,
      basic: this.props.optType.basic
    }
  }
  updateShowMore(event) {
    console.log(event);
    console.log(this.state.showMore);
    this.setState({ showMore: !this.state.showMore });
  }
  render(){
    return(
      <div className="">
      <div className="row product">
        <div className="col-md-3 col-sm-3 col-xs-12">
          <img src={this.state.imageUrl.toString()} width="100%" />
        </div>
        <div className="col-xs-4 col-sm-3">
          <p className="r-no-bottom-margin"><b>{this.state.title}</b></p>
          <p className="r-gray">{this.state.price}</p>
          <p className="r-no-bottom-margin r-gray r-medium-text">Provider</p>
          <select className="form-control">
            <option>Provider</option>
          </select>         
          <p className="r-small-bottom-margin r-small-top-margin"><a className="anchor-pointer" onClick={this.updateShowMore.bind(this)}>{this.state.showMore == false ? 'Show More' : 'Show Less'}</a></p>       
        </div>
        <div className="col-xs-4  col-sm-4 r-checkbox-margin-top product-option">
          <span className="r-checkbox-span"><input type="checkbox" key="platinum" value={this.state.platinum} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="gold" value={this.state.gold} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="silver" value={this.state.silver} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="basic" value={this.state.basic} /></span>
        </div>
      </div>
      {
        this.state.showMore
          ? <ExpandedProduct key={"Expanded" + this.props.key} />
          : null
      }
      <hr/>
     
    </div>
    )
  }
}
 
 
 
export default Product;