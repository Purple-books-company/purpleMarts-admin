import { useEffect, useState } from 'react';

import { ColorTwo } from '../styles/color';
import { Card, Container, Title } from '../styles/styled';
import { useLocation } from 'react-router';
import ProductForm from '../components/formComponents/ProductTest';
import CatagoryForm from '../components/formComponents/CatagoryForm';
import SupplierForm from '../components/formComponents/SupplierForm';
import Nav from '../components/Nav';
import SubCategoryForm from '../components/formComponents/SubCategoryForm';
import React from 'react';

function Crud() {
  let initialForm = React.useMemo(() => {
    return {
      newProduct: false,
      newSupplier: false,
      newCategory: false,
      newSubCategory: false,
    };
  }, []);
  const location = useLocation();

  const [form, setForm] = useState(initialForm);
  const [currentForm, setCurrentForm] = useState('');

  const [fillForm, setFillForm] = useState(null);

  useEffect(() => {
    let newState = { ...initialForm };
    console.log('rendering');
    if (location && location.state) {
      newState[location.state.show] = true;
      setFillForm(location.state.value);
    } else {
      newState.newProduct = true;
    }

    setForm(newState);
  }, [initialForm, location]);

  const handleChange = (e) => {
    console.log('change');

    let newState = { ...initialForm };
    newState[e.target.name] = true;
    setForm(newState);
    setCurrentForm(e.target.value);
  };

  return (
    <>
      <Nav navItems={['Dashboard', 'offer']} navLinks={['/', '/offer']} />
      <Container>
        <Card deg='-40' width='100%' height='100%' margin='0%' nohover>
          {fillForm === null && (
            <div style={{ textAlign: 'right', margin: '2%' }}>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  style={{ background: ColorTwo }}
                  aria-expanded='false'
                >
                  {currentForm || 'select form'}
                </button>

                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <button
                    class='dropdown-item'
                    name='newCategory'
                    value={'catagory section'}
                    onClick={handleChange}
                  >
                    catagory section
                  </button>
                  <button
                    className='dropdown-item'
                    name='newSupplier'
                    value={'supplier section'}
                    onClick={handleChange}
                  >
                    supplier section
                  </button>
                  <button
                    className='dropdown-item'
                    name='newProduct'
                    value={'product section'}
                    onClick={handleChange}
                  >
                    product section
                  </button>
                  <button
                    className='dropdown-item'
                    name='newSubCategory'
                    value={'subCategory section'}
                    onClick={handleChange}
                  >
                    SubCategory section
                  </button>
                </div>
              </div>
            </div>
          )}
          <Title>{currentForm}</Title>

          {form.newProduct && <ProductForm />}
          {form.newSupplier && <SupplierForm data={fillForm} />}
          {form.newCategory && <CatagoryForm data={fillForm} />}
          {form.newSubCategory && <SubCategoryForm data={fillForm} />}
        </Card>
      </Container>
    </>
  );
}

export default Crud;
