import React, { Component } from 'react';
import TermRate from './components/eMenu/termRate';
import Emenu from './components/eMenu/eMenu';
import ProductHeading from './components/eMenu/productHeading';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Emenu />
          <TermRate/>
        </div>
        <ProductHeading/>
      </div>
    );
  }
} 
export default App;