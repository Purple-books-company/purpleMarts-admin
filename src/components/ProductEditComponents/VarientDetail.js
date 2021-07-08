import { useEffect, useState } from 'react';
import { ApiPutService } from '../../services/ApiServices';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  ContainerRow,
  Imageview,
  Input,
  Submitbutton,
  LightColor,
} from '../../styles/styled';

function VarientDetail({ varient }) {
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
  function handleChange() {}
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
  function EditVarient(value) {
    setTypes(value.types);
    setDetail(value);
  }
  function handleTypeChange(e) {
    let type = JSON.parse(JSON.stringify(types));
    type[e.target.name].value = e.target.value;
    setTypes(type);
  }
  async function handleUpdate(e) {
    let type = JSON.parse(JSON.stringify(types));
    console.log(e.target.value);

    if (e.target.name === 'varientType') {
      for (let i in type) {
        console.log(type[i].id);
        if (type[i].id === Number(e.target.value)) {
          type[i].varient = Update.varientType;
          let res = await ApiPutService('varientType', e.target.value, type[i]);
          alert(res);
          return;
        }
      }
    }
  }
  function EditTypeVarient(value) {
    setTypes(value.types);
    isUpdate({ ...initialUpdate, varientType: value.id });
  }
  return (
    <>
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
          <Submitbutton>UPDATE</Submitbutton>
        </ContainerRow>
      )}
      <ContainerRow dynamic>
        {varientDetail &&
          varientDetail.map((value, index) => (
            <ContainerColumn className='col-md-3 col-sm-12'>
              <ContainerColumn className='col-md-12'>
                <ContainerRow dynamic>
                  {value.image.map((imageUrl, Imageindex) => (
                    <ContainerColumn className='col-md-3 col-6'>
                      <Imageview
                        src={imageUrl.image}
                        height='100px'
                        width='100px'
                      />
                      <br />
                      <button className='btn btn-outline-danger ml-1 mb-2'>
                        delete
                      </button>
                      <button className='btn btn-outline-info ml-1 mb-2'>
                        edit
                      </button>
                    </ContainerColumn>
                  ))}
                </ContainerRow>
              </ContainerColumn>
              <ContainerColumn className='col-md-12'>
                <table className='table table-borderless'>
                  <tbody>
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
                        <button className='btn btn-outline-danger ml-1 mb-2'>
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
