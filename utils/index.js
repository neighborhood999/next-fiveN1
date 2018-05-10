import Yup from 'yup';
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

export const schema = Yup.object().shape({
  urlJump: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  }),
  section: Yup.string(),
  area: Yup.string().nullable(),
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
    value: Yup.number().required()
  }),
  role: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.number().required()
  }),
  notCover: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.number().required()
  }),
  sex: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.number().required()
  })
});
