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
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
    setProduct({ ...product, category: catData[0].name });
  }
  async function getSubCategory(category) {
    let subCat = await getSubCategoryDetail(category);
    setSubCategoryData(subCat);
    setProduct({ ...product, category: category, subCategory: subCat[0].name });
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
        if (key === '') return;

        setVarientKey([...varientKey, { key: key, value: '' }]);
        setKey('');
      }
    } else {
      let temp = [];
      for (let i in varientKey) {
        temp[i] = varientKey[i];
      }
      temp[e.target.id].value = e.target.value;
      console.log(temp);

      setVarientKey(temp);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let data = { ...product };
    data.varients = varientDetail;
    let res = await ApiPostService('product', data);
    console.log(res);
    if (res === true) {
      setProduct(initialDetail);
      setVarientDetail([]);
      setImages([]);
      setAddVarient(initialVarient);
      setSuccessMsg('product saved');
    } else {
      setSuccessMsg('');
      setErrorMsg('error fields!!');
    }
  }
  function removeVarientKey(e) {
    console.log('removed');
    let detail = varientKey;
    detail.splice(e.target.value, 1);
    setVarientDetail([]);
    setImages([]);
    setVarientKey(detail);
  }
  function handleVarientDetail(e) {
    e.preventDefault();
    if (e.target.name !== 'AddVarient') {
      setAddVarient({ ...addVarient, [e.target.name]: e.target.value });
    } else {
      let detail = { ...addVarient };
      detail.types = JSON.parse(JSON.stringify(varientKey));

      for (let i in detail.types) {
        if (detail.types[i].value === '' || detail.types[i].value === null) {
          setErrorMsg('varients keys are empty');
          return;
        }
      }

      detail.image = JSON.parse(JSON.stringify(image));

      console.log(detail);
      setVarientDetail([...varientDetail, detail]);
      setAddVarient(initialVarient);
      e.target.reset();

      setImages([]);
      setSuccessMsg('Varient Added');
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
    e.preventDefault();
    if (e.target.name === 'image') {
      setImageCheck(e.target.value);
    } else {
      setImages([...image, { image: imageCheck }]);
      setImageCheck('');
    }
  }
  function handleRemoveImage(index, imageIndex) {
    // console.log(varientDetail[index]);
    let detail = JSON.parse(JSON.stringify(varientDetail));
    

    let tempDat = detail.splice(index, 1);
    tempDat = tempDat[0];
    if (tempDat.image.length <= 1) {
      alert('atleast one image for a varient');
      return;
    }
    tempDat.image.splice(imageIndex, 1);
    console.log(tempDat);
    detail.push(tempDat);
    setVarientDetail(detail);
    return;
    // let tempDetail = detail.splice(index, 1);
    // tempDetail.image.splice(imageIndex, 1);
    // detail.push(tempDetail);
    // setVarientDetail(detail);
  }
  function handleEditVarient(e) {
    let detail = [...varientDetail];
    let tempDetail = detail.splice(e.target.value, 1);
    tempDetail = tempDetail[0];
    console.log(tempDetail);
    setVarientDetail(detail);
    setImages(tempDetail.image);
    setVarientKey(tempDetail.types);
    setAddVarient(tempDetail);
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
        <SuccessText>{successMsg}</SuccessText>
        <ErrorText>{errorMsg}</ErrorText>
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

      <form
        name='AddVarient'
        onSubmit={(e) => {
          e.preventDefault();
          handleVarientDetail(e);
        }}
      >
        {varientKey.length > 0 && (
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
                {value.value.length !== 0 && `currentValue : ${value.value}`}
                <Input
                  type='text'
                  name={value.key}
                  id={index}
                  // value={value.value}
                  placeholder={value.key}
                  onChange={handleVarientKey}
                />
              </ContainerColumn>
            ))}
            <ContainerColumn className='col-md-6'>
              No of Images Added:{image.length}
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
            </ContainerColumn>
            <Submitbutton type='submit' name='AddVarient'>
              Add Varient
            </Submitbutton>
          </ContainerRow>
        )}
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
            No of Images:{image.length}
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
          <Submitbutton type='submit'>ADD PRODUCT</Submitbutton>
        </ContainerRow>
      </form>
      {imageCheck.length > 10 && (
        <Imageview src={imageCheck} width='100px' height='100px' />
      )}
      <ContainerRow dynamic>
        {varientDetail.map((value, index) => (
          <ContainerColumn className=' col-md-12'>
            <ContainerColumn className='row col-md-12'>
              {value.image.map((imageUrl, imageIndex) => (
                <ContainerColumn className='col-md-3 col-sm-6'>
                  <Imageview
                    src={imageUrl.image}
                    height='100px'
                    width='100px'
                  ></Imageview>
                  <br />
                  <button
                    onClick={() => {
                      handleRemoveImage(index, imageIndex);
                    }}
                    className='btn btn-outline-danger'
                  >
                    remove
                  </button>
                </ContainerColumn>
              ))}
            </ContainerColumn>

            <Formlable>
              Original price:{value.originalPrice}
              offer Price:{value.offerPrice}
              buyingPrice:{value.buyingPrice}
              {value.types.map((typeKey, typeIndex) => (
                <>
                  <Formlable>
                    {typeKey.key}:{typeKey.value}
                    <br />
                  </Formlable>
                </>
              ))}
            </Formlable>
            <button
              className='btn btn-outline-primary m-2'
              onClick={() => setImages(value.image)}
            >
              Add This Image
            </button>
            <button
              className='btn btn-outline-info'
              name='edit'
              value={index}
              onClick={handleEditVarient}
            >
              Remove and edit
            </button>
          </ContainerColumn>
        ))}
      </ContainerRow>
    </>
  );
}

export default ProductTest;
