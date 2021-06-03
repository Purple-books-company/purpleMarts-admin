import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";

const SearchTest = () => {
  const [users, setUsers] = useState([]);

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
    <div>
      {users.length > 0 && (
        <Search data={users} searchKeys={["name", "email"]} />
      )}
    </div>
  );
};

export default SearchTest;
