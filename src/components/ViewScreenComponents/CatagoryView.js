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

          <ContainerRow full>
            {filteredData.map((value, index) => (
              <ContainerColumn key={index} className='col-md-3' height='50%'>
                <Card deg='40' nohover single>
                  <Imageview
                    src={value.image}
                    width='50%'
                    style={{ marginTop: '2%' }}
                    // alternate="no image"
                  />
                  <CenterAlign style={{ color: ColorOne }}>
                    {value.name}
                    <br />
                    <div
                      className='input-group mb-2 mr-sm-2'
                      style={{
                        maxWidth: '80%',
                        marginLeft: '10%',
                        textAlign: 'center',
                      }}
                    >
                      <button
                        className='btn btn-danger mr-2 form-control '
                        value={value.name}
                      >
                        <AiFillDelete
                          size='18'
                          style={{ marginBottom: '5px' }}
                        />
                        {'  '}
                        Delete
                      </button>
                      <Link
                        to={{
                          pathname: '/post',
                          state: { show: 'newCategory', value: value },
                        }}
                      >
                        <button
                          className='btn purple form-control'
                          value={value.name}
                        >
                          <AiFillInfoCircle size='18' />
                          {'  '}View
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
