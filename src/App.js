import React, { Component } from 'react';
import Emenu from './components/eMenu/eMenu';
import ProductHeading from './components/eMenu/productView/productHeading';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Emenu />    
        </div>
      </div>
    );
  }
} 
export default App;