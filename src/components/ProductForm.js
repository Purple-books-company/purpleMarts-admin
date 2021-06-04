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
    name: '',
    description: '',
    unitPrice: '',
    categoryId: '',
    supplierId: '',
    images: [],
    unitweight: 0,
    quantityPerUnit: 0,
    discount: 0,
    unitInStock: 0,
  };

  const [detail, setDetail] = useState(initialDetail);
  const [images, setImages] = useState([]);
  const [imageUrlVal, setImageUrlVal] = useState('');

  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const addImageUrl = (e) => {
    if (imageUrlVal.length > 0 && imageUrlVal.startsWith('http')) {
      setImages([...images, imageUrlVal]);
      setImageUrlVal('');
    }
  };

  const removeImage = (e) => {
    // setImages(images.filter((item) => item.image !== val));
    console.log(e.target.value);
    let newImages = [];

    for (let i in images) {
      if (i == e.target.value) {
        continue;
      }
      newImages.push(images[i]);
    }

    console.log(newImages);
    setImages(newImages);
  };

  return (
    <>
      {/* <ContainerRow style={{ backgroundColor: 'white', margin: '2%' }} full> */}

      <ContainerColumn className='col-md-12'>
        <ContainerRow>
          <ContainerColumn className='col-md-4' auto>
            <Input
              type='text'
              name='name'
              value={detail.name}
              placeholder='Name of the Product'
              onChange={handleChange}
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4' auto>
            <Input
              type='number'
              name='unitPrice'
              value={detail.unitPrice}
              onChange={handleChange}
              placeholder='original price'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <div class='input-group mb-2 mr-sm-2'>
              <Input
                type='text'
                onChange={(e) => setImageUrlVal(e.target.value)}
                name='images'
                value={imageUrlVal}
                placeholder='Image Url '
              />
              <button
                className='btn btn-success'
                style={{ margin: '2%' }}
                name='addImages'
                onClick={addImageUrl}
              >
                +
              </button>
            </div>
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <select
              className='form-control'
              style={{ margin: '2%', borderColor: ColorOne }}
              name='categoryId'
              onChange={handleChange}
              value={detail.categoryId}
            >
              <option selected>Select category Id </option>
              <option value='ambani'>Ambani</option>
              <option value='bezos'>Bezos</option>
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <select
              className='form-control'
              style={{ margin: '2%', borderColor: ColorOne }}
              name='supplierId'
              onChange={handleChange}
              value={detail.supplierId}
            >
              <option selected>Select Supplier Id</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-4' auto>
            <textarea
              name='description'
              value={detail.description}
              onChange={handleChange}
              className='form-control'
              rows='1'
              placeholder='Description'
              style={{ borderColor: ColorOne, margin: '2%' }}
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              onChange={handleChange}
              name='unitweight'
              value={detail.unitweight}
              placeholder='unitweight'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              onChange={handleChange}
              name='quantityPerUnit'
              value={detail.quantityPerUnit}
              placeholder='quantityPerUnit'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              onChange={handleChange}
              name='discount'
              value={detail.discount}
              placeholder='discount'
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              onChange={handleChange}
              name='unitInStock'
              value={detail.unitInStock}
              placeholder='unitInStock'
            />
          </ContainerColumn>
        </ContainerRow>
        <ContainerRow auto>
          {images.length > 0 &&
            images.map((item, index) => (
              <ContainerColumn className='col-md-3'>
                <Imageview src={item} />
                <Formlable>Image Url-{index}</Formlable>
                <button
                  className='btn btn-danger'
                  name='deleteImage'
                  value={index}
                  onClick={(e) => removeImage(e)}
                >
                  Remove
                </button>
              </ContainerColumn>
            ))}
        </ContainerRow>
        {/* <div class='input-group mb-2 mr-sm-2'>
          <input
            type='text'
            class='form-control'
            id='inlineFormInputGroupUsername2'
            placeholder='Username'
          />
          <div class='input-group-prepend'>
            <div class='input-group-text'>@</div>
          </div>
        </div> */}
      </ContainerColumn>
      <Submitbutton>POST</Submitbutton>

      {/* </ContainerRow> */}
    </>
  );
}

export default ProductForm;
