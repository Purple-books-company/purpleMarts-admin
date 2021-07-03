import { useState, useEffect } from 'react';
import { AiTwotoneFileZip } from 'react-icons/ai';
import { CategoryData, getAllCategory } from '../../services/AdminServices';
import { ApiPostService, ApiPutService } from '../../services/ApiServices';
import { ColorOne } from '../../styles/color';
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

function CatagoryForm({ data }) {
  let initialstate = {
    image: '',
    description: '',
    name: '',
  };

  const [detail, setDetail] = useState(initialstate);
  const [categoryDetail, setCatagoryDetail] = useState([]);
useEffect(()=>{
if (data !== null && data!==undefined) {
      setDetail(data);
      setIsUpdate(true);
    }
},[data])
  useEffect(() => {
    
    async function onMount() {
      let catData = await CategoryData();
      setCatagoryDetail(catData);
    }
    onMount();
  }, []);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loader, setLoader] = useState(false);
  const [isUpdate,setIsUpdate]=useState(false);

  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
    if (e.target.name === 'name') {
      for (let i in categoryDetail) {
        if (
          categoryDetail[i].name.toLowerCase() === e.target.value.toLowerCase()
        ) {
          setErrorMsg('Category already present');

          return;
        }
      }
      setErrorMsg('');
    }
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
   let res ;
    if (isUpdate) {
     res = await ApiPutService("category",detail.name,detail);
    }
   else
     res = await ApiPostService('category', detail);
    console.log(res);

    if (res === null) {
      alert('some error occured,try later');
      setLoader(false);
      return;
    }
    if (res === true) {
      setDetail({ ...initialstate });
      setSuccessMsg('Category saved!');
      setIsUpdate(false);
      await getAllCategory();
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
                <RightAlign>Categoryname</RightAlign>
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <Input
                  type='text'
                  placeholder='name'
                  name='name'
                  onChange={handleChange}
                  value={detail.name}
                  disabled={isUpdate}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className='col-md-5'>
                <RightAlign>CategoryDescription</RightAlign>
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
              {isUpdate ? 'Update' : 'POST'}
            </Submitbutton>
            <br />
          </form>
        )}
      </ContainerColumn>
    </>
  );
}

export default CatagoryForm;
