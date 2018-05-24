import fetch from 'isomorphic-unfetch';
import swal from 'sweetalert';
import { withFormik } from 'formik';
import isObject from 'lodash.isobject';
import BaseForm from './BaseForm';
import {
  schema,
  appendParameters,
  handleResponse,
  handleError
} from '../utils';

const enhanceForm = withFormik({
  displayName: 'BaseForm',
  mapPropsToValues: props => ({
    urlJump: { label: '台北市', value: 1 },
    kind: { label: '不限', value: 0 },
    section: [],
    option: [],
    other: [],
    orderType: { label: '由新到舊', value: 'desc' },
    rentPrice: { label: '不限', value: '' },
    sex: { label: '不限', value: 0 },
    hasImage: { label: '不限', value: '' },
    notCover: { label: '否', value: '' },
    role: { label: '不限', value: '' },
    area: { label: '不限', value: '' },
    floor: { label: '不限', value: '' },
    shape: [],
    order: { label: '時間', value: 'posttime' },
    firstRow: { label: 'Page', value: 0 }
  }),
  validationSchema: schema,
  handleSubmit: async (values, { props, setSubmitting }) => {
    props.getRentInfoList([]);
    props.updateStatus({ ...props.status, firstSubmit: true });

    const valueEntries = Object.entries(values);
    const queryParameters = valueEntries.reduce((query, obj) => {
      const key = obj[0];
      const optionValue = Object.values(obj[1]);

      const option = isObject(optionValue[0])
        ? optionValue.map(o => o.value)
        : optionValue[1] === undefined
          ? ''
          : optionValue[1].toString().replace(/-/, ',');

      query[key] = Array.isArray(option) ? ''.concat(option) : option;

      return { ...query };
    }, {});

    const url = appendParameters(queryParameters);
    const body = await fetch(url)
      .then(handleError)
      .then(response => response.json());
    const [hasData, reintInfos] = handleResponse(body);

    if (hasData) {
      props.getRentInfoList(reintInfos);
      props.updateStatus({ ...props.status, firstSubmit: false, more: true });
      props.setQueryParameters(queryParameters);
      setSubmitting(false);
    } else {
      swal('錯誤！', '找不到任何租屋資料！😥', 'error');
      props.updateStatus({ ...props.status, firstSubmit: false });
      setSubmitting(false);
    }
  }
});

export default enhanceForm(BaseForm);
