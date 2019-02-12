import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import swal from 'sweetalert';
import MDSpinner from 'react-md-spinner';
import QueryForm from './QueryForm';
import RentInfoList from './RentInfoList';
import { appendParameters, handleResponse } from '../utils';
import { Container } from '../utils/styledComponent';

function App() {
  const [data, setData] = useState([]);
  const [queryParameters, setQueryParameters] = useState({});
  const [status, setStatus] = useState({
    firstSubmit: false,
    more: false,
    isLoading: false,
    noMore: false
  });

  return (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <QueryForm
            getRentInfoList={setData}
            updateStatus={setStatus}
            setQueryParameters={setQueryParameters}
          />
        </div>
      </div>
      <div className="row">
        {status.firstSubmit ? (
          <div className="col mt-3 mb-3 text-center">
            <MDSpinner />
          </div>
        ) : (
          <RentInfoList data={data} />
        )}
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 pt-3 pb-3">
          {!status.noMore && status.more && (
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={async () => {
                setStatus({ ...status, isLoading: true });

                const updateQueryParameters = {
                  ...queryParameters,
                  firstRow: parseInt(queryParameters.firstRow) + 30
                };
                const url = appendParameters(updateQueryParameters);
                const nextPage = await fetch(url).then(response =>
                  response.json()
                );
                const [hasData, rentInfos] = handleResponse(nextPage);

                if (hasData) {
                  setData([...data, ...rentInfos]);
                  setQueryParameters(updateQueryParameters);
                  setStatus({ ...status, isLoading: false });
                } else {
                  swal('Oops！', '沒有更多租屋資料了 😭！', 'error');
                  setStatus({ ...status, isLoading: false, noMore: true });
                }
              }}
            >
              {status.isLoading ? <MDSpinner /> : '載入更多房屋資訊'}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
