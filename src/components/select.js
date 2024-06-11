import { Select } from "antd";
import { useEffect } from "react";
import { getUser } from "../redux/common/userSilce";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { filterData, searchData } from "../redux/common/commonSlice";

const samplePostApi = "https://jsonplaceholder.typicode.com/users";

const SelectUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data)

  const fetchUser = async () => {
    try {
      const response = await axios.get(samplePostApi);
      if (response?.data) {
        dispatch(getUser(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (value) => {
    dispatch(filterData(value))
  }

  const handleOnClear = () => {
    dispatch(filterData(null))
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Select
      onSelect={handleOnChange}
      onClear={handleOnClear}
      placeholder="Select User"
      style={{ width: "20%", marginLeft: "20px" }}
      allowClear
      options={user.map((data) => ({
        value: data.id,
        label: data.username,
      }))}
    />
  );
};

export default SelectUser;
