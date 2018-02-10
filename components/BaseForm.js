import React from 'react';
import { Creatable } from 'react-select';
import { Select } from './helper';
import {
  urlJumpOptions,
  sectionListOptions,
  kindOptions,
  orderTypeOptions,
  rentPriceOptions,
  sexOptions,
  hasImageOptions,
  notCoverOptions,
  roleOptions
} from './options';

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
          options={sectionListOptions[values.urlJump.value - 1]['section']}
          value={values.section}
          multi
        />
      </div>
      <div className="form-group col-md-3">
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
      <div className="form-group col-md-3">
        <label htmlFor="orderType">刊登順序</label>
        <Select
          id="orderType"
          className={
            touched.orderType && errors.orderType
              ? 'form-group error'
              : 'form-group'
          }
          placeholder="請選擇刊登順序"
          onChange={value => setFieldValue('orderType', value)}
          onBlur={value => setFieldTouched('orderType', true)}
          value={values.orderType}
          options={orderTypeOptions}
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
        <label htmlFor="notCover">是否有房屋照片</label>
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
      <div className="form-group col-md-12">
        <label htmlFor="rentPrice">租金</label>
        <Creatable
          id="rentPrice"
          className={
            touched.rentPrice && errors.rentPrice
              ? 'form-group error'
              : 'form-group'
          }
          onChange={value =>
            value === null
              ? setFieldValue('rentPrice', { label: '無', value: '' })
              : setFieldValue('rentPrice', value)
          }
          onBlur={value => setFieldTouched('rentPrice', true)}
          value={values.rentPrice}
          options={rentPriceOptions}
        />
        <span className="float-left badge badge-warning">
          <i>請選擇或輸入租金範圍，例如：0-10000 - 代表 0 - 10000 元</i>
        </span>
      </div>
      <div className="form-group col-md-12">
        <label htmlFor="area">坪數</label>
        <Creatable
          id="area"
          className="form-group"
          placeholder="請輸入坪數範圍，例如：0-10 - 代表 0 - 10 坪"
          onChange={value => setFieldValue('area', value)}
          onBlur={value => setFieldTouched('area', true)}
          value={values.area}
        />
      </div>
    </div>
    <button type="submit" className="btn btn-primary">
      查詢
    </button>
  </form>
);

export default BaseForm;
