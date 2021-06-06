import { useEffect, useState } from "react";
import { SupplierData } from "../../services/AdminServices";
import { Container } from "../../styles/styled";
import { AiFillCaretDown, AiFillDelete, AiFillEdit } from "react-icons/ai";
import Search from "../Search";

function SupplierView() {
  const [supplierData, setSupplierData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let data = SupplierData();

    setSupplierData(data);
    setFilteredData(data);
  }, []);

  const updateFilteredData = (filterData) => {
    setFilteredData(filterData);
  };

  return (
    <Container>
      <Search
        data={supplierData}
        searchKeys={["name", "companyName"]}
        updateFilteredData={updateFilteredData}
      />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Contact Description</th>
            <th scope="col">Company Name</th>
            <th scope="col">Personal Info</th>
            <th scope="col">Delete/Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((value, index) => (
            <tr>
              <th scope="row">{value.name}</th>
              <td>{value.contactDescription}</td>
              <td>{value.companyName}</td>
              <td>
                <b>Delivery name:</b>
                {value.personalInfo.deliveryName}
                <br />
                <b>Phone number:</b>
                {value.personalInfo.phoneNumber}
                {"  "}

                <p class="collapse" id={"showdata" + index}>
                  <b>Address:</b>
                  {value.personalInfo.address},
                  <br />
                  {value.personalInfo.city}-{value.personalInfo.pincode},
                  <br />
                  {value.personalInfo.state},
                  <br />
                  {value.personalInfo.nation}.
                </p>
                <a
                  href={"#showdata" + index}
                  // className="ml-2"
                  data-toggle="collapse"
                >
                  <AiFillCaretDown />
                </a>
              </td>
              <td>
                <button className="btn btn-danger mr-2">
                  <AiFillDelete />
                </button>
                <button className="btn btn-info">
                  <AiFillEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
export default SupplierView;
