import { useState } from 'react';
import { ColorOne } from '../styles/color';
import {
  ContainerColumn,
  ContainerRow,
  Input,
  Submitbutton,
  RightAlign,
  Imageview,
} from '../styles/styled';

function CatagoryForm() {
  const [image, setImage] = useState('');
  return (
    <ContainerColumn className='col-md-12'>
      <ContainerRow>
        <ContainerColumn className='col-md-5'>
          <RightAlign>Catagoryname</RightAlign>
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <Input type='text' placeholder='name' name='name' />
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <RightAlign>CatagoryDescription</RightAlign>
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <textarea
            name='description'
            className='form-control'
            rows='3'
            placeholder='description'
            style={{ borderColor: ColorOne, margin: '2%' }}
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <RightAlign>Image</RightAlign>
          <br></br>
          {image.length > 10 && <Imageview src={image}></Imageview>}
        </ContainerColumn>
        <ContainerColumn className='col-md-5'>
          <Input
            type='text'
            name='image'
            placeholder='imageUrl'
            onChange={(e) => setImage(e.target.value)}
          />
        </ContainerColumn>
      </ContainerRow>
      <Submitbutton>POST</Submitbutton>
    </ContainerColumn>
  );
}

export default CatagoryForm;
