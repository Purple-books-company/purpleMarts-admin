import {
  ContainerColumn,
  Input,
  Formlable,
  Title,
  Imageview,
  ContainerRow,
  Submitbutton,
  LeftAlign,
} from '../../styles/styled';
const Advertisement = () => {
  return (
    <ContainerRow style={{ backgroundColor: 'yellow' }} full>
      <ContainerColumn height='40%' className='col-md-4'>
        <Imageview
          src='https://d8it4huxumps7.cloudfront.net/images/robot1.png'
          height='60%'
        />
      </ContainerColumn>
      <ContainerColumn className='col-md-4'></ContainerColumn>
    </ContainerRow>
  );
};

export default Advertisement;
