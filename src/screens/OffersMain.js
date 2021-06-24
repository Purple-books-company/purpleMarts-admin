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
    <Container>
      <Card deg='45' nohover>
        <ContainerRow dynamic>
          <ContainerColumn height='10%' className='col'>
            <ToggleButton
              active={active.offer}
              value='offer'
              onClick={handleToggle}
            >
              Offer
            </ToggleButton>
          </ContainerColumn>

          <ContainerColumn height='10%' className='col'>
            <ToggleButton
              active={active.advertisement}
              value='advertisement'
              onClick={handleToggle}
            >
              Advertisement
            </ToggleButton>
          </ContainerColumn>

          <ContainerColumn height='10%' className='col'>
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
  );
};

export default OffersMain;
