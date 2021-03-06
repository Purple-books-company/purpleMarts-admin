import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Search from '../Search';
import { ColorOne } from '../../styles/color';
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  ErrorText,
  Imageview,
  Title,
} from '../../styles/styled';

import { CategoryData, getAllCategory } from '../../services/AdminServices';
import Loader from '../Loader';
import Nodata from '../Nodata';
import { ApiDeleteService } from '../../services/ApiServices';

function CatagoryView({ showSubCategory }) {
  const [catagoryData, setCatagoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
   
    getData();
  }, []);
   async function getData() {
      setLoader(true);
      let data = await CategoryData();

      setCatagoryData(data);

      setFilteredData(data);

      setLoader(false);
    }
  const handleDelete=async (e)=>{
   if(!window.confirm("Are you sure you want to delete"+e.target.value)) return;
   setLoader(true);
   
   let res = await ApiDeleteService("category",e.target.value);
   if(res===true){
     await getAllCategory();
     getData();
   }
   else{
      alert("some error occured");
   }
   setLoader(false);

  }
  const updateFilteredData = (filterData) => {
    if (filterData.length === 0) {
      setFilteredData(catagoryData);
      setErrorMsg('No item Found!,Try different values!');
      return;
    }
    setFilteredData(filterData);
    setErrorMsg('');
  };

  return (
    <>
      {loader ? (
        <div style={{ textAlign: 'center' }}>
          <Loader />
        </div>
      ) : (
        <Container>
          <Title>Category Page</Title>
          <Search
            data={catagoryData}
            searchKeys={['name', '']}
            updateFilteredData={updateFilteredData}
          />
          <ErrorText>{errorMsg}</ErrorText>

          <ContainerRow dynamic>
            {filteredData.length === 0 && <Nodata />}
            {filteredData.map((value, index) => (
              <ContainerColumn
                key={index}
                className='col-md-3'
                height='50%'
                // title="Click to open sub-categories"
               
              >
                <Card deg='40' nohover single>
                  <Imageview
                    src={value.image}
                    width='150px'
                    height='150px'
                    style={{ marginTop: '2%' }}
                     onClick={() => showSubCategory(value.name)}
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
                        className='btn btn-outline-danger   mb-2 mr-2  '
                        value={value.name}
                        onClick={handleDelete}
                      >
                        <AiFillDelete
                          size='18'
                          color='red'
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
          </ContainerRow>
        </Container>
      )}
    </>
  );
}
export default CatagoryView;
