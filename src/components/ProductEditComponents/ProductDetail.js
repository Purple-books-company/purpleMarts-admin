import { useEffect } from 'react';
import { useState } from 'react';
import { CategoryData, SupplierData } from '../../services/AdminServices';
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  Input,
  LeftAlign,
  Submitbutton,
} from '../../styles/styled';

function ProductDetail({ data }) {
  const [detail, setDetail] = useState({});
  const [supplierData, setSupplierData] = useState([]);
  const [catagoryData, setCatagoryData] = useState([]);
  useEffect(() => {
    setDetail(data);
    let supplier = SupplierData();
    setSupplierData(supplier);

    let catagory = CategoryData();
    console.log(catagory);
    setCatagoryData(catagory);
  }, []);
  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  function handleSubmit() {
    console.log(detail);
    console.log('submittd');
  }

  return (
    <>
      <Card deg='40'>
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
            <select name='supplierId' className='form-control'>
              {supplierData.map((value, index) => {
                if (value.id == detail.supplierId)
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
          <ContainerColumn name='catagoryId' className='col-md-4'>
            <CenterAlign dark>Catagory</CenterAlign>
            <select className='form-control' style={{ margin: '2%' }}>
              {catagoryData.map((value, index) => {
                if (value.id == detail.categoryId)
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
        </ContainerRow>
        <Submitbutton type='submit' onClick={handleSubmit}>
          Update
        </Submitbutton>
      </Card>
    </>
  );
}

export default ProductDetail;
