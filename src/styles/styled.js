import styled from 'styled-components';
import { ColorOne, ColorTwo } from './color';

export const Heading = styled.h2.attrs(() => ({
  className: 'text-primary',
}))`
  font-weight: bold;
`;
export const Title = styled.h5`
  text-align: center;
  color: ${ColorOne};
  justify-content: center;
  width: 30%;

  margin: 0.5%;
  border-radius: 10px;
  margin-left: 35%;
`;

export const Card = styled.div`
  width: 94%;
  min-height: 94%;
  text-align: center;
  max-height: auto;

  box-shadow: 4px 4px 7px 0px ${ColorTwo};
  background: linear-gradient(
    ${(props) => props.deg}deg,
    ${ColorOne} 10%,
    white 10% 90%,
    ${ColorTwo} 90%
  );
  color: ${ColorTwo};
  border-radius: 10px;
  border-top-right-radius: 50px;

  &:hover {
    background: ${(props) => (props.nohover ? '' : ColorOne)};
    box-shadow: 4px 4px 7px 0px ${ColorOne};
    color: ${ColorTwo};
  }
`;
export const Container = styled.div.attrs(() => ({
  className: 'container-fluid',
}))`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Testing = ({ className, ...rest }) => (
  <div className={className} {...rest} />
);
export const ContainerRow = styled.div.attrs((props) => ({
  className: 'row',
}))`
  min-height: ${(props) => {
    if (props.half) return '48%';
    else if (props.full) return '100%';
    else if (props.auto) return '10%';
    else return '30%';
  }};
`;
export const ContainerColumn = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: none;
  margin-top: 1%;
`;

export const Input = styled.input.attrs((props) => ({
  type: props.type,
  name: props.name,
  className: 'form-control',

  placeholder: props.placeholder,
}))`
  margin: 2%;
  border-color: ${ColorOne};
`;

export const Formlable = styled.p`
  color: ${ColorTwo};
`;

export const Imageview = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 70%;
  height: 20%;
`;
export const Submitbutton = styled.button.attrs((props) => ({
  type: 'button',
  className: 'form-control',
}))`
  background-color: ${ColorOne};
  color: white;
  width: 50%;
  margin: 3%;
  margin-left: 25%;
  &:hover {
    background-color: ${ColorTwo};
  }
`;
