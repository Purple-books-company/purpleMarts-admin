import { useState } from "react";

import {
  Container,
  Card,
  ContainerRow,
  ContainerColumn,
  ToggleButton,
} from "../styles/styled";

import Offers from "../components/offersComponents/Offers";
import Advertisement from "../components/offersComponents/Advertisement";
import SocialMedia from "../components/offersComponents/SocialMedia";

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
      <Card nohover>
        <ContainerRow full>
          <ContainerColumn height="10%" className="col-4">
            <ToggleButton
              active={active.offer}
              value="offer"
              onClick={handleToggle}
            >
              Offer
            </ToggleButton>
          </ContainerColumn>

          <ContainerColumn height="10%" className="col-4">
            <ToggleButton
              active={active.advertisement}
              value="advertisement"
              onClick={handleToggle}
            >
              Advertisement
            </ToggleButton>
          </ContainerColumn>

          <ContainerColumn height="10%" className="col-4">
            <ToggleButton
              active={active.social}
              value="social"
              onClick={handleToggle}
            >
              Social Media
            </ToggleButton>
          </ContainerColumn>

          {active.offer && <Offers />}
          {active.advertisement && <Advertisement />}
          {active.social && <SocialMedia />}
        </ContainerRow>
      </Card>
    </Container>
  );
};

export default OffersMain;
