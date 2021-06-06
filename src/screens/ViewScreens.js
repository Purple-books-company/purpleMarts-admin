import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';
import CatagoryView from '../components/ViewScreenComponents/CatagoryView';
import ProductView from '../components/ViewScreenComponents/ProductView';
import SupplierView from '../components/ViewScreenComponents/SupplierView';
import { SupplierData } from '../services/AdminServices';
import { ColorOne, ColorTwo } from '../styles/color';
import { RightAlign } from '../styles/styled';

function ViewScreens() {
  const initialState = {
    category: false,
    supplier: false,
    product: false,
  };
  const show = useLocation();
  const [loader, setLoader] = useState(false);
  const [mountView, setMountView] = useState(initialState);

  useEffect(() => {
    setLoader(true);
    let newState = { ...initialState };

    if (show && show.state) newState[show.state.show] = true;
    else newState['category'] = true;

    setMountView(newState);
    setLoader(false);
  }, []);
  const handleChange = (e) => {
    if (e.target.value != '') {
      console.log(e.target.value);

      let newState = { ...initialState };
      console.log(newState);
      newState[e.target.value] = true;

      console.log('state changed');

      setMountView(newState);
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RightAlign>
            <select
              onChange={handleChange}
              style={{
                minWidth: '20%',
                borderRadius: '10px',
                outline: 'none',
                marginRight: '5%',
                backgroundColor: ColorOne,
                color: 'white',
              }}
            >
              <option defaultValue='' value=''>
                switch View
              </option>
              <option value='category'>category</option>
              <option value='supplier'>supplier</option>
              <option value='product'>product</option>
            </select>
          </RightAlign>

          {!mountView.supplier && !mountView.product && <CatagoryView />}
          {mountView.supplier && <SupplierView />}
          {mountView.product && <ProductView />}
        </>
      )}
    </>
  );
}
export default ViewScreens;
