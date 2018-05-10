import styled from 'styled-components';
import ReactSelect from 'react-select';

const baseContainer = ({ children }) => (
  <div className="container">{children}</div>
);

export const Container = styled(baseContainer)`
  min-height: calc(100vh - 20px);
`;

export const Select = styled(ReactSelect)`
  &.Select.error > .Select-control {
    border-color: #dc3545;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(220, 53, 69, 0.1);
    background: #fff;
  }
`;
