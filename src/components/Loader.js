import Loading from 'react-loader-spinner';
import { ColorOne, ColorTwo } from '../styles/color';

export default function Loader() {
  return (
    <>
      <div
        style={{
          width: 'auto',
          textAlign: 'center',
          marginTop: '15%',
        }}
      >
        {' '}
        <Loading
          type='Circles'
          secondaryColor={ColorTwo}
          color={ColorOne}
        ></Loading>
        <p style={{ color: ColorTwo }}> Requsting server...</p>
      </div>
    </>
  );
}
//  style={{
//             maxWidth: '10%',
//             marginLeft: '45%',
//             marginTop: '10%',
//           }}
