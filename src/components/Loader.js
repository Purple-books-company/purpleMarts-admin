import Loading from 'react-loader-spinner';
import { ColorOne, ColorTwo } from '../styles/color';

export default function Loader() {
  return (
    <>
      <div
        style={{
          width: 'auto',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        {' '}
        <Loading
          type='Circles'
          secondaryColor={ColorTwo}
          color={ColorOne}
        ></Loading>
        <p style={{ color: ColorOne }}>Requesting server...</p>
      </div>
    </>
  );
}
//  style={{
//             maxWidth: '10%',
//             marginLeft: '45%',
//             marginTop: '10%',
//           }}
