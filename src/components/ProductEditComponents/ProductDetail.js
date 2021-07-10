import { useEffect } from 'react';
import { useState } from 'react';
import {
  CategoryData,
  getSubCategoryDetail,
  SupplierData,
} from '../../services/AdminServices';
import { ApiPutService } from '../../services/ApiServices';
import Loader from '../Loader';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  ContainerRow,
  Imageview,
  Input,
  Submitbutton,
} from '../../styles/styled';

function ProductDetail({ res, refetch }) {
  const [detail, setDetail] = useState(null);
  const [supplierData, setSupplierData] = useState([]);
  const [catagoryData, setCatagoryData] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [image, setImage] = useState('');

  useEffect(() => {
    setDetail(res);
    
  }, [res]);
  useEffect(() => {
    if (res !== null) getProductDetail(res);
  }, []);
  async function getProductDetail(res) {
    console.log(res);
    
    if(CategoryData.length>0) return;
    let category = await CategoryData();
    setCatagoryData(category);
    let supplier = await SupplierData();
    setSupplierData(supplier);
    let subCategory = await getSubCategoryDetail(res.category);
    setSubCategoryDetail(subCategory);
    setDetail(res);
    console.log('fetxhed');
  }

  async function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
    if (e.target.name === 'category') {
      let subCategory = await getSubCategoryDetail(e.target.value);
      setSubCategoryDetail(subCategory);
    }
  }
  async function handleSubmit() {
    let data = { ...detail };
    setDetail(null);
    data.discount = Math.round(
      ((data.originalPrice - data.offerPrice) / data.originalPrice) * 100
    );
    alert(data.discount);
    let id = data.id;
    let response = await ApiPutService('product', id, data);

    if (response === true) {
      await refetch();
    } else {
      alert('error on updation');
      setDetail(res);
    }
    // setDetail(res);
  }
  async function updateImage(e) {
    let data = {
      image: image.image,
      product: detail.id,
      order: image.order,
    };

    let response = await ApiPutService('productImage', e.target.id, data);
    setDetail(null);
    if (response === true) {
      refetch();
      setImage('');
    } else {
      alert('error On update');
      setDetail(res);
    }
  }

  return (
    <>
      {detail === null && <Loader />}
      {detail !== null && (
        <Card deg='40' nohover>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ContainerRow dynamic>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>product Name</CenterAlign>
                <Input
                  type='text'
                  name='name'
                  placeholder='Productname'
                  value={detail.name}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>Description</CenterAlign>
                <textarea
                  className='form-control'
                  row='2'
                  name='description'
                  value={detail.description}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4' auto>
                <CenterAlign dark>Supplier</CenterAlign>
                <select
                  name='supplier'
                  value={detail.supplier}
                  className='form-control'
                  onChange={handleChange}
                >
                  {supplierData.map((value, index) => {
                    if (value.id === detail.supplierId)
                      return (
                        <option key={index} defaultValue={value.id}>
                          {value.name}
                        </option>
                      );
                    else
                      return (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      );
                  })}
                </select>
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>Catagory</CenterAlign>
                <select
                  className='form-control'
                  name='category'
                  value={detail.category}
                  style={{ margin: '2%' }}
                  onChange={handleChange}
                >
                  {catagoryData.map((value, index) => {
                    if (value.name === detail.category)
                      return (
                        <option key={index} defaultValue={value.name}>
                          {value.name}
                        </option>
                      );
                    else
                      return (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      );
                  })}
                </select>
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>SubCatagory</CenterAlign>
                <select
                  className='form-control'
                  name='subCategory'
                  value={detail.subCategory}
                  style={{ margin: '2%' }}
                  onChange={handleChange}
                >
                  {subCategoryDetail.map((value, index) => {
                    if (value.name === detail.subCategory)
                      return (
                        <option
                          key={index}
                          value={value.name}
                          defaultValue={value.name}
                        >
                          {value.name}
                        </option>
                      );
                    else
                      return (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      );
                  })}
                </select>
              </ContainerColumn>

              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>offerPrice</CenterAlign>
                <Input
                  type='text'
                  name='offerPrice'
                  placeholder='offerPrice'
                  value={detail.offerPrice}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>originalPrice</CenterAlign>
                <Input
                  type='text'
                  name='originalPrice'
                  placeholder='originalPrice'
                  value={detail.originalPrice}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>buyingPrice</CenterAlign>
                <Input
                  type='text'
                  name='buyingPrice'
                  placeholder='buyingPrice'
                  value={detail.buyingPrice}
                  onChange={handleChange}
                />
              </ContainerColumn>

              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>UnitInstock</CenterAlign>
                <Input
                  type='text'
                  name='unitInStock'
                  placeholder='unitInStock'
                  value={detail.unitInStock}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>Unit Weight</CenterAlign>
                <Input
                  type='text'
                  name='unitWeight'
                  placeholder='weight'
                  value={detail.unitWeight}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>threshold</CenterAlign>
                <Input
                  type='text'
                  name='threshold'
                  placeholder='threshold'
                  value={detail.threshold}
                  onChange={handleChange}
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <CenterAlign dark>quantityPerUnit</CenterAlign>
                <Input
                  type='text'
                  name='quantityPerUnit'
                  placeholder='quantity'
                  value={detail.quantityPerUnit}
                  onChange={handleChange}
                />
              </ContainerColumn>
            </ContainerRow>
            <Submitbutton type='submit'>Update</Submitbutton>
          </form>
          {image !== '' && (
            <form
              name='imageUpdate'
              id={image.id}
              onSubmit={(e) => {
                e.preventDefault();
                updateImage(e);
              }}
            >
              <Input
                type='text'
                value={image.image}
                name='image'
                onChange={(e) => setImage({ ...image, image: e.target.value })}
                required
              />
              <Submitbutton type='submit'>Update</Submitbutton>
              <br />
              <Imageview src={image.image} height='100px' width='100px' />
            </form>
          )}
          <ContainerRow dynamic>
            {detail.image.map((value, index) => (
              <ContainerColumn className='col-md-3 col mt-2'>
                <Imageview src={value.image} height='130px' width='100px' />
                <br />
                <button
                  onClick={() => setImage(value)}
                  className='btn btn-info'
                >
                  Edit
                </button>
              </ContainerColumn>
            ))}
          </ContainerRow>
        </Card>
      )}
    </>
  );
}

export default ProductDetail;
