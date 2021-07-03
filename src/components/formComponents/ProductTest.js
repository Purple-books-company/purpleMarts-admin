import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CategoryData,
  getSubCategoryDetail,
  SupplierData,
} from '../../services/AdminServices';
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
    unitWeight: '',
    offerPrice: '',
    image: [],
    buyingPrice: [],
    supplier: '',
    category: '',
    subCategory: '',
    varients: '',
  };
  const [toggleForm, setToggleForm] = useState(initialState);
  const [product, setProduct] = useState(initialDetail);
  const [categoryData, setCategoryData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

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
    setToggleForm({ ...initialState, [e.target.id]: true });
  }
  function handleCategoryChange(e) {}
  function handleProductChange(e) {}
  function handleImageChange(e) {}

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
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </ContainerColumn>
          <ContainerColumn className='col-md-6'>
            <textarea
              onChange={handleProductChange}
              row='2'
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
              onChange={handleImageChange}
            />
            <button className='btn btn-outline-success m-2'>Add Image</button>
          </ContainerColumn>
        </ContainerRow>
      </form>
    </>
  );
}

export default ProductTest;
