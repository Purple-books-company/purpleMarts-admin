import { useState } from 'react';
import { useEffect } from 'react';
import {
  Card,
  ContainerColumn,
  ContainerRow,
  Imageview,
  Input,
} from '../../styles/styled';

function VarientDetail({ data }) {
  let initialstate = {
    sizeValue: '',
    sizeOriginalPrice: '',
    sizeOfferPrice: '',
    colorValue: '',
    colorOriginalPrice: '',
    colorOfferPrice: '',
    image: '',
  };
  const [newdetail, setNewDetail] = useState(initialstate);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    console.log(data);
    let tempData = [];
    for (let i in data.images) {
      console.log(i);
      let varient = data.varients;
      let initialData = {
        size: '',
        color: '',
        image: '',
      };
      initialData.size = varient.size[i] || '';
      initialData.color = varient.color[i] || 'no color';
      initialData.image = data.images[i].image;
      console.log(initialData);
      tempData.push(initialData);
    }
    setDetail(tempData);
  }, [data]);

  function handleRemove(e) {
    let index = e.target.value;
    let tempData = [];
    for (let i in detail) {
      if (i === index) {
        continue;
      }
      tempData.push(detail[i]);
    }
    setDetail(tempData);
  }
  function handleChange(e) {
    setNewDetail({ ...newdetail, [e.target.name]: e.target.value });
  }
  function handleVarient(e) {
    let initialData = {
      size: null,
      color: 'no-color',
      image: '',
    };
    let sizedetail = {
      value: newdetail.sizeValue,
      originalPrice: newdetail.sizeOriginalPrice,
      offerPrice: newdetail.sizeOfferPrice,
    };
    console.log(sizedetail);
    // let sizedetail = { for color
    //   value: newdetail.sizeValue,
    //   originalPrice: newdetail.sizeOriginalPrice,
    //   offerPrice: newdetail.sizeOfferPrice,
    // };
    initialData.size = sizedetail;
    initialData.image = newdetail.image;
    console.log(initialData);
    setDetail([...detail, initialData]);
  }
  return (
    <>
      <ContainerRow dynamic>
        {detail.map((value, index) => (
          <ContainerColumn className='col-md-3'>
            <Card deg='40'>
              <Imageview src={value.image} />
              <br />
              size-{value.size.value}
              <br />
              size Price -{value.size.originalPrice}
              <br />
              size Offer -{value.size.offerPrice}
              <button
                type='button'
                onClick={handleRemove}
                value={index}
                className='form-control btn btn-danger my-2 w-75'
              >
                delete
              </button>
            </Card>
          </ContainerColumn>
        ))}
      </ContainerRow>
      <ContainerRow dynamic>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='sizeValue'
            placeholder='size'
            onChange={handleChange}
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='sizeOriginalPrice'
            placeholder='size original price'
            onChange={handleChange}
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='sizeOfferPrice'
            placeholder='size offer price'
            onChange={handleChange}
          />
        </ContainerColumn>

        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='colorValue'
            placeholder='color'
            onChange={handleChange}
          />{' '}
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='colorOfferPrice'
            placeholder='size offer price'
            onChange={handleChange}
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='colorOfferPrice'
            placeholder='size offer price'
            onChange={handleChange}
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='text'
            className='form-control'
            name='image'
            placeholder='image'
            onChange={handleChange}
          />
        </ContainerColumn>
        <button onClick={handleVarient}>add</button>
      </ContainerRow>
    </>
  );
}
export default VarientDetail;
