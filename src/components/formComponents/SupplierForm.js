import { useState, useEffect } from 'react';
import { ColorOne } from '../../styles/color';
import {
  ContainerColumn,
  ContainerRow,
  ErrorText,
  Input,
  Submitbutton,
  SuccessText,
} from '../../styles/styled';
import { ApiPostService } from '../../services/ApiServices';
import Loader from '../Loader';
import { getAllSupplier } from '../../services/AdminServices';

function SupplierForm({ data }) {
  let initialDetail = {
    name: '',
    companyName: '',
    contactDescription: '',
    phoneNumber: '',
    address: '',
    pincode: '',
    nation: 'India',
    deliveryName: '',
    state: '',
    city: '',
  };
  const [errorMsg, setErrorMsg] = useState('');
  const [detail, setDetail] = useState(initialDetail);
  const [successMsg, setSuccessMsg] = useState('');
  const [loader, setLoader] = useState(false);
  function handleChange(e) {
    //var phoneno = /^\d{10}$/;
    //  if((inputtxt.value.match(phoneno))

    setDetail({ ...detail, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (data !== null) {
      setDetail(data);
    }
  }, []);

  async function handleSubmit() {
    console.log('submitted');
    setErrorMsg([]);
    let data = {
      name: detail.name,
      contactDescription: detail.contactDescription,
      companyName: detail.companyName,
      personalInfo: {
        phoneNumber: detail.phoneNumber,
        address: detail.address,
        pincode: detail.pincode,
        nation: detail.nation,
        deliveryName: detail.deliveryName,
        state: detail.state,
        city: detail.city,
      },
    };

    if (data != null) {
      console.log('updated');
    } else {
      console.log('Added');
    }

    setLoader(false);
    return;

    const res = await ApiPostService('supplierAdd', initialDetail);
    console.log(res);
    if (res === null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res === true) {
      //success
      setDetail(initialDetail);
      setSuccessMsg('Supplier saved');
      await getAllSupplier();
    } else if (res !== false) {
      let datakey = Object.keys(res);
      let errors;
      console.log(res);
      if (datakey.length > 0) {
        errors = `invalid data on ${datakey.length} fields check!!`;
      }

      setErrorMsg(errors);
    }
    setLoader(false);

    // console.log(detail);
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ContainerColumn className='col-md-12'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ErrorText>{errorMsg}</ErrorText>
            <SuccessText>{successMsg}</SuccessText>
            <ContainerRow>
              <ContainerColumn className='col-md-4'>
                <Input
                  type='text'
                  name='name'
                  value={detail.name}
                  placeholder='supplier name'
                  onChange={handleChange}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  type='text'
                  name='companyName'
                  value={detail.companyName}
                  placeholder='company name'
                  onChange={handleChange}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  type='text'
                  value={detail.contactDescription}
                  name='contactDescription'
                  placeholder='contactDescription'
                  onChange={handleChange}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  type='tel'
                  name='phoneNumber'
                  value={detail.phoneNumber}
                  pattern='[0-9]{10}'
                  placeholder='phonenumber'
                  onChange={handleChange}
                  min='10'
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <textarea
                  rows='2'
                  name='address'
                  className='form-control'
                  placeholder='address'
                  style={{ margin: '2%', borderColor: ColorOne }}
                  onChange={handleChange}
                  value={detail.address}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='city'
                  placeholder='city'
                  value={detail.city}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='state'
                  placeholder='state'
                  value={detail.state}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  onChange={handleChange}
                  type='Number'
                  name='pincode'
                  placeholder='pin'
                  value={detail.pincode}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='nation'
                  placeholder='nation'
                  value={detail.nation}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-4'>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='deliveryName'
                  placeholder='deliveryname'
                  value={detail.deliveryName}
                  required={true}
                 
                />
              </ContainerColumn>

              <Submitbutton type='submit'>
                {data ? 'Update' : 'POST'}
              </Submitbutton>
            </ContainerRow>
            <ErrorText>{errorMsg}</ErrorText>
          </form>
        </ContainerColumn>
      )}
    </>
  );
}
export default SupplierForm;
