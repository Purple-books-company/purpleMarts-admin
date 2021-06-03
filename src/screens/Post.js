import { useState } from 'react';
import AddNewProduct from '../components/AddNewProduct';
import Bulkinsert from '../components/Bulkinsert';

function Post() {
  const [bulk, isbulk] = useState(false);
  return (
    <>
      <button onClick={() => isbulk(!bulk)}>
        {bulk ? 'add single' : 'bulk update'}
      </button>
      {bulk ? <Bulkinsert /> : <AddNewProduct />}
    </>
  );
}

export default Post;
