import Yup from 'yup';
import swal from 'sweetalert';
import { sectionListOptions } from './options';

export const sectionListOptionsHelper = values =>
  values.urlJump !== null
    ? sectionListOptions[values.urlJump.value - 1]['section']
    : [];

export const appendParameters = parameters => {
  const url = new URL(API_URL);
  Object.keys(parameters).forEach(key =>
    url.searchParams.append(key, parameters[key])
  );

  return url;
};

export const handleResponse = response => {
  const data = Object.entries(response);
  if (data.length === 0) {
    return [false, []];
  }

  return [true, data[0][1]];
};

export const handleError = response => {
  const { ok, statusText } = response;

  if (ok) {
    return response;
  } else {
    const error = new Error(statusText);
    error.response = response;
    swal('Oops!', '591 租屋網目前沒有回應！😥', 'error');

    return Promise.reject(error);
  }
};

export const pageView = url => {
  window.gtag('config', TRACKING_ID, {
    page_location: url
  });
};

export const schema = Yup.object().shape({
  urlJump: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  }),
  section: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.number().required()
    })
  ),
  area: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string()
  }),
  floor: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string()
  }),
  order: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string()
  }),
  rentPrice: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string()
  }),
  orderType: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  }),
  kind: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.number().required()
  }),
  hasImage: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().nullable()
  }),
  role: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().nullable()
  }),
  notCover: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().nullable()
  }),
  sex: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.number().required()
  }),
  option: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  ),
  other: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  ),
  shape: Yup.array(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
  )
});
