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
      };
    case FETCHED:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        state: FETCHED,
        data: state.keepPrevious
          ? [...state.data, ...action.payload]
          : action.payload,
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

export function useFetch(url, { enable = false, keepPrevious = false }) {
  const cache = useRef({});
  const [state, dispatch] = useReducer(reduer, {
    ...initialState,
    keepPrevious,
  });

  const reset = useCallback(() => {
    dispatch({ type: CLEAN_UP });
  }, []);

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

          cache.current[url] = response;

          dispatch({ type: FETCHED, payload: response });
        } catch (err) {
          dispatch({ type: ERROR, payload: err.message });
        }
      }
    }

    if (enable) {
      fetchData();
    }
  }, [url, enable]);

  return {
    ...state,
    reset,
  };
}
