import CreatableSelect from 'react-select/creatable';
import React, { useContext, useReducer } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';
import { Controller, useForm } from 'react-hook-form';

import RentInfoContext from '../contexts/RentInfoContext';
import {
  appendParameters,
  handleError,
  handleResponse,
  validationSchema
} from '../utils';
import * as options from '../utils/options';

const initialState = {
  urlJump: { label: '台北市', value: 1 },
  section: [],
  kind: { label: '不限', value: 0 },
  order: { label: '時間', value: 'posttime' },
  orderType: { label: '由新到舊', value: 'desc' },
  sex: { label: '不限', value: 0 },
  hasImage: { label: '不限', value: '' },
  notCover: { label: '否', value: '' },
  role: { label: '不限', value: '' },
  rentPrice: { label: '不限', value: '' },
  area: { label: '不限', value: '' },
  floor: { label: '不限', value: '' },
  shape: [],
  supportOption: [],
  other: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'urlJump':
      return {
        ...state,
        urlJump: action.option,
        section: []
      };

    case 'section': {
      return {
        ...state,
        section: [action.option]
      };
    }

    case 'kind': {
      return {
        ...state,
        kind: action.option
      };
    }

    case 'order': {
      return {
        ...state,
        order: action.option
      };
    }

    case 'orderType': {
      return {
        ...state,
        orderType: action.option
      };
    }

    case 'sex': {
      return {
        ...state,
        sex: state.option
      };
    }

    case 'hasImage': {
      return {
        ...state,
        hasImage: state.option
      };
    }

    case 'notCover': {
      return {
        ...state,
        notCover: state.option
      };
    }

    case 'role': {
      return {
        ...state,
        role: state.option
      };
    }

    case 'rentPrise': {
      return {
        ...state,
        rentPrice: state.option
      };
    }

    case 'area': {
      return {
        ...state,
        area: state.option
      };
    }

    case 'floor': {
      return {
        ...state,
        floor: state.option
      };
    }

    case 'shape': {
      return {
        ...state,
        shape: [...state.shape, state.option]
      };
    }

    case 'supportOption': {
      return {
        ...state,
        supportOption: [...state.supportOption, state.option]
      };
    }

    case 'other': {
      return {
        ...state,
        other: [...state.other, state.option]
      };
    }

    default:
      return initialState;
  }
}

const customStyles = {
  multiValue: styles => ({
    ...styles,
    backgroundColor: 'rgba(0,126,255, .08)'
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#007eff'
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#007eff',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(0,113,230, .09)'
    }
  })
};

function Form() {
  const { ctxState, ctxDispatch } = useContext(RentInfoContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: initialState,
    validationSchema
  });

  const onSubmit = async data => {
    ctxDispatch({ type: 'data', data: [] });
    ctxDispatch({ type: 'status', status: { firstSubmit: true } });

    const valueEntries = Object.entries(data);

    const queryParameters = valueEntries.reduce(
      (query, obj) => {
        const [key, value] = obj;

        query[key] = Array.isArray(value)
          ? value.map(({ value }) => value).join(',')
          : value.value.toString().replace(/-/, ',');

        return { ...query };
      },
      { firstRow: 0 }
    );

    const url = appendParameters(queryParameters);
    const body = await fetch(url)
      .then(handleError)
      .then(response => response.json());
    const { hasData, data: rentInfos } = handleResponse(body);

    if (hasData) {
      ctxDispatch({ type: 'data', data: [...ctxState.data, ...rentInfos] });
      ctxDispatch({
        type: 'status',
        status: { firstSubmit: false, more: true }
      });
      ctxDispatch({ type: 'query', query: queryParameters });
    } else {
      swal('錯誤！', '找不到任何租屋資料！😥', 'error');

      ctxDispatch({ type: 'status', stats: { firstSubmit: false } });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col-md-3">
          <label htmlFor="urlJump">地區</label>

          <Controller
            autoFocus
            name="urlJump"
            placeholder="請選擇地區"
            as={<Select />}
            rules={{ required: true }}
            control={control}
            options={options.urlJumpOptions}
            value={state.urlJump}
            onChange={([e]) => {
              dispatch({
                type: 'urlJump',
                option: e
              });
              setValue('section', []);

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="section">鄉鎮</label>

          <Controller
            isMulti
            name="section"
            placeholder="請選擇"
            as={<Select styles={customStyles} />}
            control={control}
            options={
              options.sectionListOptions[state.urlJump.value - 1]['section']
            }
            value={state.section}
            onChange={([e]) => {
              dispatch({
                type: 'section',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="kind">類型</label>

          <Controller
            name="kind"
            placeholder="請選擇租屋類型"
            as={<Select />}
            control={control}
            options={options.kindOptions}
            value={state.kind}
            onChange={([e]) => {
              dispatch({
                type: 'kind',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="order">依據</label>

          <Controller
            name="order"
            placeholder="請選擇刊登條件"
            as={<Select />}
            control={control}
            options={options.orderOptions}
            value={state.order}
            onChange={([e]) => {
              dispatch({
                type: 'order',
                option: e
              });
              setValue('orderType', null);

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="orderType">刊登順序</label>

          <Controller
            name="orderType"
            placeholder="請選擇刊登順序"
            as={<Select />}
            control={control}
            options={
              state.order.value === 'posttime'
                ? options.orderTypeByTimeOptions
                : options.orderTypeByMoneyOptions
            }
            value={state.orderType}
            onChange={([e]) => {
              dispatch({
                type: 'orderType',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="sex">性別</label>

          <Controller
            name="sex"
            placeholder="請選擇性別"
            as={<Select />}
            control={control}
            options={options.sexOptions}
            value={state.sext}
            onChange={([e]) => {
              dispatch({
                type: 'sex',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="hasImage">是否有房屋照片</label>

          <Controller
            name="hasImage"
            placeholder="請選擇"
            as={<Select />}
            control={control}
            options={options.hasImageOptions}
            value={state.hasImage}
            onChange={([e]) => {
              dispatch({
                type: 'hasImage',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="notCover">排除頂樓加蓋</label>

          <Controller
            name="notCover"
            placeholder="請選擇"
            as={<Select />}
            control={control}
            options={options.notCoverOptions}
            value={state.notCover}
            onChange={([e]) => {
              dispatch({
                type: 'notCover',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="role">是否為屋主刊登</label>

          <Controller
            name="role"
            placeholder="請選擇"
            as={<Select />}
            control={control}
            options={options.roleOptions}
            value={state.role}
            onChange={([e]) => {
              dispatch({
                type: 'role',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="rentPrice">租金</label>

          <Controller
            name="rentPrice"
            className="form-group"
            placeholder="請選擇"
            as={<CreatableSelect />}
            control={control}
            options={options.rentPriceOptions}
            value={state.rentPrice}
            onChange={([e]) => {
              dispatch({
                type: 'rentPrice',
                option: e
              });

              return e;
            }}
          />

          <span className="float-left badge badge-warning">
            <i>可選擇或輸入租金範圍，例如：0-5000，代表 0 ~ 5000 元</i>
          </span>
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="area">坪數</label>

          <Controller
            name="area"
            className="form-group"
            placeholder="請選擇"
            as={<CreatableSelect />}
            control={control}
            options={options.areaOptions}
            value={state.area}
            onChange={([e]) => {
              dispatch({
                type: 'area',
                option: e
              });

              return e;
            }}
          />

          <span className="float-left badge badge-warning">
            <i>可選擇或輸入坪數範圍，例如：0-10，代表 0 ~ 10 坪</i>
          </span>
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="floor">樓層</label>

          <Controller
            name="floor"
            placeholder="請選擇樓層"
            as={<Select styles={customStyles} />}
            control={control}
            options={options.floorOptions}
            value={state.floor}
            onChange={([e]) => {
              dispatch({
                type: 'floor',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="shape">房屋類型</label>

          <Controller
            isMulti
            name="shape"
            placeholder="請選擇房屋類型"
            as={<Select styles={customStyles} />}
            control={control}
            options={options.shapeOptions}
            value={state.shape}
            onChange={([e]) => {
              dispatch({
                type: 'shape',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="option">提供設備</label>

          <Controller
            isMulti
            name="supportOption"
            placeholder="請選擇"
            as={<Select styles={customStyles} />}
            control={control}
            options={options.supportOptions}
            value={state.supportOption}
            onChange={([e]) => {
              dispatch({
                type: 'supportOption',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="other">其他條件</label>

          <Controller
            isMulti
            name="other"
            placeholder="請選擇"
            as={<Select />}
            control={control}
            options={options.otherOptions}
            value={state.other}
            onChange={([e]) => {
              dispatch({
                type: 'other',
                option: e
              });

              return e;
            }}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            查詢
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
