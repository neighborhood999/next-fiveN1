import 'isomorphic-unfetch';
import { withFormik } from 'formik';
import isObject from 'lodash.isobject';
import BaseForm from './BaseForm';
import { schema } from '../utils';

const enhanceForm = withFormik({
  displayName: 'BaseForm',
  mapPropsToValues: props => ({
    urlJump: { label: '台北市', value: 1 },
    kind: { label: '不限', value: 0 },
    section: [],
    orderType: { label: '由新到舊', value: 'desc' },
    rentPrice: { label: '5K - 10K', value: 2 },
    sex: { label: '不限', value: 0 },
    hasImage: { label: 'No', value: 0 },
    notCover: { label: 'No', value: 0 },
    role: { label: 'No', value: 0 },
    area: '',
    order: { label: 'Post Time', value: 'posttime' }
  }),
  validationSchema: schema,
  handleSubmit: async (values, { props, setSubmitting }) => {
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

    const url = new URL('http://localhost:8888/');
    Object.keys(queryParameters).forEach(key =>
      url.searchParams.append(key, queryParameters[key])
    );
    const body = await fetch(url).then(response => response.json());

    props.updateFetchResponse(body[1]);
    setSubmitting(false);
  }
});

export default enhanceForm(BaseForm);
