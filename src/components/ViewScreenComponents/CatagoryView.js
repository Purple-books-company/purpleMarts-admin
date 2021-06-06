import { useEffect, useState } from "react";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import { CategoryData } from "../../services/AdminServices";
import Search from "../Search";
import { ColorOne } from "../../styles/color";
import {
  Card,
  CenterAlign,
  Container,
  ContainerColumn,
  ContainerRow,
  Imageview,
  LeftAlign,
} from "../../styles/styled";

function CatagoryView() {
  const [catagoryData, setCatagoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setCatagoryData(CategoryData());
    setFilteredData(CategoryData());
  }, []);

  const updateFilteredData = (filterData) => {
    setFilteredData(filterData);
  };

  return (
    <Container>
      <Search
        data={catagoryData}
        searchKeys={["name", ""]}
        updateFilteredData={updateFilteredData}
      />
      <ContainerRow full>
        {filteredData.map((value, index) => (
          <ContainerColumn className="col-md-3" height="50%">
            <Card deg="40" nohover>
              <Imageview
                src={value.image}
                width="50%"
                style={{ marginTop: "2%" }}
                // alternate="no image"
              />
              <CenterAlign style={{ color: ColorOne }}>
                {value.name}
                <br />
                <div
                  class="input-group mb-2 mr-sm-2"
                  style={{
                    maxWidth: "80%",
                    marginLeft: "10%",
                    textAlign: "center",
                  }}
                >
                  <button
                    className="btn btn-danger mr-2 form-control"
                    value={value.name}
                  >
                    <AiFillDelete size="18" />
                    {"  "}
                    Delete
                  </button>
                  <button
                    className="btn btn-info form-control"
                    name="addImages"
                    value={value.name}
                  >
                    <AiFillInfoCircle size="18" />
                    {"  "}View
                  </button>
                </div>
              </CenterAlign>
            </Card>
          </ContainerColumn>
        ))}
        ``
      </ContainerRow>
    </Container>
  );
}
export default CatagoryView;
