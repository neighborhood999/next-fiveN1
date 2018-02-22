import React, { Component } from 'react';
import QueryForm from './QueryForm';

class App extends Component {
  state = { data: {} };

  updateFetchResponse = data => {
    this.setState(() => ({ data }));
  };

  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md">
            <QueryForm updateFetchResponse={this.updateFetchResponse} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
