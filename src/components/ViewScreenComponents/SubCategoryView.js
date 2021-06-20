import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import {
  CategoryData,
  getAllCategory,
  getAllSubCategory,
  getSubCategoryDetail,
} from '../../services/AdminServices';

import Search from '../Search';
import { ColorOne, ColorTwo } from '../../styles/color';
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  ErrorText,
  Imageview,
  Title,
  Submitbutton,
} from '../../styles/styled';

import Loader from '../Loader';
import Nodata from '../Nodata';

function SubCatagoryView({ categoryName, handleSubPage }) {
  const [catagoryData, setCatagoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);

  const [category, setCategory] = useState('');
  const [subCategoryDetail, setSubCategoryDetail] = useState([]);

  useEffect(() => {
    setLoader(true);
    setCategory(categoryName);
    getSubCategory(categoryName);

    let data = CategoryData();
    if (data.length === 0) {
      getAllCategory().then(() => {
        data = CategoryData();
        console.log(data);
        console.log('cat');
        setCatagoryData(data);
      });
    } else {
      setCatagoryData(data);
    }
  }, []);

  const updateFilteredData = (filterData) => {
    if (filterData.length === 0) {
      setFilteredData(subCategoryDetail);
      setErrorMsg('No item Found!,Try different values!');

      return;
    }
    setFilteredData(filterData);
    setErrorMsg('');
  };

  const getSubCategory = async (name) => {
    setLoader(true);

    let subCat = getSubCategoryDetail(name); // available already

    if (subCat === null || subCat === undefined) {
      await getAllSubCategory(name); // fetch from api
      subCat = getSubCategoryDetail(name);
    }

    setSubCategoryDetail(subCat);
    setFilteredData(subCat);
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <div style={{ textAlign: 'center' }}>
          <Loader />
        </div>
      ) : (
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              value='category'
              name='category'
              style={{
                border: 'none',
                backgroundColor: ColorOne,
                width: 'auto',
                color: 'white',
                margin: '1%',
              }}
              onClick={handleSubPage}
            >
              {'BACK TO CATEGORY'}
            </button>
          </div>
          <Title>{category}</Title>

          <Search
            data={subCategoryDetail}
            searchKeys={['name', '']}
            updateFilteredData={updateFilteredData}
          />
          <ErrorText>{errorMsg}</ErrorText>

          <ContainerRow dynamic>
            {filteredData.map((value, index) => (
              <ContainerColumn
                key={index}
                className='col-md-3'
                height='50%'
                // title="Click to open sub-categories"
                // onClick={() => showSubCategory(value.name)}
              >
                <Card deg='40' nohover single>
                  <Imageview
                    src={value.image}
                    width='150px'
                    height='150px'
                    style={{ marginTop: '2%' }}
                    // alternate="no image"
                  />
                  <CenterAlign style={{ color: ColorOne }}>
                    {value.name}
                    <br />
                    <div
                      className='input-group   mb-2 mr-sm-2'
                      style={{
                        maxWidth: '80%',
                        marginLeft: '15%',
                        marginTop: '10%',
                      }}
                    >
                      <button
                        className='btn form-control  btn-danger mb-2 mr-2  '
                        value={value.name}
                      >
                        <AiFillDelete
                          size='18'
                          style={{ marginBottom: '5px' }}
                        />
                        delete
                      </button>
                      <Link
                        to={{
                          pathname: '/post',
                          state: { show: 'newCategory', value: value },
                        }}
                      >
                        <button
                          className='btn  purple form-control'
                          value={value.name}
                        >
                          <AiFillEdit size='18' />
                          Edit
                        </button>
                      </Link>
                    </div>
                  </CenterAlign>
                </Card>
              </ContainerColumn>
            ))}
            {filteredData.length === 0 &&
              setTimeout(() => {
                return <Nodata />;
              }, 200)}
          </ContainerRow>
        </Container>
      )}
    </>
  );
}
export default SubCatagoryView;
