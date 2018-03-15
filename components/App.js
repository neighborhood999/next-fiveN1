import React, { PureComponent } from 'react';
import QueryForm from './QueryForm';
import RentInfoList from './RentInfoList';

class App extends PureComponent {
  state = { data: [] };

  updateFetchResponse = rentInfoList =>
    this.setState(state => ({
      data: [...state.data, rentInfoList]
    }));

  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <QueryForm updateFetchResponse={this.updateFetchResponse} />
          </div>
        </div>
        <div className="row">
          <RentInfoList data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
