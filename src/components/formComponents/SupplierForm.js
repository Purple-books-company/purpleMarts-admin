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
import {
  ApiDeleteService,
  ApiPostService,
  ApiPutService,
} from '../../services/ApiServices';
import Loader from '../Loader';
import { getAllSupplier } from '../../services/AdminServices';
import { Redirect} from 'react-router-dom';

function SupplierForm({ data }) {
  let initialDetail = {
    name: '',
    companyName: '',

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
  const [isUpdate, setIsUpdate] = useState(false);
  function handleChange(e) {
    //var phoneno = /^\d{10}$/;
    //  if((inputtxt.value.match(phoneno))

    setDetail({ ...detail, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setData();
  }, [data]);
  const setData = () => {
    if (data !== null && data !== undefined) {
      let temp = {
        name: data.name,
        companyName: data.companyName,
        phoneNumber: data.personalInfo.phoneNumber,
        address: data.personalInfo.address,
        pincode: data.personalInfo.pincode,
        nation: data.personalInfo.nation,
        deliveryName: data.personalInfo.deliveryName,
        state: data.personalInfo.state,
        city: data.personalInfo.city,
      };
      setDetail(temp);
      setIsUpdate(true);
    }
  };

  async function handleSubmit() {
    console.log('submitted');
    setErrorMsg('');
    let tempdata = {
      name: detail.name,

      companyName: detail.companyName,
    };
    let personalInfo = {
      phoneNumber: detail.phoneNumber,
      address: detail.address,
      pincode: detail.pincode,
      nation: detail.nation,
      deliveryName: detail.deliveryName,
      state: detail.state,
      city: detail.city,
    };
    let res;
    if (isUpdate) {
      res = await ApiPutService(
        'supplierInfo',
        data.personalInfo.id,
        personalInfo
      );
    } else {
      res = await ApiPostService('supplierInfo', personalInfo);
    }

    if (res !== null && res !== false) {
      tempdata.personalInfo = personalInfo;
      tempdata.personalInfo.id = res.id;
      if (isUpdate) {
        if (
          tempdata.name !== data.name ||
          tempdata.companyName !== data.companyName
        ) {
          res = await ApiPutService('supplier', data.id, tempdata);
        } else {
          setIsUpdate(false);
          await getAllSupplier();
          setLoader(false);
          setSuccessMsg(
            'supplier Info saved succesfully Redirecting to supplier Page'
          );
          setDetail({ ...initialDetail });
          setTimeout(() => {
            setIsUpdate('finished');
          }, 3000);

          return;
        }
      } else {
        res = await ApiPostService('supplier', tempdata);
      }
    } else {
      setErrorMsg('Check for missing field,error occured in creating Info');
      setLoader(false);
      return;
    }

    if (res === null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res === true) {
      //success
      setDetail(initialDetail);
      setSuccessMsg(
        `Supplier saved ${isUpdate && 'Redirecting to supplier page'}`
      );
      setIsUpdate(false);
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
    if ((res === null || res !== true) && !isUpdate) {
      await ApiDeleteService('supplierInfo', tempdata.personalInfo.id);
    } else if (isUpdate) {
      setErrorMsg('check supplier Info some updation occured');
      setDetail({ ...initialDetail });
    }

    setLoader(false);
    if (isUpdate) setIsUpdate('finished');

    // console.log(detail);
  }
  return (
    <>
      {isUpdate === 'finished' && (
        <Redirect to={{ pathname: '/View', state: { show: 'supplier' } }} />
      )}
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
                {isUpdate && 'name'}
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
                {isUpdate && 'company name'}

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
                {isUpdate && 'phonenumber'}

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
                {isUpdate && 'address'}

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
                {isUpdate && 'city'}

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
                {isUpdate && 'state'}

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
                {isUpdate && 'pincode'}

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
                {isUpdate && 'nation'}

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
                {isUpdate && 'deliveryname'}

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
