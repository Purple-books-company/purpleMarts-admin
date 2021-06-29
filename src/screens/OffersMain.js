import { useState } from 'react';

import {
  Container,
  Card,
  ContainerRow,
  ContainerColumn,
  ToggleButton,
} from '../styles/styled';

import Offers from '../components/offersComponents/Offers';
import Advertisement from '../components/offersComponents/Advertisement';
import SocialMedia from '../components/offersComponents/SocialMedia';
import Nav from '../components/Nav';
import { ColorOne, ColorTwo } from '../styles/color';

const OffersMain = () => {
  let initialState = { offer: true, advertisement: false, social: false };

  const [active, setActive] = useState(initialState);

  const handleToggle = (e) => {
    let newState = { ...initialState };
    newState.offer = false;
    newState[e.target.value] = true;
    setActive(newState);
  };

  return (
    <>
      <Nav navItems={['dashboard']} navLinks={['/']} View={true} />
      <Container>
        <Card nohover>
          <ContainerRow dynamic style={{ backgroundColor: ColorOne }}>
            <ContainerColumn height='10%' className='col-md-4 col-6'>
              <ToggleButton
                active={active.offer}
                value='offer'
                onClick={handleToggle}
              >
                Offer
              </ToggleButton>
            </ContainerColumn>

            <ContainerColumn height='10%' className='col-md-4 col-6'>
              <ToggleButton
                active={active.advertisement}
                value='advertisement'
                onClick={handleToggle}
              >
                Advertisement
              </ToggleButton>
            </ContainerColumn>

            <ContainerColumn height='10%' className='col-md-4 col'>
              <ToggleButton
                active={active.social}
                value='social'
                onClick={handleToggle}
              >
                Social Media
              </ToggleButton>
            </ContainerColumn>
          </ContainerRow>
          <ContainerColumn className='col-md-12 mt-5' height='100%'>
            {active.offer && <Offers />}

            {active.advertisement && <Advertisement />}
            {active.social && <SocialMedia />}
          </ContainerColumn>
        </Card>
      </Container>
    </>
  );
};

export default OffersMain;
