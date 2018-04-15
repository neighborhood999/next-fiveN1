import React from 'react';
import fetch from 'isomorphic-unfetch';
import { compose, withState, withHandlers } from 'recompose';
import QueryForm from './QueryForm';
import RentInfoList from './RentInfoList';
import { appendParameters, handleResponse } from '../utils';

const enhance = compose(
  withState('data', 'getRentInfoList', []),
  withState('status', 'updateStatus', false),
  withState('queryParameters', 'setQueryParameters', {}),
  withHandlers({
    fetchMore: ({
      data,
      queryParameters,
      setQueryParameters,
      getRentInfoList
    }) => async () => {
      const updateQueryParameters = {
        ...queryParameters,
        firstRow: parseInt(queryParameters.firstRow) + 30
      };
      const url = appendParameters(updateQueryParameters);
      const nextPage = await fetch(url).then(response => response.json());
      const [hasData, rentInfos] = handleResponse(nextPage);

      if (hasData) {
        getRentInfoList([...data, ...rentInfos]);
        setQueryParameters(updateQueryParameters);
      } else {
        console.log('No more informations');
      }
    }
  })
);

const App = ({
  data,
  status,
  getRentInfoList,
  fetchMore,
  updateStatus,
  setQueryParameters
}) => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-12">
        <QueryForm
          getRentInfoList={getRentInfoList}
          updateStatus={updateStatus}
          setQueryParameters={setQueryParameters}
        />
      </div>
    </div>
    <div className="row">
      <RentInfoList data={data} />
    </div>
    <div className="row">
      <div className="col-md-4 offset-md-4 pt-3 pb-3">
        {status && (
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={fetchMore}
          >
            載入更多房屋資訊
          </button>
        )}
      </div>
    </div>
  </div>
);

export default enhance(App);
