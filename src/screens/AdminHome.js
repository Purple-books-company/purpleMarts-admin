import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AssetComponents from '../components/dashBoardcomponents/AssetComponents';

import Loader from '../components/Loader';
import {
  CategoryData,
  getAllCategory,
  getAllSupplier,
  SupplierData,
} from '../services/AdminServices';
import { ApiGetService, ApiPostService } from '../services/ApiServices';
import {
  Heading,
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
          <ContainerRow full>
            <ContainerColumn style={{ height: '25%' }} className='col-md-6'>
              <Link to='/post'>
                <Card
                  deg='45'
                  onClick={() => {
                    console.log('clicking');
                  }}
                >
                  hello
                </Card>
              </Link>
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-6'>
              <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>

            <ContainerColumn height='40%' className='col-md-12'>
              <Card deg='-33'>Hello</Card>
            </ContainerColumn>

            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
              <Card deg='-70'>Hello</Card>
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
              <Card deg='-45'>Hello</Card>
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
              <Card deg='40'>Hello</Card>
            </ContainerColumn>
          </ContainerRow>
        )}
      </Container>
    </>
  );
}
export default AdminHome;
