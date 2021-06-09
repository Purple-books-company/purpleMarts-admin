import { useState, useEffect } from 'react';
import { getAllCategory } from '../services/AdminServices';
import { ApiPostService } from '../services/ApiServices';
import { ColorOne } from '../styles/color';
import {
  ContainerColumn,
  ContainerRow,
  Input,
  Submitbutton,
  RightAlign,
  Imageview,
  SuccessText,
  ErrorText,
} from '../styles/styled';
import Loader from './Loader';

function CatagoryForm({ data }) {
  let initialstate = {
    image: '',
    description: '',
    name: '',
  };
  const [detail, setDetail] = useState(initialstate);

  useEffect(() => {
    if (data != null) {
      setDetail(data);
    }
  }, [data]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loader, setLoader] = useState(false);

  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  async function handleSubmit() {
    setSuccessMsg('');
    setErrorMsg('');
    setLoader(true);
    //change initial

    if (data != null) {
      console.log('updated');
    } else {
      console.log('Added');
    }

    setLoader(false);
    return;
    const res = await ApiPostService('categoryAdd', detail);

    if (res == null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res == true) {
      setDetail(initialstate);
      setSuccessMsg('Category saved!');
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
  }
  return (
    <>
      <ContainerColumn className='col-md-12'>
        {loader ? (
          <Loader />
        ) : (
          <form
            style={{ margin: '6%' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <SuccessText>{successMsg}</SuccessText>
            <ErrorText>{errorMsg}</ErrorText>
            <ContainerRow>
              <ContainerColumn className='col-md-5'>
                <RightAlign>Catagoryname</RightAlign>
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <Input
                  type='text'
                  placeholder='name'
                  name='name'
                  onChange={handleChange}
                  value={detail.name}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <RightAlign>CatagoryDescription</RightAlign>
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <textarea
                  name='description'
                  className='form-control'
                  rows='3'
                  placeholder='description'
                  value={detail.description}
                  onChange={handleChange}
                  style={{ borderColor: ColorOne, margin: '2%' }}
                  required
                />
              </ContainerColumn>
              <ContainerColumn height='20%' className='col-md-5'>
                <RightAlign>Image</RightAlign>
                <br></br>
                {detail.image.length > 10 && (
                  <Imageview src={detail.image}></Imageview>
                )}
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <Input
                  type='text'
                  name='image'
                  placeholder='imageUrl'
                  value={detail.image}
                  onChange={handleChange}
                  required
                />
              </ContainerColumn>
            </ContainerRow>
            <Submitbutton type='submit' style={{ marginBottom: '2%' }}>
              {data ? 'Update' : 'POST'}
            </Submitbutton>
            <br />
          </form>
        )}
      </ContainerColumn>
    </>
  );
}

export default CatagoryForm;
