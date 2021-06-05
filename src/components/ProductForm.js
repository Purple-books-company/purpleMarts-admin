import { useEffect, useState } from 'react';
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
  ErrorText,
  SuccessText,
} from '../styles/styled';
import {
  CategoryData,
  getAllCategory,
  getAllSupplier,
  SupplierData,
} from '../services/AdminServices';
import { ApiPostService } from '../services/ApiServices';
import Loader from './Loader';
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
  const [catagoryData, setCategorydata] = useState([]);
  const [supplierData, setSupplierdata] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(async () => {
    if (CategoryData().length == 0) {
      await getAllCategory();
    }
    if (SupplierData().length == 0) {
      await getAllSupplier();
    }
    setCategorydata(CategoryData());
    console.log(CategoryData());

    setSupplierdata(SupplierData());
  }, []);

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
  const handleSubmit = async () => {
    setLoader(true);
    let data = detail;
    let imageData = [];
    for (let i in images) {
      let temp = { image: images[i] };
      imageData.push(temp);
    }
    data.images = imageData;
    const res = await ApiPostService('productAdd', data);
    if (res == null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res == true) {
      setDetail(initialDetail);
      setSuccessMsg('Product Saved!');
      setImages([]);
      await getAllCategory();
    } else if (res != false) {
      let datakey = Object.keys(res);
      let errors;
      console.log(res);
      if (datakey.length > 0) {
        errors = `invalid data on ${datakey.length} fields check!!`;
      }

      setErrorMsg(errors);
    }
    setLoader(false);
    console.log(data);
  };

  return (
    <>
      {/* <ContainerRow style={{ backgroundColor: 'white', margin: '2%' }} full> */}
      {loader ? (
        <Loader />
      ) : (
        <ContainerColumn height='auto' className='col-md-12'>
          <ErrorText>{errorMsg}</ErrorText>
          <SuccessText>{successMsg}</SuccessText>
          <ContainerRow>
            <ContainerColumn height='auto' className='col-md-4' auto>
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
            <ContainerColumn height='auto' className='col-md-4'>
              <select
                className='form-control'
                style={{ margin: '2%', borderColor: ColorOne }}
                name='categoryId'
                onChange={handleChange}
                value={detail.categoryId}
                placeholder='Select Catagory Id'
              >
                <option defaultValue=''>Select category Id</option>
                {catagoryData.map((value, index) => {
                  return (
                    <option value={value.name} key={index}>
                      {value.name}
                    </option>
                  );
                })}
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
                <option defaultValue=''>Select Supplier Id</option>
                {supplierData.map((value, index) => {
                  return (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  );
                })}
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
            <ContainerColumn height='auto' className='col-md-4'>
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
          <Submitbutton onClick={handleSubmit}>POST</Submitbutton>
        </ContainerColumn>
      )}

      {/* </ContainerRow> */}
    </>
  );
}

export default ProductForm;
