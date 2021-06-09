import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import ProductDetail from "../components/ProductEditComponents/ProductDetail";
import VarientDetail from "../components/ProductEditComponents/VarientDetail";
import ProductView from "../components/ViewScreenComponents/ProductView";
import { Card, Container } from "../styles/styled";

function ProductEditScreen() {
  const product = useLocation();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (product.state && product.state.product != null) {
      setDetail(product.state.product);
    }
  }, []);
  return (
    <>
      <Container>
        <select className="form-control">
          {" "}
          <option value="">hello</option>
        </select>

        {detail && <VarientDetail data={detail} />}
      </Container>
    </>
  );
}
export default ProductEditScreen;
