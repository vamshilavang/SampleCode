import React, { Component } from 'react';
import GridView from './gridView';
import Products from './productsView';
import Emenu from './components/eMenu'

class App extends Component {
  constructor() {
    super();
    this.state = {
      optionTypes: [
        { name: 'option 1' },
        { name: 'option 2' },
        { name: 'option 3' },
        { name: 'option 4' }
      ],
      optionArr: ['option1']
    }
  }
  render() {
    let options = this.state.optionTypes;
    return (
      <div>
        <Emenu />
        <hr />
        <h3>Term & Rate Options</h3>
        <div className="App">

          <div className="row">
            {
              [...options].map((option, i) =>
                <GridView key={i} optType={option} />

              )
            }
          </div>
          <button className="btn btn-lg pull-right btn-cus" type="button">get rates</button>
          <Products />
        </div>
      </div>
    );
  }
}

export default App;
