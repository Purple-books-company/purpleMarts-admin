import styled from 'styled-components';
import { ColorOne, ColorTwo } from './color';
import logo from '../assets/logo/logo.png';

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
  width: ${(props) => (props.width ? props.width : '94%')};
  height: ${(props) => (props.height ? props.height : '94%')};
  text-align: center;

  margin: ${(props) => (props.margin ? props.margin : '3%')};
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  box-shadow: 4px 4px 7px 0px ${ColorTwo};
  background-image: linear-gradient(
    ${(props) => props.deg}deg,
    ${ColorOne} 10%,
    white 10% 90%,
    ${ColorTwo} 90%
  );

  color: ${ColorTwo};
  border-radius: 10px;

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
  height: 100%;

  width: 100%;
  max-height: auto;
`;

const Testing = ({ className, ...rest }) => (
  <div className={className} {...rest} />
);
export const ContainerRow = styled.div.attrs((props) => ({
  className: 'row',
}))`
  height: ${(props) => {
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
  height: ${(props) => (props.height ? props.height : '30%')};
`;

export const Input = styled.input.attrs((props) => ({
  type: props.type,
  name: props.name,
  className: 'form-control',
  value: props.value,
  required: props.required,
  min: props.min ? props.min : 'auto',
  pattern: props.pattern ? props.pattern : null,

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
  alt: props.alternate,
}))`
  height: 50%;
  width: ${(props) => (props.width ? props.width : '50%')};
`;

export const ImageTag = styled.image.attrs((props) => ({
  src: props.src,
}))`
  width: 20%;
  height: 20%;
`;
export const Submitbutton = styled.button.attrs((props) => ({
  type: props.type ? props.type : 'button',
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

export const RightAlign = styled.p`
  text-align: right;
  margin-right: 4%;
  font-weight: bold;
  margin-top: 2%;
`;
export const ErrorText = styled.p`
  color: red;
`;
export const SuccessText = styled.p`
  color: green;
`;
export const LeftAlign = styled.p`
  text-align: left;
`;
export const CenterAlign = styled.div`
  text-align: center;
`;
export const MarginText = styled.p`
  margin-top: 20%;
`;
