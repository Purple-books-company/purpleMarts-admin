import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ data, searchKeys, updateFilteredData }) => {
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    filterData();
  }, [searchVal]);

  const filterData = () => {
    let filteredList = data.filter((item) => {
      if (searchVal === "") {
        return item;
      } else if (
        item[searchKeys[0]].toLowerCase().indexOf(searchVal) !== -1 ||
        (searchKeys[1] !== "" &&
          item[searchKeys[1]].toLowerCase().indexOf(searchVal) !== -1)
      ) {
        return item;
      }
    });

    updateFilteredData(filteredList);
  };

  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder={"Search by " + searchKeys[0] + " or " + searchKeys[1]}
      onChange={(e) => setSearchVal(e.target.value.trim().toLowerCase())}
    />
  );
};

export default Search;
