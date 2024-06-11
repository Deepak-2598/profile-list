import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../redux/common/commonSlice";

const SearchApp = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null)

  useEffect(() => {
    if (search) {
      let timeout = setTimeout(() => {
         dispatch(searchData(search))
      }, 500)
      return () => {
        clearTimeout(timeout);
      }
    } else {
      dispatch(searchData(null))
    }
  }, [search]);

  return (
    <>
      <AutoComplete
        style={{
          width: 200,
        }}
        value={search}
        onSearch={(value) => setSearch(value)}
        placeholder="search using user ID or title"
      />
    </>
  );
};
export default SearchApp;
