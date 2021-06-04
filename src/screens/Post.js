import { useState } from 'react';

import Bulkinsert from '../components/Bulkinsert';
import ProductForm from '../components/ProductForm';

function Post() {
  const [bulk, isbulk] = useState(false);
  return (
    <>
      <button onClick={() => isbulk(!bulk)}>
        {bulk ? 'add single' : 'bulk update'}
      </button>
      {bulk ? <Bulkinsert /> : <ProductForm />}
    </>
  );
}

export default Post;
