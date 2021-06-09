import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import AssetComponents from '../components/dashBoardcomponents/AssetComponents';

import Loader from '../components/Loader';
import {
  CategoryData,
  getAllCategory,
  getAllSupplier,
  SupplierData,
} from '../services/AdminServices';

import {
  Card,
  Container,
  ContainerRow,
  ContainerColumn,
} from '../styles/styled';
import Nav from '../components/Nav';
import { FaCommentsDollar } from 'react-icons/fa';

function AdminHome() {
  const [categoryData, setCategoryData] = useState();
  const [supplierData, setSupplierData] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchData();
    // let data = {
    //   categoryId: 'Point',
    //   page: 2,
    // };
    // ApiPostService('dd', data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {});
  }, []);
  const fetchData = async () => {
    setLoader(true);
    if (CategoryData().length == 0) {
      await getAllCategory();
      await getAllSupplier();
    }

    setCategoryData(CategoryData().length);
    setSupplierData(SupplierData().length);
    setLoader(false);
  };
  return (
    <>
      <Nav navItems={['logout']} navLinks={['/logout']} View={true} />
      <Container style={{ textAlign: 'center' }}>
        {loader ? (
          <Loader />
        ) : (
          <ContainerRow dynamic>
            <ContainerColumn style={{ height: '25%' }} className='col-md-6'>
              <Link to='/post'>
                <Card
                  deg='45'
                  onClick={() => {
                    console.log('clicking');
                  }}
                >
                  post
                </Card>
              </Link>
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-6'>
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>

            <ContainerColumn
              height='50%'
              style={{ marginBottom: '1%' }}
              className='col-md-12'
            >
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>

            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>
            <ContainerColumn
              style={{ height: '25%', marginBottom: '4%' }}
              className='col-md-4'
            >
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>
          </ContainerRow>
        )}
      </Container>
    </>
  );
}
export default AdminHome;
