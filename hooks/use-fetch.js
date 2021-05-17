import { useCallback, useEffect, useReducer, useRef } from 'react';

const IDLE = 'IDLE';
const FETCHING = 'FETCHING';
const FETCHED = 'FETCHED';
const ERROR = 'ERROR';
const CLEAN_UP = 'CLEAN_UP';

const initialState = {
  state: IDLE,
  isFetching: false,
  isSuccess: false,
  keepPrevious: false,
  totalPages: 0,
  data: [],
  error: null,
};

function reduer(state, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
        state: FETCHING,
        data: [],
      };
    case FETCHED:
      if (action.payload) {
        return {
          ...state,
          isFetching: false,
          isSuccess: true,
          state: FETCHED,
          totalPages: action.totalPages,
          data: state.keepPrevious
            ? [...state.data, ...action.payload]
            : action.payload,
        };
      }

      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        state: FETCHED,
      };
    case ERROR:
      return {
        ...state,
        isFetching: false,
        state: ERROR,
        error: action.payload,
      };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}

export function useFetch(url, { enabled = false, keepPrevious = false }) {
  const cache = useRef({});
  const [state, dispatch] = useReducer(reduer, {
    ...initialState,
    keepPrevious,
  });

  const reset = useCallback(() => {
    if (!cache.current[url]) {
      dispatch({ type: CLEAN_UP });
    }
  }, [url]);

  useEffect(() => {
    if (!url) {
      return;
    }

    async function fetchData() {
      dispatch({ type: FETCHING });

      if (cache.current[url]) {
        dispatch({ type: FETCHED, payload: cache.current[url] });
      } else {
        try {
          const response = await fetch(url).then(res => res.json());

          if (response) {
            cache.current[url] = response.data;
            dispatch({
              type: FETCHED,
              totalPages: response.totalPages,
              payload: response.data,
            });
          } else {
            dispatch({ type: FETCHED });
          }
        } catch (err) {
          dispatch({ type: ERROR, payload: err.message });
        }
      }
    }

    if (enabled) {
      fetchData();
    }
  }, [url, enabled]);

  return {
    ...state,
    reset,
  };
}
