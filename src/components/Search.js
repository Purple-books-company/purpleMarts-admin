import { useState } from "react";

const Search = ({ data, searchKeys }) => {
  const [searchVal, setSearchVal] = useState("");

  let dataKeys = Object.keys(data[0]);
  dataKeys = dataKeys.splice(0, 4);

  return (
    <div className="container">
      <h1 className="display-4">Search</h1>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name or email"
        onChange={(e) => setSearchVal(e.target.value.trim().toLowerCase())}
      />

      <table className="table my-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            {dataKeys.map((key, index) => (
              <th key={index} scope="col">
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data
            .filter((item) => {
              if (searchVal === "") {
                return item;
              } else if (
                item[searchKeys[0]].toLowerCase().indexOf(searchVal) !== -1 ||
                item[searchKeys[1]].toLowerCase().indexOf(searchVal) !== -1
              ) {
                return item;
              }
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {dataKeys.map((key, index) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
