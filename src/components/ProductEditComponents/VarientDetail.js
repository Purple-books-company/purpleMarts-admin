import { useEffect, useState } from 'react';
import {
  ApiDeleteService,
  ApiPostService,
  ApiPutService,
} from '../../services/ApiServices';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  ContainerRow,
  Imageview,
  Input,
  Submitbutton,
  LightColor,
  SuccessText,
  ErrorText,
} from '../../styles/styled';

function VarientDetail({ varient, productId, refetch }) {
  let initialVarient = {
    offerPrice: '',
    buyingPrice: '',
    originalPrice: '',
    unitInStock: '',
  };
  let initialUpdate = {
    varient: null,
    varientType: null,
    varientImage: null,
  };
  const [Update, isUpdate] = useState(initialUpdate);
  const [varientDetail, setVarientDetail] = useState(null);
  const [detail, setDetail] = useState(initialVarient);
  const [Images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [image, setImage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (varient !== null && varient !== undefined) {
      setVarientDetail(varient);
      console.log(varient);
      let type = JSON.parse(JSON.stringify(varient[0].types));
      for (let i in type) {
        type[i].value = '';
      }
      setTypes(type);
    }
  }, [varient]);
  async function handleImage(e) {
    if (e.target.name === 'image') setImage(e.target.value);
    if (e.target.name === 'Add') {
      if (Update.varientImage !== null) {
        Update.varientImage.image = image;
        let res = await ApiPostService(
          'varientImage',

          Update.varientImage
        );
        if (res === true) {
          setSuccessMsg('ImageUpdated');
          isUpdate(initialUpdate);
          setImage('');
          refetch();
        } else {
          setErrorMsg('someErrorOccured');
        }
      } else {
        setImages([...Images, { image: image }]);
        setImage('');
      }
    }
  }
  function EditVarient(value) {
    setTypes(value.types);
    setDetail(value);
    isUpdate({ ...initialUpdate, varient: value.id });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  function handleTypeChange(e) {
    let type = JSON.parse(JSON.stringify(types));
    type[e.target.name].value = e.target.value;
    setTypes(type);
  }
  async function handleUpdate(e) {
    let type = JSON.parse(JSON.stringify(types));
    console.log(e.target.value);
    if (e.target.name === 'varientDetail') {
      if (Update.varient !== null) {
        detail.product = productId;
        let res = await ApiPutService('varient', Update.varient, detail);
        if (res === true) {
          setSuccessMsg(' Varient Updated');
          setDetail(initialVarient);
          refetch();
        } else {
          setSuccessMsg('');
          setErrorMsg('SomeError Occured');
        }

        return;
      } else {
        let tempDetail = { ...detail };
        tempDetail.types = types;
        tempDetail.image = Images;
        tempDetail.product = productId;
        // tempDetail.order = varientDetail.length;
        let res = await ApiPostService('varient', tempDetail);
        alert(res);
      }
    }

    if (e.target.name === 'varientType') {
      for (let i in type) {
        console.log(type[i].id);
        if (type[i].id === Number(e.target.value)) {
          type[i].varient = Update.varientType;
          let res = await ApiPutService('varientType', e.target.value, type[i]);
          if (res === true) {
            setSuccessMsg('varient Updated Successfully');
            refetch();
            isUpdate({ ...initialUpdate });
            for (let i in type) {
              type[i].value = '';
            }
            setTypes(type);
          } else {
            setSuccessMsg('');
            setErrorMsg('Some Error Occurred');
          }

          return;
        }
      }
    }
  }
  function handleAddImages(e) {
    let data = {
      varient: e.target.value,
      order: e.target.id,
    };
    isUpdate({ ...initialUpdate, varientImage: data });
  }
  function EditTypeVarient(value) {
    setTypes(value.types);
    isUpdate({ ...initialUpdate, varientType: value.id });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  async function deleteImage(e) {
    if (!window.confirm('sure to delete image')) return;
    let res = await ApiDeleteService('varientImage', e.target.value);
    if (res === true) {
      setSuccessMsg('deleted succesfully');
      setErrorMsg('');
      refetch();
    } else {
      setSuccessMsg('');
      setErrorMsg('Error while deleting');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  async function deleteVarient(e) {
    if (!window.confirm('sure to delete Varient')) return;
    let res = await ApiDeleteService('varient', e.target.value);
    if (res === true) {
      setSuccessMsg('deleted succesfully !!');
      setErrorMsg('');
      refetch();
    } else {
      setSuccessMsg('');
      setErrorMsg('Error while deleting');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <>
      <ContainerColumn height='auto' className='col-md-12 text-center'>
        <SuccessText>{successMsg}</SuccessText>
        <br />
        <ErrorText>{errorMsg}</ErrorText>
      </ContainerColumn>
      {detail && (
        <ContainerRow dynamic>
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

          {!Update.varient &&
            types.length > 0 &&
            types.map((value, typeIndex) => (
              <ContainerColumn className='col-md-4'>
                <CenterAlign>{value.key}</CenterAlign>
                <Input
                  type='text'
                  value={types[typeIndex].value}
                  name='typeIndex'
                  name={typeIndex}
                  onChange={handleTypeChange}
                />
                {Update.varientType && (
                  <button
                    name='varientType'
                    value={value.id}
                    onClick={handleUpdate}
                    className='btn btn-outline-success'
                  >
                    Update
                  </button>
                )}
              </ContainerColumn>
            ))}
          <ContainerColumn className='col-md-4 text-center'>
            <CenterAlign dark>
              Images{' '}
              {Update.varientImage && `id=` + Update.varientImage.varient}
            </CenterAlign>
            <Input
              type='text'
              name='image'
              placeholder='AddImage'
              value={image}
              onChange={handleImage}
              disabled={Update.varient !== null}
            />
            <button
              onClick={handleImage}
              name='Add'
              className='btn btn-success text-center'
            >
              Add
            </button>
          </ContainerColumn>
          {image !== '' && (
            <Imageview src={image} width='100px' height='100px' />
          )}
          <Submitbutton name='varientDetail' onClick={handleUpdate}>
            UPDATE
          </Submitbutton>
        </ContainerRow>
      )}

      <ContainerRow dynamic>
        <ContainerColumn className='col-md-12'>
          <ContainerRow dynamic>
            {Images.length > 0 &&
              Images.map((value, index) => (
                <ContainerColumn className='col-md-3 col-6'>
                  <Imageview src={value.image} width='100px' height='100px' />
                </ContainerColumn>
              ))}
          </ContainerRow>
        </ContainerColumn>
        {varientDetail &&
          varientDetail.map((value, index) => (
            <ContainerColumn className='col-md-3 col-sm-12'>
              <ContainerColumn className='col-md-12'>
                Id:{value.id}
                <ContainerRow dynamic>
                  {value.image.map((imageUrl, Imageindex) => (
                    <ContainerColumn className='col-md-3 col-6'>
                      <Imageview
                        src={imageUrl.image}
                        height='100px'
                        width='100px'
                      />
                      <br />
                      <button
                        onClick={deleteImage}
                        value={imageUrl.id}
                        className='btn btn-outline-danger ml-1 mb-2'
                      >
                        delete
                      </button>
                      {/* <button className='btn btn-outline-info ml-1 mb-2'>
                        edit
                      </button> */}
                    </ContainerColumn>
                  ))}
                </ContainerRow>
              </ContainerColumn>
              <ContainerColumn className='col-md-12'>
                <table className='table table-borderless'>
                  <tbody>
                    <tr>
                      <td colSpan='3'>
                        <button
                          onClick={handleAddImages}
                          value={value.id}
                          id={value.image.length}
                          className='btn btn-info'
                        >
                          Add Images
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LightColor>originalPrice:</LightColor>
                        {value.originalPrice}
                      </td>
                      <td>
                        <LightColor>offerPrice:</LightColor>
                        {value.offerPrice}
                      </td>
                      <td>
                        <LightColor>buyingPrice:</LightColor>
                        {value.buyingPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LightColor>unitInStock :</LightColor>
                        {value.unitInStock}
                      </td>
                      {value.types.map((typeKey, typeIndex) => (
                        <td>
                          <LightColor>{typeKey.key}</LightColor>
                          {typeKey.value}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>
                        <button
                          value={value.id}
                          onClick={deleteVarient}
                          className='btn btn-outline-danger ml-1 mb-2'
                        >
                          delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => EditVarient(value)}
                          className='btn btn-outline-info ml-1 mb-2'
                        >
                          edit Varient
                        </button>
                      </td>
                      <td>
                        <button
                          value={value.id}
                          onClick={() => EditTypeVarient(value)}
                          className='btn btn-outline-info ml-1 mb-2'
                        >
                          edit Type
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </ContainerColumn>
            </ContainerColumn>
          ))}
      </ContainerRow>
    </>
  );
}
export default VarientDetail;
