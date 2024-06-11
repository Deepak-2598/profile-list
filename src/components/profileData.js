import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Col, Flex, Pagination } from "antd";
import SearchApp from "./search";
import { addData } from "../redux/common/commonSlice";
import axios from "axios";
import SelectUser from "./select";
import ListItem from "./listItem";
import InfiniteScroll from "react-infinite-scroll-component";
// import List from 'antd';

const samplePostApi = "https://jsonplaceholder.typicode.com/posts";

function ProfileData() {
  const dispatch = useDispatch();
  const profileDetail = useSelector((state) => state.common);
  // const [hasMore, setHasMore] = useState(true)
  const [count, setCount] = useState(0)
  const [data, setData] = useState()

  const getSetData = () =>  profileDetail.searchedData ?? profileDetail.selectedData ?? profileDetail.data ?? []

  const handelInfiniteScroll = () => {
    const tempData = getSetData().slice(count, count + 20)
    setData([...data, ...tempData])
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(samplePostApi);
      if (response?.data) {
        dispatch(addData(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (profileDetail) {
      const tempData = getSetData()
      setCount(0)
      setData(tempData.slice(0, 20))
    }
  } ,[profileDetail])

  useEffect(() => {
    if (data) {
      setCount(count + 20)
    }
  }, [data])

  return (
    <>
      <SearchApp />
      <SelectUser />
      <div style={{ marginTop: "5px" }}>
        {data && (
          <InfiniteScroll dataLength={data.length} next={handelInfiniteScroll} hasMore>
            <List
              dataSource={data}
              renderItem={(data) => (
                <List.Item>
                  <Flex gap={20}>
                    <div>{data?.id}</div>
                    <div>{data?.title}</div>
                  </Flex>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}

export default ProfileData;
