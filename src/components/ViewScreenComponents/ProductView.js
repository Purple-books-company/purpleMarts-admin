import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  CategoryData,
  getAllCategory,
  getAllSubCategory,
  getSubCategoryDetail,
} from '../../services/AdminServices';
// import { ApiPostService } from "../../services/ApiServices";
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
    // getDetail();
    console.log(window.innerWidth);

    let categoryDetail = CategoryData();
    if (categoryDetail.length === 0) {
      getData();
    } else {
      setCategoryList(categoryDetail);
      console.log('categroy updated');
    }
  }, []);

  async function getData() {
    let Loader = { ...initialLoader };
    Loader.page = true;

    setLoader(Loader);
    await getAllCategory();
    let categoryDetail = CategoryData();
    console.log(categoryDetail.length);
    setCategoryList(categoryDetail);
    setLoader({ ...initialLoader });
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
  }
  // async function getDetail() {
  //   let res = await ApiPostService('allProducts', null);

  //   if (res && res.length > 0) {
  //     console.log(res);
  //     // setProductDetail(res);
  //   } else {
  //     alert('no products found');

  //   }
  // }

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
            <ContainerColumn className='col-md-10 col-sm-12'>
              {productDetail.length === 0 && <Nodata />}

              {productDetail.map((value, index) => (
                <ContainerColumn height='45%' key={index} className='col-md-3'>
                  <Card deg='65' single>
                    <Imageview
                      src={value.images[0].image}
                      width='50%'
                      style={{ marginTop: '2%' }}
                      // alternate="no image"
                    />
                    <CenterAlign dark>
                      <b>{value.name}</b>
                      <br />
                      sizes:{value.varients.size.length}
                      <br />
                      colors:{value.varients.color.length}
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
                  </Card>
                </ContainerColumn>
              ))}
            </ContainerColumn>
          )}
        </ContainerRow>
      )}
    </>
  );
}

export default ProductView;
