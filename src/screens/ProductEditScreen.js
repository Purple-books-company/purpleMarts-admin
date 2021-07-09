import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import VarientDetail from '../components/ProductEditComponents/VarientDetail';

import ProductDetail from '../components/ProductEditComponents/ProductDetail';

import { Container } from '../styles/styled';
import { ApiGetService } from '../services/ApiServices';

function ProductEditScreen() {
  const product = useLocation();
  const [detail, setDetail] = useState(null);

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
  return (
    <>
      <Container>
        <select className='form-control'>
          {' '}
          <option value=''>hello</option>
        </select>

        {/* {detail && <ProductDetail res={detail} />} */}
        {detail && (
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
