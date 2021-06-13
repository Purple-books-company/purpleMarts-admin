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
      <Nav navItems={['logout']} navLinks={['/logout']} View={true} />
      <Container style={{ textAlign: 'center' }}>
        {loader ? (
          <Loader />
        ) : (
          <ContainerRow dynamic>
            <ContainerColumn height="50%" className='col-md-7'>
            
               
              <OrderDashBoard />
                
              
            </ContainerColumn>
            <ContainerColumn height="50%" className='col-md-5'>
              <ContainerColumn className="col-md-12">
               <TopCartDashBoard />
              </ContainerColumn>
            
              
            </ContainerColumn>

            <ContainerColumn
              height='10%'
              style={{ marginBottom: '1%' }}
              className='col-md-12'
            >
            <AssetComponents
                catCount={categoryData}
                supCount={supplierData}
              />
            </ContainerColumn>

            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
             hello
            </ContainerColumn>
            <ContainerColumn style={{ height: '25%' }} className='col-md-4'>
             <Card>

             </Card>
            </ContainerColumn>
            <ContainerColumn
              style={{ height: '25%', marginBottom: '4%' }}
              className='col-md-4'
            >
            
            </ContainerColumn>
          </ContainerRow>
        )}
      </Container>
    </>
  );
}
export default AdminHome;
