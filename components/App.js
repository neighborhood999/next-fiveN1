import React, { useReducer } from 'react';
import fetch from 'isomorphic-unfetch';
import styled, { keyframes } from 'styled-components';
import swal from 'sweetalert';

import RentInfoContext from '../contexts/RentInfoContext';
import { appendParameters, handleResponse } from '../utils';

import Form from './Form';
import RentInfoList from './RentInfoList';

const initialState = {
  data: [],
  queryParameters: {},
  status: {
    firstSubmit: false,
    more: false,
    isLoading: false
  }
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid rgb(66, 165, 245, 0.2);
  border-left-color: rgb(66, 165, 245);
  background: transparent;
  animation: ${rotate} 1s linear infinite;
`;

function reducer(state, action) {
  switch (action.type) {
    case 'data':
      return {
        ...state,
        data: action.data
      };

    case 'query':
      return {
        ...state,
        queryParameters: {
          ...state.queryParameters,
          ...action.query
        }
      };

    case 'status':
      return {
        ...state,
        status: {
          ...state.status,
          ...action.status
        }
      };

    default:
      return initialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMore = async () => {
    dispatch({
      type: 'status',
      status: { isLoading: true }
    });

    const updateQueryParameters = {
      ...state.queryParameters,
      firstRow: parseInt(state.queryParameters.firstRow) + 30
    };
    const url = appendParameters(updateQueryParameters);
    const nextPage = await fetch(url).then(response => response.json());
    const { hasData, data: rentInfos } = handleResponse(nextPage);

    if (hasData) {
      dispatch({
        type: 'data',
        data: [...state.data, ...rentInfos]
      });

      dispatch({
        type: 'query',
        query: updateQueryParameters
      });

      dispatch({
        type: 'status',
        status: { isLoading: false }
      });
    } else {
      swal('糟糕！', '沒有更多租屋資料了 😭', 'error');

      dispatch({
        type: 'status',
        status: { isLoading: false, more: false }
      });
    }
  };

  return (
    <RentInfoContext.Provider
      value={{ ctxState: state, ctxDispatch: dispatch }}
    >
      <div className="container" style={{ minHeight: 'calc(100vh - 20px)' }}>
        <div className="row">
          <div className="col-md-12">
            <Form />
          </div>
        </div>
        <div className="row">
          {state.status.firstSubmit ? (
            <div className="col mt-3 mb-3 text-center">
              <Spinner />
            </div>
          ) : (
            <RentInfoList data={state.data} />
          )}
        </div>
        {state.status.isLoading ? (
          <div className="pt-3 pb-3 text-center">
            <Spinner />
          </div>
        ) : (
          state.status.more && (
            <div className="row">
              <div className="col-md-4 offset-md-4 pt-3 pb-3">
                <button
                  type="button"
                  className="btn btn-light btn-block"
                  onClick={fetchMore}
                >
                  載入更多房屋資訊
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </RentInfoContext.Provider>
  );
}

export default App;
