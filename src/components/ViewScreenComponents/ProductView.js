import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';

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
  Input,
  // Input,
  // Submitbutton,
} from '../../styles/styled';
import Nodata from '../Nodata';
import SingleProductView from './SingleProductView';
import Loader from '../Loader';
import ProductDetail from '../ProductEditComponents/ProductDetail';

function ProductView() {
  let initialLoader = { product: false, page: false };
  const [productDetail, setProductDetail] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);
  const [loader, setLoader] = useState(initialLoader);
  const [offerList, setOfferList] = useState([]);
  const [offerId, Addtooffer] = useState('');
  const [chooseOffer, setChooseOffer] = useState('');
  const [isListProduct, setIsListProduct] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, []);
  async function handleSearch(page = null) {
    if (page === null) {
      page = JSON.parse(JSON.stringify(productDetail)).length / 10 + 1;
    }
    let payLoad = {
      key: search,
      page: page,
    };
    let res = await ApiPostService('search', payLoad);
    if (page === 1) setProductDetail(res);
    else {
      let tempData = JSON.parse(JSON.stringify(productDetail)).concat(res);
      setProductDetail(tempData);
    }
  }
  async function getData() {
    let Loader = { ...initialLoader };
    Loader.page = true;

    setLoader(Loader);
    let offers = await OfferData();
    setOfferList(offers);
    let categoryDetail = await CategoryData();
    console.log(categoryDetail.length);
    setCategoryList(categoryDetail);
    let subCat = await getSubCategoryDetail(categoryDetail[0].name);
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

    let subCat = await getSubCategoryDetail(e.target.value);

    setSubCategoryDetail(subCat);
    setLoader({ ...initialLoader });
    getDetail(subCat[0].name);
  }
  async function handleRadio(e) {
    setSearch('');
    if (e.target.name === 'chooseOffer') {
      setChooseOffer(e.target.value);
      return;
    }
    setProductDetail([]);
    getDetail(e.target.value);
  }
  async function getDetail(cat) {
    let tempData = JSON.parse(JSON.stringify(productDetail));

    let page;
    if (tempData.length == 0) {
      page = 1;
    } else if (tempData[0].subCategory === cat) {
      page = tempData.length / 10 + 1;
    } else {
      page = 1;
      tempData = [];
    }
    // alert('getting' + page);
    let data = {
      subCategory: cat,
      page: page,
    };
    let res = await ApiPostService('Products', data);

    if (res && res.length > 0) {
      console.log(res);

      let detail = tempData.concat(res);
      setProductDetail(detail);
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
      alert('Product already in Offer');
    }
    if (res === true) {
      alert('success');
    }
    Addtooffer('');
  }
  // function handleImageClick(index) {
  //   console.log(index);
  //   document.getElementById('changeVarient' + index).innerHTML = `hello`;
  // }

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

            <ContainerRow dynamic style={{ margin: '3%', marginLeft: '10%' }}>
              {subCategoryDetail.map((value, index) => (
                <div
                  className='form-check form-switch col-md-12 col-4   mb-3 rounded'
                  style={{ color: ColorOne }}
                  key={index + 'check'}
                >
                  <input
                    type='radio'
                    className='form-check-input'
                    name='subcat'
                    value={value.name}
                    onChange={handleRadio}
                    id={'radioInput' + index}
                    checked={
                      productDetail.length > 0 &&
                      productDetail[0].subCategory === value.name
                    }
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
            <form
              name='search'
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(1);
              }}
            >
              <ContainerRow dynamic>
                <ContainerColumn
                  height='auto'
                  className='col-md-12 col-sm-9 col-9'
                >
                  <Input
                    type='text'
                    placeholder='search'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </ContainerColumn>
                <ContainerColumn height='auto' className='col-md-12 col-3'>
                  <button
                    type='submit'
                    className='form-control  ml-1 btn btn-success'
                  >
                    Search
                  </button>
                </ContainerColumn>
              </ContainerRow>
            </form>
            <ContainerRow dynamic className='row ml-1  mb-2 sticky'>
              <Title className='col-12'>Add to offer</Title>
              <br />
              {offerList.map((value, index) => (
                <ContainerColumn className='col-md-12 col mt-2  text-light'>
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
            <ContainerColumn height='100%' className='col-md-9 col-sm-12'>
              <Loader />
            </ContainerColumn>
          ) : (
            <>
              <ContainerColumn
                height='100%'
                className='col-md-9 ml-2 col-sm-12'
              >
                {productDetail.length === 0 && <Nodata />}
                {isListProduct.length > 0 && (
                  <div style={{ textAlign: 'center' }}>
                    <SingleProductView id={isListProduct} />
                    <button
                      className='btn btn-danger'
                      onClick={() => setIsListProduct('')}
                    >
                      X CLOSE
                    </button>
                  </div>
                )}

                <ContainerRow dynamic>
                  <button
                    id='myScrollBtn'
                    onClick={() =>
                      window.scrollTo({
                        top: 20,

                        behavior: 'smooth',
                      })
                    }
                    title='Go to top'
                  >
                    {' '}
                    top
                  </button>
                  {productDetail.map((value, index) => (
                    <ContainerColumn
                      key={index}
                      height='40%'
                      className='col-md-3'
                    >
                      <Card nohover>
                        <div
                          // onClick={() => handleImageClick(index)}
                          style={{
                            minHeight: '50px',
                            backgroundColor: 'white',
                            maxHeight: '50px',
                          }}
                        >
                          <p
                            style={{
                              minHeight: '30px',
                              fontSize: '11px',
                              // fontWeight: 'bold',
                              maxHeight: '50px',
                              backgroundColor: ColorOne,
                              color: 'white',
                            }}
                          >
                            {value.name}
                          </p>
                          <br />
                        </div>
                        <ContainerRow dynamic>
                          <ContainerColumn className='col-md-12 col-12 mb-2 '>
                            <div
                              className='col-md-12 col-12'
                              id={'changeVarient' + index}
                            >
                              <Imageview
                                src={value.image}
                                width='96%'
                                height='150px'
                                onClick={() => {
                                  setIsListProduct(value.id);
                                }}
                                style={{ marginTop: '2%' }}
                                // alternate="no image"
                              />
                            </div>

                            <button
                              class='btn btn-outline-primary mt-4'
                              type='button'
                              value={value.id}
                              onClick={handleAddOffer}
                            >
                              <span
                                className={
                                  offerId === value.id &&
                                  'spinner-border spinner-border-sm'
                                }
                                role='status'
                                aria-hidden='true'
                              ></span>

                              {offerId !== value.id && 'Add-to-offer'}
                            </button>

                            <CenterAlign dark>
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
                                  state: { product: value.id },
                                }}
                                className='btn purple '
                                name='addImages'
                                value={value}
                              >
                                <AiFillInfoCircle size='18' />
                                Edit
                              </Link>
                              <br />
                            </CenterAlign>
                          </ContainerColumn>
                        </ContainerRow>
                      </Card>
                    </ContainerColumn>
                  ))}
                </ContainerRow>
                {productDetail.length % 10 === 0 && (
                  <button
                    onClick={() => {
                      if (search !== '') handleSearch();
                      else getDetail(productDetail[0].subCategory);
                    }}
                    className='btn w-100 text-info text-centre col-12 mb-3 '
                  >
                    <b>show more</b>
                  </button>
                )}
              </ContainerColumn>
            </>
          )}
        </ContainerRow>
      )}
    </>
  );
}

export default ProductView;
// <p className='collapse' id={'showdata' + index}>
//   <a
//     href={'#showdata' + index}
//     // className="ml-2"
//     className='text-danger'
//     style={{
//       textAlign: 'right',
//       marginLeft: '60%',
//     }}
//     data-toggle='collapse'
//   >
//     X
//   </a>
//   OurPrice:{value.offerPrice}
//   OriginalPrice:{value.originalPrice}
// </p>;
// <a
//   href={'#showdata' + index}
//   // data-bs-toggle='collapse'

//   // aria-controls='collapseExample'
//   // className="ml-2"

//   data-toggle='collapse'
// >
//   <AiFillCaretDown />
// </a>;
