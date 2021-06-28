import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle, AiFillUpSquare } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  CategoryData,
  getAllSubCategory,
  getSubCategoryDetail,
  OfferData,
} from '../../services/AdminServices';
import { ApiPostService } from '../../services/ApiServices';
import { ColorOne, ColorTwo } from '../../styles/color';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  Imageview,
  ContainerRow,
  Title,
  // Input,
  // Submitbutton,
} from '../../styles/styled';
import Nodata from '../Nodata';
import Loader from '../Loader';

function ProductView() {
  let initialLoader = { product: false, page: false };
  const [productDetail, setProductDetail] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(initialLoader);
  const [offerList, setOfferList] = useState([]);
  const [offerId, Addtooffer] = useState('');
  const [chooseOffer, setChooseOffer] = useState('');

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let Loader = { ...initialLoader };
    Loader.page = true;

    setLoader(Loader);
    let offers = await OfferData();
    setOfferList(offers);
    let categoryDetail = await CategoryData();
    console.log(categoryDetail.length);
    setCategoryList(categoryDetail);
    let subCat = getSubCategoryDetail(categoryDetail[0].name);
    //need to optimize this!!
    if (subCat === undefined || subCat === null) {
      await getAllSubCategory(categoryDetail[0].name);
      subCat = getSubCategoryDetail(categoryDetail[0].name);
    }

    setSubCategoryDetail(subCat);
    setLoader({ ...initialLoader });
    getDetail(subCat[0].name);
  }
  async function handleChange(e) {
    let Loader = { ...initialLoader };
    Loader.product = true;
    setLoader(Loader);

    let subCat = getSubCategoryDetail(e.target.value);

    if (subCat === undefined || subCat === null) {
      await getAllSubCategory(e.target.value);
      subCat = getSubCategoryDetail(e.target.value);
    }

    setSubCategoryDetail(subCat);
    setLoader({ ...initialLoader });
    getDetail(subCat[0].name);
  }
  async function handleRadio(e) {
    if (e.target.name === 'chooseOffer') {
      setChooseOffer(e.target.value);
      return;
    }
    getDetail(e.target.value);
  }
  async function getDetail(cat) {
    let data = {
      subCategory: cat,
      page: 1,
    };
    let res = await ApiPostService('Products', data);
    console.log(res);

    if (res && res.length > 0) {
      console.log(res);
      setProductDetail(res);
    } else {
      alert('no products found');
    }
  }
  async function handleAddOffer(e) {
    Addtooffer(e.target.value);
    if (chooseOffer === '') {
      alert('no offer chosen');
      Addtooffer('');
      return;
    }
    let data = {
      product: e.target.value,
      offerName: chooseOffer,
    };
    let res = await ApiPostService('offerProduct', data);
    if (res !== true) {
      alert('some error');
    }
    if (res === true) {
      alert('success');
    }
    Addtooffer('');
  }

  return (
    <>
      {loader.page ? (
        <Loader />
      ) : (
        <ContainerRow full>
          <ContainerColumn
            className='col-md-2 col-sm-12 fixed-top sticky-top p-2'
            id='productSide-Nav'
            height={window.innerWidth > 500 ? '100%' : 'auto'}
            style={{ backgroundColor: ColorTwo }}
          >
            <Link to='/' className='col-md-12 col-3  text-light '>
              BACK TO HOME
            </Link>
            <select
              name='category'
              className='form-control m-2 ml-4 mt-4 '
              style={{
                border: '1px solid ' + ColorTwo,

                width: '85%',
              }}
              onChange={handleChange}
            >
              {categoryList.map((value, index) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
            <ContainerRow dynamic style={{ margin: '3%' }}>
              {subCategoryDetail.map((value, index) => (
                <div
                  className='form-check form-switch col-md-12 col-4  mb-3 rounded'
                  style={{ color: ColorOne }}
                  key={index + 'check'}
                >
                  <input
                    type='radio'
                    className='form-check-input'
                    name='subcat'
                    value={value.name}
                    onClick={handleRadio}
                    id={'radioInput' + index}
                  />
                  <label
                    className='form-check-label text-light '
                    htmlFor={'radioInput' + index}
                  >
                    {value.name}
                  </label>
                </div>
              ))}
            </ContainerRow>
            <ContainerRow dynamic className='row   mb-2 sticky'>
              <Title className='col-12'>Add to offer</Title>
              <br />
              {offerList.map((value, index) => (
                <ContainerColumn className='col-md-12 col mt-2 ml-1  text-light'>
                  <input
                    type='radio'
                    name='chooseOffer'
                    onClick={handleRadio}
                    value={value.id}
                  />
                  {value.offerName}
                </ContainerColumn>
              ))}
            </ContainerRow>
          </ContainerColumn>
          {loader.product ? (
            <ContainerColumn height='100%' className='col-md-10 col-sm-12'>
              <Loader />
            </ContainerColumn>
          ) : (
            <ContainerColumn height='100%' className='col-md-10 col-sm-12'>
              {productDetail.length === 0 && <Nodata />}

              <ContainerRow dynamic>
                {productDetail.map((value, index) => (
                  <ContainerColumn key={index} className='col-md-6'>
                    <Card nohover>
                      <ContainerRow dynamic>
                        <ContainerColumn className='col-md-3 col-4 ml-2'>
                          <Imageview
                            src={value.image}
                            width='90%'
                            height='130px'
                            style={{ marginTop: '2%', maxHeight: '130px' }}
                            // alternate="no image"
                          />
                          <button
                            class='btn btn-outline-primary mt-4'
                            type='button'
                            value={value.id}
                            onClick={handleAddOffer}
                          >
                            <span
                              class={
                                offerId === value.id &&
                                'spinner-border spinner-border-sm'
                              }
                              role='status'
                              aria-hidden='true'
                            ></span>
                            {offerId !== value.id && 'Addoffer'}
                          </button>
                        </ContainerColumn>
                        <ContainerColumn className='col p-2'>
                          <CenterAlign dark>
                            <div
                              style={{
                                minHeight: '150px',
                                backgroundColor: 'white',
                                maxHeight: 'auto',
                              }}
                            >
                              {value.name}
                              <br />
                              OurPrice:{value.offerPrice}
                              <br />
                              OriginalPrice:{value.originalPrice}
                              <br />
                              <p className='collapse' id={'showdata' + index}>
                                <a
                                  href={'#showdata' + index}
                                  // className="ml-2"
                                  className='text-secondary'
                                  style={{
                                    textAlign: 'right',
                                    marginLeft: '60%',
                                  }}
                                  data-toggle='collapse'
                                >
                                  X
                                </a>
                                <br />
                                hello
                                <br /> hello
                                <br /> hello
                                <br /> hello
                                <br />
                                hello
                                <br />
                              </p>
                              <a
                                href={'#showdata' + index}
                                // className="ml-2"

                                data-toggle='collapse'
                              >
                                show More
                                <AiFillCaretDown />
                              </a>
                            </div>

                            <br />
                            <button
                              className='btn btn-outline-danger mr-2 '
                              value={value.name}
                            >
                              <AiFillDelete size='18' />
                              {'  '}
                              Delete
                            </button>
                            <Link
                              to={{
                                pathname: '/editproduct',
                                state: { product: value },
                              }}
                              className='btn purple '
                              name='addImages'
                              value={value}
                            >
                              <AiFillInfoCircle size='18' />
                              Edit
                            </Link>
                          </CenterAlign>
                        </ContainerColumn>
                      </ContainerRow>
                    </Card>
                  </ContainerColumn>
                ))}
              </ContainerRow>
            </ContainerColumn>
          )}
        </ContainerRow>
      )}
    </>
  );
}

export default ProductView;
