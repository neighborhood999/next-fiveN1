const RentInfoList = ({ data }) => {
  const flattenData = [].concat(...data);
  const rentInfos = Object.entries(flattenData).map((rent, index) => (
    <div className="col-md-4" key={index}>
      <div className="card border-secondary mb-3">
        <img
          className="card-img-top"
          src={rent[1].preview}
          alt="preview-photo"
        />
        <div className="card-body">
          <h5 className="card-title">{rent[1].title}</h5>
          <p className="card-text">地址：{rent[1].address}</p>
          <p className="card-text">價格：NT$ {rent[1].price}</p>
          <p className="card-text">樓層：{rent[1].floor}</p>
          <p className="card-text">類型：{rent[1].optionType}</p>
          <p className="card-text">租屋類型：{rent[1].rentType}</p>
          <p className="card-text">坪數：{rent[1].ping}</p>
          <a className="btn btn-primary" href={rent[1].url}>
            Detail
          </a>
        </div>
      </div>
    </div>
  ));

  return rentInfos;
};

export default RentInfoList;
