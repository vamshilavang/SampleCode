import React, { Component } from 'react';
import GridView from './termAndRateOption/gridView';

class TermRate extends Component {
  constructor() {
    super();
    this.state = {
      optionTypes: [
          { name: 'option 1', position: 1},
          { name: 'option 2', position: 2},
          { name: 'option 3', position: 3},
          { name: 'option 4', position: 4}
      ],
      optionArr: ['option1']
    }
  }
  render() {
    let options = this.state.optionTypes;
    return (
      <div>
        <h4 className="term-rate">Term & Rate Options</h4>
        <div className="App">
            {
              [...options].map((option, i) =>
                <GridView key={i} optType={option} selectedOption={'CASH'} />

              )
            }
             <button className="btn btn-primary pull-right btn-cus" type="button">get rates</button>
        </div>
      </div>

    );
  }
}

export default TermRate;
