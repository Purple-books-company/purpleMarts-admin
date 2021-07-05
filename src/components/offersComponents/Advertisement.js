import { useEffect, useState } from 'react';
import {
  CategoryData,
  getSubCategoryDetail,
} from '../../services/AdminServices';
import {
  ApiDeleteService,
  ApiGetService,
  ApiPostService,
  ApiPutService,
} from '../../services/ApiServices';
import {
  ContainerColumn,
  ContainerRow,
  RightAlign,
  Input,
  Submitbutton,
  Imageview,
} from '../../styles/styled';
import Loader from '../Loader';

const Advertisement = () => {
  let initialState = {
    image: '',
    type: 'Single',
    advType: 'Category',
    description: '',
    advId: '',
  };

  const [form, setForm] = useState('category');
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [detail, setDetail] = useState(initialState);
  const [advertisementData, setAdvertisementData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getData();
    getAdvertisementData();
  }, []);

  async function getData() {
    setLoader(true);
    let data = await CategoryData();
    setCategoryDetail(data);
    if (data.length > 0) getSubData(data[0].name);
    else setLoader(false);
  }

  async function getAdvertisementData() {
    setLoader(true);
    let data = await ApiGetService('advertisement');
    setAdvertisementData(data);
    setLoader(false);
  }

  async function handleCategoryChange(e) {
    getSubData(e.target.value);
    if (isCategory) {
      setDetail({ ...detail, advType: 'Category', advId: e.target.value });
    }
  }

  function handleProductChange(e) {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
      advType: 'Product',
    });
  }

  function handleChange(e) {
    if (e.target.name === 'Subcategory' && !isCategory) {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    } else if (e.target.name !== 'Subcategory') {
      if (e.target.name === 'advId' && isCategory) return;
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let data = { ...detail };

    if (data.advType === 'Category' && data.advId === '') {
      data.advId = categoryDetail[0].name;
    }

    if (data.advType === 'SubCategory' && data.advId === '') {
      data.advId = subCategoryDetail[0].name;
    }

    let res;

    if (isUpdate) {
      res = await ApiPutService('advertisement', data.id, data);
    } else {
      res = await ApiPostService('advertisement', data);
    }

    if (res === null) {
      alert('Error occured');
      return;
    }

    if (res === true) {
      alert('Operation successful');
      getAdvertisementData();
      setDetail({ ...initialState });
      setIsUpdate(false);
    } else {
      alert('Invalid input');
    }
  }

  function handleRadio(e) {
    if (e.target.value === 'category' && !isCategory) {
      setDetail({ ...initialState, advType: 'Category' });
      setIsCategory(true);
    }

    if (e.target.value === 'subCategory' && isCategory) {
      setDetail({ ...initialState, advType: 'SubCategory' });
      setIsCategory(false);
    }
  }

  async function getSubData(name) {
    setLoader(true);
    let subCat = await getSubCategoryDetail(name);

    // if (subCat === undefined || subCat === null) {
    //   await getAllSubCategory(name);
    //   subCat = getSubCategoryDetail(name);
    // }
    setSubCategoryDetail(subCat);

    setLoader(false);
  }

  function handleClick(e) {
    setDetail({ ...initialState });
    setForm(e.target.value);
    setIsUpdate(false);
  }

  async function handleDelete(e) {
    if (!window.confirm('Are you sure you want to delete?')) return;
    let res = await ApiDeleteService('advertisement', e.target.value);
    alert(res);
    getAdvertisementData();
  }

  async function handleUpdate(value) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (value.advType === 'Product') {
      setForm('product');
    } else {
      setForm('category');
      if (value.advType === 'Category') {
        setIsCategory(true);
      } else {
        let subCat = await ApiGetService('subCategory');
        setSubCategoryDetail(subCat);

        setIsCategory(false);
      }
    }
    setIsUpdate(true);
    setDetail(value);
  }

  return (
    <>
      <hr style={{ width: '100%', color: 'black', border: '0.5px dotted' }} />
      <ContainerRow dynamic>
        {loader && (
          <ContainerColumn className='col-md-12 mb-2'>
            <Loader />
          </ContainerColumn>
        )}
        <ContainerColumn height='10%' className='col-md-6 col'>
          <button
            type='radio'
            onClick={handleClick}
            name='chooseOffer'
            value='category'
            className={`btn btn-outline-primary ${
              form === 'category' ? 'btn-primary text-light' : ''
            }`}
          >
            Category
          </button>
        </ContainerColumn>
        <ContainerColumn height='10%' className='col-md-6 col '>
          <button
            type='radio'
            onClick={handleClick}
            name='chooseOffer'
            value='product'
            className={`btn btn-outline-secondary ${
              form === 'product' ? 'btn-secondary text-light' : ''
            }`}
          >
            Product
          </button>
        </ContainerColumn>
      </ContainerRow>

      <ContainerRow half>
        {/* <div style={{ display: `${form === "category" ? "" : "none"}` }}> */}
        {form === 'category' && (
          <>
            <ContainerColumn className='col-md-6'>
              <RightAlign>select Category</RightAlign>
              <select
                onChange={handleCategoryChange}
                name='category'
                className='form-control'
                value={
                  isCategory ? detail.advId : subCategoryDetail[0].category
                }
                disabled={isUpdate && detail.advType === 'SubCategory'}
              >
                {categoryDetail.map((value, index) => (
                  <option value={value.name} key={`AdvertisementCat+${index}`}>
                    {value.name}
                  </option>
                ))}
              </select>
            </ContainerColumn>
            <ContainerColumn className='col col-md-6'>
              <br />
              <br />
              <input
                type='radio'
                name='category'
                value='category'
                checked={isCategory}
                onChange={handleRadio}
                // onClick={handleRadio}
              />
              <label className='mr-2' htmlFor='category'>
                Category
              </label>
              {/* <br /> */}
              <input
                type='radio'
                name='category'
                checked={!isCategory}
                value='subCategory'
                onChange={handleRadio}
                // onClick={handleRadio}
              />
              <label htmlFor='subCategory'>Sub-Category</label>
            </ContainerColumn>
            <ContainerColumn className='col-md-6 mt-2'>
              <RightAlign>Select Sub-Category</RightAlign>
              <select
                name='advId'
                className='form-control'
                style={{ width: '100%' }}
                onChange={handleChange}
                value={!isCategory ? detail.advId : ''}
                disabled={isCategory}
              >
                {subCategoryDetail.map((value, index) => (
                  <option value={value.name} key={`AdvertisementSub+${index}`}>
                    {value.name}
                  </option>
                ))}
              </select>
            </ContainerColumn>
            {/* </div> */}
          </>
        )}
        {/* <div style={{ display: `${form === "category" ? "none" : ""}` }}> */}
        {form === 'product' && (
          <ContainerColumn className='col-md-6'>
            <RightAlign>Select Product Id</RightAlign>
            <Input
              type='text'
              onChange={handleProductChange}
              placeholder='Product Id'
              name='advId'
              value={detail.advId}
              required
            />
          </ContainerColumn>
        )}
        {/* {isUpdate && (
                <button
                  className="btn btn-outline-danger mt-3"
                  style={{ height: "3%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )} */}
        {/* </div> */}

        <ContainerColumn className='col-md-6'>
          <RightAlign>Description</RightAlign>
          <Input
            type='text'
            onChange={handleChange}
            placeholder='Description'
            name='description'
            value={detail.description}
            required
          />
        </ContainerColumn>

        <ContainerColumn className='col-md-6'>
          <RightAlign>Select type</RightAlign>
          <select
            name='type'
            onChange={handleChange}
            value={detail.type}
            className='form-control'
          >
            <option value='Single'>Single</option>
            <option value='Multiple'>Multiple</option>
          </select>
        </ContainerColumn>

        <ContainerColumn className='col-md-6'>
          <RightAlign>Image Url</RightAlign>
          <Input
            type='text'
            onChange={handleChange}
            name='image'
            value={detail.image}
            placeholder='image Url'
            required
          />
        </ContainerColumn>

        <Submitbutton type='submit' onClick={handleSubmit}>
          {isUpdate ? 'Update' : 'Post'}
        </Submitbutton>

        <br />

        {detail.image.length > 10 && (
          <div className='col-12'>
            <Imageview src={detail.image} height='100px' width='100px' />
          </div>
        )}

        <br />

        <a
          className='btn btn-primary m-3 col-12'
          data-toggle='collapse'
          href='#showDetails'
        >
          Show Advertisements
        </a>

        <div className='collapse col-12' id='showDetails'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Advertisement</th>
                <th scope='col'>Image</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {advertisementData.map((value, index) => (
                <tr>
                  <td>
                    Type: {value.type}
                    <br />
                    Advertisement Type: {value.advType}
                    <br />
                    Advertisement Id: {value.advId}
                    <br />
                  </td>
                  <td>
                    <Imageview
                      src={value.image}
                      height='100px'
                      width='20%'
                      style={{ minWidth: '100px' }}
                    />
                  </td>
                  <td>
                    <button
                      value={value.id}
                      className='btn btn-outline-danger'
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <br />
                    <button
                      className='btn btn-outline-info mt-2'
                      onClick={() => handleUpdate(value)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContainerRow>
    </>
  );
};

export default Advertisement;
