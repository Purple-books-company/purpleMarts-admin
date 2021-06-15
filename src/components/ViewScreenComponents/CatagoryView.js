import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
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

function CatagoryView() {
  const [catagoryData, setCatagoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let data = CategoryData();
    if (data.length === 0) {
      getAllCategory().then(() => {
        data = CategoryData();
        console.log(data);
        console.log('cat');
        setCatagoryData(data);

        setFilteredData(data);
      });
    } else {
      setCatagoryData(data);

      setFilteredData(data);
    }
    setLoader(false);
  }, []);

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
            {filteredData.map((value, index) => (
              <ContainerColumn key={index} className='col-md-3 col-sm-6 col-xs-8' height='50%'>
                <Card deg='40' nohover single>
                  <Imageview
                    src={value.image}
                    width='150px'
                    height="150px"
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
                        marginLeft:"15%",
                        marginTop:"10%",
                      
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
                          <AiFillInfoCircle size='18' />
                        View
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
