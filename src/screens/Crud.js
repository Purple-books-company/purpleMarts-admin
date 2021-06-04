import { useEffect, useState } from "react";

import { ColorOne, ColorTwo } from "../styles/color";
import {
  Card,
  Container,
  Imageview,
  RightAlign,
  Title,

} from '../styles/styled';
import logo from '../assets/logo/logo.png';
import ProductForm from '../components/ProductForm';
import CatagoryForm from '../components/CatagoryForm';
import SupplierForm from '../components/SupplierForm';


function Crud() {
  let initialForm = {
    newProduct: false,
    newSupplier: false,
    newCatagory: false,
  };
  const [form, setForm] = useState(initialForm);
  const [currentForm, setCurrentForm] = useState("product section");
  useEffect(() => {
    let newState = initialForm;
    newState.newProduct = true;
    console.log(newState);
    setForm(newState);
  }, []);

  const handleChange = (e) => {
    console.log("change");
    let newState = initialForm;
    newState[e.target.name] = true;
    setForm(newState);
    setCurrentForm(e.target.value);
  };

  return (
    <Container>

      <Card deg='-40' width='100%' height='100%' margin='0%' nohover>

        <RightAlign>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              style={{ background: ColorTwo }}
              aria-expanded="false"
            >
              {currentForm}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                class="dropdown-item"
                name="newCatagory"
                value={"catagory section"}
                onClick={handleChange}
              >
                catagory section
              </button>
              <button
                class="dropdown-item"
                name="newSupplier"
                value={"supplier section"}
                onClick={handleChange}
              >
                supplier section
              </button>
              <button
                class="dropdown-item"
                name="newProduct"
                value={"product section"}
                onClick={handleChange}
              >
                product section
              </button>
            </div>
          </div>
        </RightAlign>
        <Title>{currentForm}</Title>

        {!form.newSupplier && !form.newCatagory && <ProductForm />}
        {form.newSupplier && <SupplierForm />}
        {form.newCatagory && <CatagoryForm />}

      </Card>
    </Container>
  );
}

export default Crud;
