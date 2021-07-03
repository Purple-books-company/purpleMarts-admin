import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CategoryData,
  getSubCategoryDetail,
  SupplierData,
} from '../../services/AdminServices';
import { ApiPostService } from '../../services/ApiServices';
import {
  ContainerColumn,
  ContainerRow,
  Input,
  Formlable,
  Imageview,
  Submitbutton,
  ErrorText,
  SuccessText,
  ToggleButton,
  CenterAlign,
} from '../../styles/styled';

function ProductTest() {
  let initialState = {
    product: false,
    varientType: false,
    varientDetail: false,
  };
  let initialDetail = {
    name: '',
    description: '',
    quantityPerUnit: '',
    originalPrice: '',
    unitWeight: '',
    offerPrice: '',
    image: [],
    buyingPrice: [],
    supplier: '',
    category: '',
    subCategory: '',
    varients: '',
  };
  let initialVarient = {
    offerPrice: '',
    originalPrice: '',
    buyingPrice: '',
    image: [],
    types: [],
  };
  const [toggleForm, setToggleForm] = useState(initialState);
  const [product, setProduct] = useState(initialDetail);
  const [categoryData, setCategoryData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [varientKey, setVarientKey] = useState([]);
  const [varientDetail, setVarientDetail] = useState([]);
  const [addVarient, setAddVarient] = useState(initialVarient);
  const [image, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imageCheck, setImageCheck] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    setToggleForm({ ...initialState, product: true });
    getData();
  }, []);
  async function getData() {
    let catData = await CategoryData();
    setCategoryData(catData);
    getSubCategory(catData[0].name);
    let suppData = await SupplierData();
    setSupplierData(suppData);
  }
  async function getSubCategory(category) {
    let subCat = await getSubCategoryDetail(category);
    setSubCategoryData(subCat);
    setProduct({ ...product, category: category });
  }
  function handleToggle(e) {
    if (toggleForm.product === true) {
      console.log(image);
      setProduct({ ...product, image: image });
    }
    if (e.target.id === 'product') {
      setImages(product.image);
    } else {
      setImages([]);
    }
    setToggleForm({ ...initialState, [e.target.id]: true });
  }
  function handleVarientKey(e) {
    if (toggleForm.varientType) {
      if (e.target.name === 'key') {
        setKey(e.target.value);
      } else {
        for (let i in varientKey) {
          if (varientKey[i].key == key) {
            alert('alreay key available');
            return;
          }
        }

        setVarientKey([...varientKey, { key: key, value: '' }]);
        setKey('');
      }
    } else {
      let temp = varientKey;
      temp[e.target.id].value = e.target.value;
      setVarientKey(temp);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let data = { ...product };
    data.varients = varientDetail;
    let res = await ApiPostService('product', data);
    console.log(res);
    console.log(data);
  }
  function removeVarientKey(e) {}
  function handleVarientDetail(e) {
    if (e.target.name !== 'AddVarient') {
      setAddVarient({ ...addVarient, [e.target.name]: e.target.value });
    } else {
      let detail = { ...addVarient };
      detail.types = varientKey;
      detail.image = image;
      console.log(detail);
      setVarientDetail([...varientDetail, detail]);
      setImages([]);
    }
  }
  function handleCategoryChange(e) {
    setProduct({ ...product, category: e.target.value });
    getSubCategory(e.target.value);
  }
  function handleProductChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  function handleImageChange(e) {
    if (e.target.name === 'image') {
      setImageCheck(e.target.value);
    } else {
      setImages([...image, { image: imageCheck }]);
      setImageCheck('');
    }
  }

  return (
    <>
      <ContainerRow dynamic>
        <ContainerColumn height='10%' className='col-md-4 col-6'>
          <ToggleButton
            active={toggleForm.product}
            id='product'
            value='productdetail'
            onClick={handleToggle}
          >
            product detail
          </ToggleButton>
        </ContainerColumn>

        <ContainerColumn height='10%' className='col-md-4 col-6'>
          <ToggleButton
            active={toggleForm.varientType}
            id='varientType'
            value='advertisement'
            onClick={handleToggle}
          >
            Types
          </ToggleButton>
        </ContainerColumn>

        <ContainerColumn height='10%' className='col-md-4 col'>
          <ToggleButton
            active={toggleForm.varientDetail}
            id='varientDetail'
            onClick={handleToggle}
          >
            Varient details
          </ToggleButton>
        </ContainerColumn>
      </ContainerRow>
      <ContainerRow
        dynamic
        style={{
          padding: '10px',
          display: toggleForm.varientType ? '' : 'none',
          marginTop: '2%',
        }}
      >
        <ContainerColumn className='col-md-12'>
          <ErrorText>
            Warning adding or removing before adding varient, else varient
            detail will be deleted
          </ErrorText>
        </ContainerColumn>
        <ContainerColumn className='col-md-6 '>
          <Formlable>Add Varient types</Formlable>
          eg(colour,size....)
        </ContainerColumn>
        <ContainerColumn className='col-md-6 '>
          <Input
            type='text'
            placeholder='add varient'
            value={key}
            name='key'
            onChange={handleVarientKey}
          />
          {varientKey.map((value, index) => (
            <p
              className='btn btn-outline-danger ml-1'
              value={index}
              key={value.key}
              onClick={removeVarientKey}
            >
              {value.key}
            </p>
          ))}
        </ContainerColumn>

        <Submitbutton name='addKey' onClick={handleVarientKey}>
          Add Key
        </Submitbutton>
      </ContainerRow>
      <form>
        <ContainerRow
          dynamic
          style={{ padding: '10px', display: toggleForm.product ? '' : 'none' }}
        >
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              placeholder='product name'
              name='name'
              value={product.name}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              name='quantityPerUnit'
              placeholder='quantity per unit'
              min='0'
              value={product.quantityPerUnit}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              name='unitWeight'
              placeholder='weight'
              min='0'
              value={product.unitWeight}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              name='offerPrice'
              placeholder='offerPrice'
              min='0'
              value={product.offerPrice}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              name='buyingPrice'
              placeholder='buyingPrice'
              min='0'
              value={product.buyingPrice}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <Input
              type='number'
              name='originalPrice'
              placeholder='originalPrice'
              min='0'
              value={product.originalPrice}
              onChange={handleProductChange}
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <select
              className='form-control m-2'
              name='category'
              value={product.category}
              onChange={handleCategoryChange}
              title='choose category'
            >
              {categoryData.map((value, index) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <select
              className='form-control m-2'
              name='subCategory'
              value={product.subCategory}
              onChange={handleProductChange}
              title='choose sub category'
            >
              {subCategoryData.map((value, index) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-4'>
            <select
              className='form-control m-2'
              name='supplier'
              value={product.supplier}
              title='choose supplier'
              onChange={handleProductChange}
            >
              {supplierData.map((value, index) => (
                <option value={value.id} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-6'>
            <textarea
              onChange={handleProductChange}
              row='2'
              name='description'
              placeholder='description'
              // value={product.description}
              className='form-control m-2  '
              required
            />
          </ContainerColumn>
          <ContainerColumn className='col-md-6'>
            <Input
              placeholder='image'
              type='text'
              name='image'
              value={imageCheck}
              onChange={handleImageChange}
            />
            <button
              type='button'
              className='btn btn-outline-success m-2'
              onClick={handleImageChange}
            >
              Add Image
            </button>
          </ContainerColumn>
        </ContainerRow>
        <Submitbutton onClick={handleSubmit} type='submit'>
          ADD PRODUCT
        </Submitbutton>
      </form>
      <ContainerRow
        dynamic
        style={{
          padding: '10px',
          display: toggleForm.varientDetail ? '' : 'none',
        }}
      >
        <ContainerColumn className='col-md-4'>
          <Input
            type='number'
            name='offerPrice'
            placeholder='offerPrice'
            min='0'
            value={addVarient.offerPrice}
            onChange={handleVarientDetail}
            required
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='number'
            name='buyingPrice'
            placeholder='buyingPrice'
            min='0'
            value={addVarient.buyingPrice}
            onChange={handleVarientDetail}
            required
          />
        </ContainerColumn>
        <ContainerColumn className='col-md-4'>
          <Input
            type='number'
            name='originalPrice'
            placeholder='originalPrice'
            min='0'
            value={addVarient.originalPrice}
            onChange={handleVarientDetail}
            required
          />
        </ContainerColumn>
        {varientKey.map((value, index) => (
          <ContainerColumn className='col-md-4'>
            <Input
              type='text'
              name={value.key}
              id={index}
              placeholder={value.key}
              onChange={handleVarientKey}
              required
            />
          </ContainerColumn>
        ))}
        <ContainerColumn className='col-md-6'>
          <Input
            placeholder='image'
            type='text'
            name='image'
            value={imageCheck}
            onChange={handleImageChange}
          />
          <button
            className='btn btn-outline-success m-2'
            onClick={handleImageChange}
          >
            Add Image
          </button>
          <button
            className='btn btn-outline-primary m-2'
            onClick={() => {
              if (varientDetail.length === 0 && product.image.length === 0) {
                alert('No previous Images');
              } else if (varientDetail.length != 0) {
                setImages(varientDetail[varientDetail.length - 1].image);
              } else {
                setImages(product.image);
              }
            }}
          >
            Add previous Image
          </button>
        </ContainerColumn>
        <Submitbutton onClick={handleVarientDetail} name='AddVarient'>
          Add Varient
        </Submitbutton>
      </ContainerRow>
      {imageCheck.length > 10 && (
        <Imageview src={imageCheck} width='100px' height='100px' />
      )}
    </>
  );
}

export default ProductTest;
