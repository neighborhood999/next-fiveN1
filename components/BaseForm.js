import React from 'react';
import { Creatable } from 'react-select';
import { sectionListOptionsHelper } from '../utils';
import { Select } from '../utils/styledComponent';
import {
  urlJumpOptions,
  sectionListOptions,
  kindOptions,
  orderOptions,
  orderTypeByTimeOptions,
  orderTypeByMoneyOptions,
  rentPriceOptions,
  sexOptions,
  hasImageOptions,
  notCoverOptions,
  roleOptions,
  areaOptions,
  shapeOptions,
  floorOptions,
  supportOptions,
  otherOptions
} from '../utils/options';

const BaseForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setFieldTouched
}) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group col-md-3">
        <label htmlFor="urlJump">地區</label>
        <Select
          id="urlJump"
          className={
            touched.urlJump && errors.urlJump
              ? 'form-group error'
              : 'form-group'
          }
          placeholder="請選擇地區"
          onChange={value => setFieldValue('urlJump', value)}
          onBlur={value => setFieldTouched('urlJump', true)}
          value={values.urlJump}
          options={urlJumpOptions}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="section">鄉鎮</label>
        <Select
          id="section"
          className={
            touched.section && errors.section
              ? 'form-group error'
              : 'form-group'
          }
          placeholder="請選擇"
          onChange={value => setFieldValue('section', value)}
          onBlur={value => setFieldTouched('section', true)}
          options={sectionListOptionsHelper(values)}
          value={values.section}
          multi={true}
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="kind">類型</label>
        <Select
          id="kind"
          className={
            touched.kind && errors.kind ? 'form-group error' : 'form-group'
          }
          placeholder="請選擇租屋類型"
          onChange={value => setFieldValue('kind', value)}
          onBlur={value => setFieldTouched('kind', true)}
          value={values.kind}
          options={kindOptions}
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="order">依據</label>
        <Select
          id="order"
          className={
            touched.order && errors.order ? 'form-group error' : 'form-group'
          }
          placeholder="請選擇刊登條件"
          onChange={value => {
            setFieldValue('order', value);
            setFieldValue('orderType', null);
          }}
          onBlur={value => setFieldTouched('order', true)}
          value={values.order}
          options={orderOptions}
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="orderType">刊登順序</label>
        <Select
          id="orderType"
          className={
            touched.orderType && errors.orderType
              ? 'form-group error'
              : 'form-group'
          }
          placeholder="請選擇刊登順序"
          onChange={value => {
            if (values.order === null) return;
            setFieldValue('orderType', value);
          }}
          onBlur={value => setFieldTouched('orderType', true)}
          value={values.orderType}
          options={
            values.order === null
              ? []
              : values.order !== null && values.order.value === 'posttime'
                ? orderTypeByTimeOptions
                : orderTypeByMoneyOptions
          }
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="sex">性別</label>
        <Select
          id="sex"
          className={touched.sex && errors.sex ? 'error' : ''}
          placeholder="請選擇性別"
          onChange={value => setFieldValue('sex', value)}
          onBlur={value => setFieldTouched('sex', true)}
          value={values.sex}
          options={sexOptions}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="hasImage">是否有房屋照片</label>
        <Select
          id="hasImage"
          className={touched.hasImage && errors.hasImage ? 'error' : ''}
          placeholder="請選擇"
          onChange={value => setFieldValue('hasImage', value)}
          onBlur={value => setFieldTouched('hasImage', true)}
          value={values.hasImage}
          options={hasImageOptions}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="notCover">排除頂樓加蓋</label>
        <Select
          id="notCover"
          className={touched.notCover && errors.notCover ? 'error' : ''}
          placeholder="請選擇"
          onChange={value => setFieldValue('notCover', value)}
          onBlur={value => setFieldTouched('notCover', true)}
          value={values.notCover}
          options={notCoverOptions}
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="role">是否為屋主刊登</label>
        <Select
          id="role"
          className={touched.role && errors.role ? 'error' : ''}
          placeholder="請選擇"
          onChange={value => setFieldValue('role', value)}
          onBlur={value => setFieldTouched('role', true)}
          value={values.role}
          options={roleOptions}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="rentPrice">租金</label>
        <Creatable
          id="rentPrice"
          className="form-group"
          onChange={value =>
            value === null
              ? setFieldValue('rentPrice', { label: '不限', value: '' })
              : setFieldValue('rentPrice', value)
          }
          onBlur={value => setFieldTouched('rentPrice', true)}
          value={values.rentPrice}
          options={rentPriceOptions}
        />
        <span className="float-left badge badge-warning">
          <i>可選擇或輸入租金範圍，例如：0-5000，代表 0 ~ 5000 元</i>
        </span>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="area">坪數</label>
        <Creatable
          id="area"
          className="form-group"
          onChange={value =>
            value === null
              ? setFieldValue('area', { label: '不限', value: '' })
              : setFieldValue('area', value)
          }
          onBlur={value => setFieldTouched('area', true)}
          options={areaOptions}
          value={values.area}
        />
        <span className="float-left badge badge-warning">
          <i>可選擇或輸入坪數範圍，例如：0-10，代表 0 ~ 10 坪</i>
        </span>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="floor">樓層</label>
        <Select
          id="floor"
          className={touched.floor && errors.floor ? 'error' : ''}
          placeholder="請選擇樓層"
          onChange={value => setFieldValue('floor', value)}
          onBlur={value => setFieldTouched('floor', true)}
          options={floorOptions}
          value={values.floor}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="shape">房屋類型</label>
        <Select
          id="shape"
          className="form-group"
          placeholder="請選擇房屋類型"
          onChange={value => setFieldValue('shape', value)}
          onBlur={value => setFieldTouched('shape', true)}
          options={shapeOptions}
          value={values.shape}
          multi={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="option">提供設備</label>
        <Select
          id="option"
          className={touched.option && errors.option ? 'error' : ''}
          placeholder="請選擇"
          onChange={value => setFieldValue('option', value)}
          onBlur={value => setFieldTouched('option', true)}
          value={values.option}
          options={supportOptions}
          multi={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="other">其他條件</label>
        <Select
          id="other"
          className={touched.other && errors.other ? 'error' : ''}
          placeholder="請選擇"
          onChange={value => setFieldValue('other', value)}
          onBlur={value => setFieldTouched('other', true)}
          value={values.other}
          options={otherOptions}
          multi={true}
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

export default BaseForm;
