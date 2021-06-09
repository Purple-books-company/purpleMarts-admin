import Loading from 'react-loader-spinner';
import { ColorOne, ColorTwo } from '../styles/color';

export default function Loader() {
  return (
    <>
      <div>
        {' '}
        <Loading
          type='Circles'
          style={{
            maxWidth: '10%',
            marginLeft: '45%',
            marginTop: '10%',
          }}
          secondaryColor={ColorTwo}
          color={ColorOne}
        ></Loading>
        <p style={{ color: ColorTwo }}> Requsting server...</p>
      </div>
    </>
  );
}
