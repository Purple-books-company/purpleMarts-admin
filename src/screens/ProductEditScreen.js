import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import VarientDetail from '../components/ProductEditComponents/VarientDetail';

import ProductDetail from '../components/ProductEditComponents/ProductDetail';

import { Container } from '../styles/styled';
import { ColorTwo } from '../styles/color';
import { ApiGetService } from '../services/ApiServices';

function ProductEditScreen() {
  const product = useLocation();
  const [detail, setDetail] = useState(null);
  const [productEdit, setProduct] = useState(true);

  useEffect(() => {
    if (product.state && product.state.product != null) {
      ApiGetService('product', product.state.product).then((res) =>
        setDetail(res)
      );
    }
  }, [product]);
  function refetch() {
    
    ApiGetService('product', detail.id).then((res) => setDetail(res));
  }
  function handleChange(e) {
    if (e.target.name === 'product' && productEdit === true) {
      return;
    }
    if (e.target.name === 'varient' && productEdit === false) {
      return;
    }
    setProduct(!productEdit);
  }
  return (
    <>
      <Container>
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
              {productEdit ? 'product Edit' : 'varientEdit'}
            </button>

            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <button
                class='dropdown-item'
                name='product'
                onClick={handleChange}
              >
                product edit
              </button>
              <button
                className='dropdown-item'
                name='varient'
                onClick={handleChange}
              >
                varient edit
              </button>
            </div>
          </div>
        </div>

        {detail && productEdit && <ProductDetail res={detail} refetch={refetch} />}
        {detail && !productEdit && (
          <VarientDetail
            varient={detail.varients}
            productId={detail.id}
            refetch={refetch}
          />
        )}
      </Container>
    </>
  );
}
export default ProductEditScreen;
