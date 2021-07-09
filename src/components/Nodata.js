import { FcDeleteDatabase } from 'react-icons/fc';
import { Msg } from '../styles/styled';
function Nodata() {
  return (
    <div className='container'>
      <Msg>
        <FcDeleteDatabase size={100} />
        Data Not Found
      </Msg>
    </div>
  );
}
export default Nodata;
