import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Box, DollarSign, Grid, Hash, MapPin, Menu } from 'react-feather';

const Title = styled.h5`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardText = styled.p`
  margin-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RentInfoList = ({ data }) => {
  const flattenData = [].concat(...data);
  const rentInfos = Object.entries(flattenData).map((rent, index) => (
    <div className="col-md-4" key={index}>
      <div className="card border-secondary mb-3">
        <img
          className="card-img-top"
          alt="preview-photo"
          src={rent[1].preview}
        />
        <div className="card-body">
          <Title className="card-title" data-tip={rent[1].title}>
            {rent[1].title}
          </Title>
          <CardText className="card-text" data-tip={rent[1].address}>
            <MapPin size={16} /> {rent[1].address}
          </CardText>
          <CardText className="card-text">
            <DollarSign size={16} /> 價格：
            {rent[1].price}
          </CardText>
          <CardText className="card-text">
            <Menu size={16} /> {rent[1].floor}
          </CardText>
          <CardText className="card-text">
            <Box size={16} /> 類型：
            {rent[1].optionType}
          </CardText>
          <CardText className="card-text">
            <Grid size={16} /> 坪數：
            {rent[1].ping} 坪
          </CardText>
          <div className="float-right">
            <a className="btn btn-primary" href={rent[1].url} target="_blank">
              點此前往
            </a>
          </div>
          <ReactTooltip />
        </div>
      </div>
    </div>
  ));

  return rentInfos;
};

export default RentInfoList;
