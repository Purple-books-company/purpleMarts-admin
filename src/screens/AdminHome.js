import { useEffect, useState } from 'react';

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

import OrderDashBoard from '../components/dashBoardcomponents/OrderDashBoard';
import TopCartDashBoard from '../components/dashBoardcomponents/TopCartDashboard';
import { ColorOne } from '../styles/color';

function AdminHome({logout}) {
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
    if (CategoryData().length === 0) {
      await getAllCategory();
      await getAllSupplier();
    }

    setCategoryData(CategoryData().length);
    setSupplierData(SupplierData().length);
    setLoader(false);
  };
  return (
    <>
      <Nav navItems={['logout']} navLinks={['/logout']} View={true} logout={logout}  />
      <Container style={{ textAlign: 'center' }}>
        {loader ? (
          <Loader />
        ) : (
          <>
            <ContainerRow dynamic>
              <ContainerColumn height='50%' className='col-md-7'>
                <OrderDashBoard />
              </ContainerColumn>
              <ContainerColumn height='50%' className='col-md-5'>
                <TopCartDashBoard />
              </ContainerColumn>

              <ContainerColumn height='10%' className='col-md-12 col-sm-12'>
                <AssetComponents
                  catCount={categoryData}
                  supCount={supplierData}
                />
              </ContainerColumn>
            </ContainerRow>
            <ContainerRow>
              <ContainerColumn height='100%' className='col-md-4'>
                <Card></Card>
              </ContainerColumn>
              <ContainerColumn height='100%' className='col-md-4'>
                <Card></Card>
              </ContainerColumn>
              <ContainerColumn
                height='100%'
                className='col-md-4'
              ></ContainerColumn>
            </ContainerRow>
          </>
        )}
      </Container>
    </>
  );
}
export default AdminHome;
