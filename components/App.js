import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import swal from 'sweetalert';
import MDSpinner from 'react-md-spinner';
import { compose, withState, withHandlers } from 'recompose';
import QueryForm from './QueryForm';
import RentInfoList from './RentInfoList';
import { appendParameters, handleResponse } from '../utils';
import { Container } from '../utils/styledComponent';

const enhance = compose(
  withState('data', 'getRentInfoList', []),
  withState('status', 'updateStatus', {
    more: false,
    isLoading: false,
    noMore: false
  }),
  withState('queryParameters', 'setQueryParameters', {}),
  withHandlers({
    fetchMore: ({
      data,
      status,
      updateStatus,
      queryParameters,
      setQueryParameters,
      getRentInfoList
    }) => async () => {
      updateStatus({ ...status, isLoading: true });

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
        updateStatus({ ...status, isLoading: false });
      } else {
        swal('Oops！', '沒有更多租屋資料了 😭！', 'error');
        updateStatus({ ...status, isLoading: false, noMore: true });
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
  <Container>
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
        {!status.noMore &&
          status.more && (
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={fetchMore}
            >
              {status.isLoading ? <MDSpinner /> : '載入更多房屋資訊'}
            </button>
          )}
      </div>
    </div>
  </Container>
);

export default enhance(App);
