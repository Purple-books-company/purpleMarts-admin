import { useState } from 'react';
import { ColorOne } from '../styles/color';
import logo from '../assets/logo/logo.png';
import {
  Card,
  Container,
  ContainerColumn,
  ContainerRow,
  Input,
  Title,
  Formlable,
  Imageview,
  Submitbutton,
} from '../styles/styled';
const imgSrc = require('../assets/logo/logo.png');

function ProductForm() {
  let initialDetail = {
    productName: '',
    brandName: '',
    originalPrice: '',
    ourPrice: '',
    originalUrl: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
  };
  const [detail, setDetail] = useState(initialDetail);
  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <ContainerRow style={{ backgroundColor: 'white', margin: '2%' }} full> */}

      <ContainerColumn className='col-md-12'>
        <ContainerRow>
          <ContainerColumn className='col-md-4' auto>
            <Input
              type='text'
              name='productName'
              placeholder='product name'
              onChange={handleChange}
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4' auto>
            <Input
              type='text'
              onChange={handleChange}
              name='brandName'
              placeholder='brand name'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4' auto>
            <Input
              type='number'
              onChange={handleChange}
              name='originalPrice'
              placeholder='original price'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              onChange={handleChange}
              name='ourPrice'
              placeholder='our price'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              onChange={handleChange}
              name='originalUrl'
              placeholder='Original Image'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              onChange={handleChange}
              name='imageUrl1'
              placeholder='Image url 1'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              onChange={handleChange}
              name='imageUrl2'
              placeholder='Image url2'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              onChange={handleChange}
              name='imageUrl3'
              placeholder='Image url3'
            />
          </ContainerColumn>
        </ContainerRow>
        <ContainerRow auto>
          {detail.originalUrl.length > 10 && (
            <ContainerColumn className='col-md-3'>
              <Imageview src={detail.originalUrl} />
              <Formlable>originalUrl</Formlable>
            </ContainerColumn>
          )}
          {detail.imageUrl1.length > 10 && (
            <ContainerColumn className='col-md-3'>
              <Imageview src={detail.imageUrl1}></Imageview>
              <Formlable>Image 1</Formlable>
            </ContainerColumn>
          )}
          {detail.imageUrl2.length > 10 && (
            <ContainerColumn className='col-md-3'>
              <Imageview src={detail.imageUrl2}></Imageview>
              <Formlable>Image 2</Formlable>
            </ContainerColumn>
          )}
          {detail.imageUrl3.length > 10 && (
            <ContainerColumn className='col-md-3'>
              <Imageview src={detail.imageUrl3} />
              <Formlable>Image 3</Formlable>
            </ContainerColumn>
          )}
        </ContainerRow>
      </ContainerColumn>
      <Submitbutton>POST</Submitbutton>

      {/* </ContainerRow> */}
    </>
  );
}

export default ProductForm;
