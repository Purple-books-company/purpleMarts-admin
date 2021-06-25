import { useState, useEffect } from 'react';
import { CategoryData } from '../../services/AdminServices';
import { ApiPostService } from '../../services/ApiServices';
import { ColorOne, ColorTwo } from '../../styles/color';
import {
  ContainerColumn,
  ContainerRow,
  Input,
  Submitbutton,
  RightAlign,
  Imageview,
  SuccessText,
  ErrorText,
} from '../../styles/styled';
import Loader from '../Loader';

function SubCategoryForm({ data }) {
  let initialstate = {
    image: '',
    description: '',
    name: '',
    category: '',
  };

  const [detail, setDetail] = useState(initialstate);
  const [categoryDetail, setCatagoryDetail] = useState([]);

  useEffect(() => {
    if (data != null) {
      setDetail(data);
    }
    //need to get all category
     let catData = CategoryData().then(res=>{return res});
     setCatagoryDetail(catData);
     alert("dd")
   
  }, [data]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loader, setLoader] = useState(false);

  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
    if (e.target.name === 'image') {
      if (e.target.value.length > 199) {
        setErrorMsg('Image link is more then 200 character');
      } else {
        setErrorMsg('');
      }
    }
  }
  async function handleSubmit() {
    setSuccessMsg('');
    setErrorMsg('');
    setLoader(true);
    //change initial

    // if (data !== null) {
    //   console.log("updated");
    //   setLoader(false);
    //   return;
    // }

    if (detail.category === '' || detail.category.length < 1) {
      setErrorMsg('Select category');
      setLoader(false);
      return;
    }

    const res = await ApiPostService('subCategoryAdd', detail);
    // console.log(res);

    if (res === null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res === true) {
      setDetail({ ...initialstate }); // form reset
      setSuccessMsg('Sub-Category saved!');
      // await getAllCategory();
    } else if (res !== false) {
      let datakey = Object.keys(res);
      let errors;

      if (datakey.length > 0) {
        errors = `invalid data on ${
          datakey.length
        } fields check ${datakey.toString()}`;
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
                <RightAlign>Catagory Code</RightAlign>
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <select
                  name='category'
                  className='form-control m-2'
                  style={{ borderColor: ColorTwo, border: '1px solid' }}
                  onChange={handleChange}
                >
                  <option defaultValue={''}>Select Category</option>
                  {categoryDetail.map((value, index) => (
                    <option value={value.name} key={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <RightAlign>Sub-category name</RightAlign>
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
                <RightAlign>Catagory Description</RightAlign>
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

export default SubCategoryForm;
