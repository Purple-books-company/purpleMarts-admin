import { ColorOne } from '../../styles/color';
import {
  ContainerColumn,
  Input,
  Formlable,
  Title,
  Imageview,
  ContainerRow,
  Submitbutton,
  LeftAlign,
  RightAlign,
} from '../../styles/styled';

const SocialMedia = () => {
  return (
    <>
      <Title>SOCIAL MEDIA </Title>
      <ContainerRow dynamic>
        <ContainerColumn className='col-md-5'>
          <RightAlign>Social MEDIA NAME</RightAlign>
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <Input type='text' placeholder='name' name='name' required />
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <RightAlign>SOCIAL MEDIA LINK</RightAlign>
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <Input type='text' placeholder='name' name='name' required />
        </ContainerColumn>
        <ContainerColumn height='20%' className='col-md-5'>
          <RightAlign>Image</RightAlign>

          {/* {detail.image.length > 10 && (
            <Imageview src={detail.image}></Imageview>
          )} */}
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <Input type='text' name='image' placeholder='imageUrl' required />
        </ContainerColumn>
      </ContainerRow>
    </>
  );
};

export default SocialMedia;
