import { useEffect, useState } from 'react';
import { SupplierData } from '../../services/AdminServices';
import { Container } from '../../styles/styled';

function SupplierView() {
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    let data = SupplierData();

    setSupplierData(data);
  }, []);
  return (
    <Container>
      <table class='table'>
        <thead class='thead-dark'>
          <tr>
            <th scope='col'>name</th>
            <th scope='col'>contact description</th>
            <th scope='col'>company Name</th>
            <th scope='col'>personalInfo</th>
            <th scope='col'>View/delete</th>
          </tr>
        </thead>
        <tbody>
          {supplierData.map((value, index) => (
            <tr>
              <th scope='row'>{value.name}</th>
              <td>{value.contactDescription}</td>
              <td>{value.companyName}</td>
              <td>
                <b>deliveryname:</b>
                {value.personalInfo.deliveryName}
                <br />
                <b>phone:</b>
                {value.personalInfo.phoneNumber}
                <br />

                <p class='collapse' id={'showdata' + index}>
                  <b>address:</b>
                  {value.personalInfo.address},
                  <br />
                  {value.personalInfo.city}-{value.personalInfo.pincode},
                  <br />
                  {value.personalInfo.state},
                  <br />
                  {value.personalInfo.nation}.
                  <br />
                </p>
                <a href={'#showdata' + index} data-toggle='collapse'>
                  showmore
                </a>
              </td>
              <td>
                <button className='btn btn-danger form-control'>delete</button>
                <br />
                <br />
                <button className='btn btn-info form-control'>edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
export default SupplierView;
