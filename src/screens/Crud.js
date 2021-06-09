import { useEffect, useState } from 'react';

import { ColorTwo } from '../styles/color';
import { Card, Container, Title } from '../styles/styled';

import ProductForm from '../components/ProductForm';
import CatagoryForm from '../components/CatagoryForm';
import SupplierForm from '../components/SupplierForm';
import Nav from '../components/Nav';

function Crud() {
  let initialForm = {
    newProduct: false,
    newSupplier: false,
    newCatagory: false,
  };
  const [form, setForm] = useState(initialForm);
  const [currentForm, setCurrentForm] = useState('product section');
  useEffect(() => {
    let newState = initialForm;
    newState.newProduct = true;
    console.log(newState);
    setForm(newState);
  }, []);

  const handleChange = (e) => {
    console.log('change');
    let newState = initialForm;
    newState[e.target.name] = true;
    setForm(newState);
    setCurrentForm(e.target.value);
  };

  return (
    <>
      <Nav navItems={['Dashboard']} navLinks={['/']} />
      <Container>
        <Card deg='-40' width='100%' height='100%' margin='0%' nohover>
          <div style={{ textAlign: 'right' }}>
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
                {currentForm}
              </button>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <button
                  class='dropdown-item'
                  name='newCatagory'
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
              </div>
            </div>
          </div>
          <Title>{currentForm}</Title>

          {!form.newSupplier && !form.newCatagory && <ProductForm />}
          {form.newSupplier && <SupplierForm />}
          {form.newCatagory && <CatagoryForm />}
        </Card>
      </Container>
    </>
  );
}

export default Crud;
