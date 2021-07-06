import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import VarientDetail from '../components/ProductEditComponents/VarientDetail';

import { Container } from '../styles/styled';

function ProductEditScreen() {
  const product = useLocation();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (product.state && product.state.product != null) {
      setDetail(product.state.product);
    }
  }, [product]);
  return (
    <>
      <Container>
        <select className='form-control'>
          {' '}
          <option value=''>hello</option>
        </select>

        {detail && <VarientDetail data={detail} />}
      </Container>
    </>
  );
}
export default ProductEditScreen;
