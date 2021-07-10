import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';
import CatagoryView from '../components/ViewScreenComponents/CatagoryView';
import ProductView from '../components/ViewScreenComponents/ProductView';
import SupplierView from '../components/ViewScreenComponents/SupplierView';
import SubCategoryView from '../components/ViewScreenComponents/SubCategoryView';

import Nav from '../components/Nav';

function ViewScreens() {
  const initialState = React.useMemo(() => {
    return {
      category: false,
      supplier: false,
      product: false,
      subCategory: false,
    };
  }, []);
  const show = useLocation();
  const [loader, setLoader] = useState(false);
  const [mountView, setMountView] = useState(initialState);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoader(true);
    let newState = { ...initialState };
    console.log('rendering');
    if (show && show.state) {
      console.log(show.state.show);

      newState[show.state.show] = true;
      if (show.state.value) {
        setData(show.state.value);
        console.log(show.state.value);
      }
    } else newState['category'] = true;

    setMountView(newState);
    setLoader(false);
  }, [show, initialState]);
  const handleChange = (e) => {
    if (e.target.value !== '') {
      let newState = { ...initialState };
      newState[e.target.value] = true;

      setMountView(newState);
    }
  };
  const handleSubPage = () => {
    setMountView({ ...initialState, category: true });
  };
  const showSubCategory = (subCategoryName) => {
    let newState = { ...initialState };
    setData(subCategoryName);
    newState['subCategory'] = true;
    setMountView(newState);
  };
  return (
    <>
      {!mountView.product && (
        <Nav
          navItems={['post', 'Dashboard']}
          navLinks={['/post', '/']}
          Show={!mountView.subCategory ? handleChange : null}
        />
      )}

      {loader ? (
        <Loader />
      ) : (
        <>
          {/* <RightAlign>
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
          </RightAlign> */}

          {mountView.category && (
            <CatagoryView showSubCategory={showSubCategory} />
          )}
          {mountView.subCategory && (
            <SubCategoryView
              categoryName={data}
              handleSubPage={handleSubPage}
            />
          )}
          {mountView.supplier && <SupplierView />}
          {mountView.product && <ProductView />}
        </>
      )}
    </>
  );
}
export default ViewScreens;
