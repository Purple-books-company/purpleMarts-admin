
import styled from 'styled-components';
import { ColorOne, ColorTwo } from './color';

export const Heading = styled.h2.attrs(() => ({
  className: 'text-primary',
}))`
  font-weight: bold;
`;

export const Card = styled.div`
  width: 94%;
  height: 94%;
  text-align: center;

  box-shadow: 4px 4px 7px 0px ${ColorTwo};
  background-color: whitesmoke;
  color: ${ColorOne};
  border-radius: 10px;

  &:hover {
    background-color: ${ColorTwo};
    box-shadow: 4px 4px 7px 0px white;
    color: white;
  }
`;
export const Container = styled.div.attrs(() => ({
  className: 'container-fluid',
}))`
  background-color: ${ColorOne};
  width: 100%;
  height: 100%;
`;

const Testing = ({ className, ...rest }) => (
  <div className={className} {...rest} />
);
export const ContainerRow = styled.div.attrs((props) => ({
  className: 'row',
}))`
  min-height: ${(props) => (props.half ? '48%' : '30%')};
`;
export const ContainerColumn = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: none;
  margin-top: 1%`;

