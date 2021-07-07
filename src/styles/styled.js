import styled from 'styled-components';
import { ColorOne, ColorTwo } from './color';

// Data not found
export const Msg = styled.h1`
  margin: auto;
  width: 400px;
  padding-top: 175px;
  color: ${ColorOne};
`;
// End

export const Heading = styled.h2.attrs(() => ({
  className: 'text-primary',
}))`
  font-weight: bold;
`;
export const Title = styled.h4`
  text-align: center;
  color: ${ColorOne};
  font-style:"bolder";
  justify-content: center;
  width: auto;

  margin: 0.5%;
`;
let linear1 = (deg) => {
  if (deg == null) {
    deg = '125';
  }
  let temp = `${deg}deg,${ColorTwo} 10%,white 10%`;

  return temp;
};
let linear2 = (deg) => {
  return `${deg}deg,${ColorOne} 10%,white 10% 90% ,${ColorTwo} 90%`;
};

export const Card = styled.div`
  width: ${(props) => (props.width ? props.width : '97%')};
  min-height: ${(props) => (props.height ? props.height : '97%')};
  text-align: center;

  margin: ${(props) => (props.margin ? props.margin : '1.5%')};
  max-height: auto;
  overflow: scroll;
  padding: 0.1%;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  box-shadow: 4px 4px 7px 0px ${ColorTwo};

  color: ${ColorTwo};
  border-radius: 10px;
  background: linear-gradient(
    ${(props) => (props.single ? linear1(props.deg) : linear2(props.deg))}
  );
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

// const Testing = ({ className, ...rest }) => (
//   <div className={className} {...rest} />
// );
export const ContainerRow = styled.div.attrs((props) => ({
  className: 'row',
}))`
  height: ${(props) => {
    if (props.half) return '48%';
    else if (props.full) return '100%';
    else if (props.auto) return '10%';
    else if (props.dynamic) return 'auto';
    else return '30%';
  }};
  /* min-height: ${(props) => (props.min ? '30%' : '0%')}; */
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
  color: ${ColorOne};
`;

export const Imageview = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alternate,
}))`
  height: ${(props) => (props.height ? props.height : '50%')};
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
  color: ${(props) => props.dark && ColorOne};
  font-weight: 500;
`;
export const MarginText = styled.div`
  margin-top: 20%;
`;
export const CenterText = styled.h1`
  text-align: center;
`;
export const MarginAround = styled.div`
  margin: 2%;
`;
export const ToggleButton = styled.button.attrs((props) => ({
  type: props.type ? props.type : 'button',
  className: 'btn ',
  value: props.value,
}))`
  background-color: ${(props) => (!props.active ? ColorOne : 'white')};
  color: ${(props) => (props.active ? ColorOne : 'white')};
  border: none;
  padding: 2%;

  border-radius: 0px;
  width: auto;
  min-width: 100%;
  &:hover {
    background-color: white;
    color: ${ColorOne};
  }
`;
export const ColorButton = styled.button`
  border: ${(props) =>
    props.active ? `4px solid lightgreen` : '4px solid white'};
  background-color: ${(props) => props.color};
  border-radius: 70%;
  width: 1%;
  height: 20px;
`;

export const TypeButton = styled.button.attrs((props) => ({
  className: `btn ${props.active ? 'btn-primary' : 'btn-outline-primary'}`,
}))`
  color: ${(props) => (props.active ? 'white' : ColorTwo)};
`;
export const LightColor = styled.p`
  color: ${ColorTwo};
  font-weight: bolder;
`;
