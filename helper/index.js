import ReactSelect from 'react-select';
import styled from 'styled-components';
import Yup from 'yup';
import { sectionListOptions } from './options';

export const sectionListOptionsHelper = values =>
  values.urlJump !== null
    ? sectionListOptions[values.urlJump.value - 1]['section']
    : [];

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

export const Select = styled(ReactSelect)`
  &.Select.error > .Select-control {
    border-color: #dc3545;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(220, 53, 69, 0.1);
    background: #fff;
  }
`;
