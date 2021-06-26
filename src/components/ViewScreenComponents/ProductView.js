import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  CategoryData,
  getAllSubCategory,
  getSubCategoryDetail,
} from '../../services/AdminServices';
import { ApiPostService } from '../../services/ApiServices';
import { ColorOne, ColorTwo } from '../../styles/color';
import {
  Card,
  CenterAlign,
  ContainerColumn,
  Imageview,
  ContainerRow,
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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let Loader = { ...initialLoader };
    Loader.page = true;

    setLoader(Loader);

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

  return (
    <>
      {loader.page ? (
        <Loader />
      ) : (
        <ContainerRow full>
          <ContainerColumn
            className='col-md-2 col-sm-12 bg-light'
            height={window.innerWidth > 500 ? '100%' : 'auto'}
          >
            <select
              name='category'
              className='form-control m-2 ml-4 mt-4'
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
                    id={'radioInput' + index}
                  />
                  <label
                    className='form-check-label '
                    htmlFor={'radioInput' + index}
                  >
                    {value.name}
                  </label>
                </div>
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
                  <ContainerColumn
                    key={index}
                    style={{ minHeight: '30%', maxHeight: 'auto !important' }}
                    className='col-md-6'
                  >
                    <Card nohover>
                      <ContainerRow dynamic>
                        <ContainerColumn className='col-3 ml-2'>
                          <Imageview
                            src={value.image}
                            width='90%'
                            height='100px'
                            style={{ marginTop: '2%' }}
                            // alternate="no image"
                          />
                        </ContainerColumn>
                        <ContainerColumn className='col'>
                          <CenterAlign dark>
                            <div
                              style={{ maxHeight: '30px', minHeight: '30px' }}
                            >
                              {value.name}
                            </div>
                            <br />
                            OurPrice:{value.offerPrice}
                            <br />
                            OriginalPrice:{value.originalPrice}
                            <a
                              href={'#showdata' + index}
                              // className="ml-2"
                              data-toggle='collapse'
                            >
                              show more
                              <AiFillCaretDown />
                            </a>
                            <p className='collapse' id={'showdata' + index}>
                              hello
                              <br /> hello
                              <br /> hello
                              <br /> hello
                              <br />
                              hello
                              <br />
                            </p>
                            <div
                              className='input-group mb-2 mr-sm-2'
                              style={{
                                maxWidth: '80%',
                                marginLeft: '10%',
                                textAlign: 'center',
                              }}
                            >
                              <button
                                className='btn btn-danger mr-2 form-control'
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
                                className='btn purple form-control'
                                name='addImages'
                                value={value}
                              >
                                <AiFillInfoCircle size='18' />
                                {'  '}View
                              </Link>
                            </div>
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
