import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import QueryForm from './QueryForm';
import RentInfoList from './RentInfoList';

const enhance = compose(
  withState('data', 'getRentInfoList', []),
  withHandlers({
    fetchResponse: ({ getRentInfoList }) => prevListState =>
      getRentInfoList(nextList => [...prevListState, ...nextList])
  })
);

const App = ({ data, fetchResponse }) => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-12">
        <QueryForm fetchResponse={fetchResponse} />
      </div>
    </div>
    <div className="row">
      <RentInfoList data={data} />
    </div>
  </div>
);

export default enhance(App);
