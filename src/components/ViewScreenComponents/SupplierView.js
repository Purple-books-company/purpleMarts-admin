import { useEffect, useState } from "react";
import { getAllSupplier, SupplierData } from "../../services/AdminServices";
import { Container, ErrorText, Title } from "../../styles/styled";
import { AiFillCaretDown, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

import Search from "../Search";
import Loader from "../Loader";
import Nodata from "../Nodata";

function SupplierView() {
  const [supplierData, setSupplierData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function onMount() {
      let data = SupplierData();
      if (data.length === 0) {
        setLoader(true);
        await getAllSupplier();
        data = SupplierData();
      }

      setSupplierData(data);
      setFilteredData(data);
      setLoader(false);
    }
    onMount();
  }, []);

  const updateFilteredData = (filterData) => {
    if (filterData.length === 0) {
      console.log("calling");
      setFilteredData(supplierData);
      setErrorMsg("No item Found!,Try different values!");
      return;
    }
    setErrorMsg("");

    setFilteredData(filterData);
  };

  return (
    <>
      {" "}
      {loader ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <Container>
          <Title>Supplier Page</Title>
          <Search
            data={supplierData}
            searchKeys={["name", "companyName"]}
            updateFilteredData={updateFilteredData}
          />
          <ErrorText>{errorMsg}</ErrorText>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Contact Description</th>
                <th scope="col">Company Name</th>
                <th scope="col">Personal Info</th>
                <th scope="col">Delete/Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length == 0 && <Nodata />}{" "}
              {/*rectify warning for nodata*/}
              {filteredData.map((value, index) => (
                <tr key={index}>
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

                    <p className="collapse" id={"showdata" + index}>
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
                    <Link
                      to={{
                        pathname: "/post",
                        state: { show: "newSupplier", value: value },
                      }}
                    >
                      <button className="btn purple">
                        <AiFillEdit />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}
    </>
  );
}
export default SupplierView;
