import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    const request = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = request.data;
    setUsers(data);
  };

  return (
    <div className="container">
      <h1 className="display-4">Search</h1>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name or email"
        onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
      />

      <table className="table my-4">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Website</th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user) => {
              if (searchVal === "") {
                return user;
              } else if (
                user.name.toLowerCase().indexOf(searchVal) !== -1 ||
                user.email.toLowerCase().indexOf(searchVal) !== -1
              ) {
                return user;
              }
            })
            .map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email} Hr</td>
                <td>{user.website}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
