import { ExcelSchema } from '../services/AdminServices';
import readXlsxFile from 'read-excel-file';
import { useEffect, useState } from 'react';
import { Card, Submitbutton, Title } from '../styles/styled';
import { ColorTwo } from '../styles/color';


function Bulkinsert() {
  const [isfile, setFile] = useState(false);
  const [details, setDetails] = useState([]);
  const [keys, setKeys] = useState([]);

  function handleFile(e) {
    let filevalue = e.target.files[0];
    console.log(filevalue);
    readXlsxFile(filevalue, { schema: ExcelSchema }).then(
      ({ rows, errors }) => {
        if (errors.length === 0) {
          setDetails(rows);
          setKeys(Object.keys(rows[0]));
        } else console.log(errors);
      }
    );
  }
  function showImage(head, value) {
    const imgCell = ['originalUrl', 'imageUrl1', 'imageUrl2', 'imageUrl3'];
    if (imgCell.indexOf(head) != -1) {
      return <img src={value} style={{ width: '50%', height: '50%' }} />;
    } else {
      return value;
    }
  }

  return (
    <>
      <Card deg='-45' style={{ marginLeft: '3%' }} nohover>
        <Title>BULK INSERT</Title>
        <input
          type='file'
          accept='.xls,.xlsx'
          className='form-control'
          onChange={handleFile}
          style={{
            marginTop: '2%',
            width: '50%',
            margin: '3%',
            backgroundColor: 'none',
          }}
        />
        <table className='table overflow-auto' style={{ overflow: 'scroll' }}>
          <thead className='thdark'>
            <tr>
              {keys.map((value, index) => (
                <th scope='col' key={index}>
                  {value}
                </th>
              ))}{' '}
            </tr>
          </thead>
          <tbody>
            {details.map((value, index) => (
              <tr>
                {keys.map((keyvalue, keyindex) => (
                  <td key={keyvalue + index}>
                    {showImage(keyvalue, value[keyvalue])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {details.length > 0 && <Submitbutton>POST</Submitbutton>}
      </Card>
    </>
  );
}

export default Bulkinsert;
