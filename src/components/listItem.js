import React, { useEffect, useState } from "react";
import { Avatar, List, message, Flex } from "antd";
import VirtualList from "rc-virtual-list";
import { useDispatch } from "react-redux";
import { addData } from "../redux/common/commonSlice";

const fakeDataUrl = "https://jsonplaceholder.typicode.com/posts";
const ContainerHeight = window.innerHeight - 50;
const ListItem = ({data}) => {
  const dispatch = useDispatch();
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        if (body?.data) {
            dispatch(addData(body.data));
          }
        // setData(data.concat(body.results));
        // message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="userPost"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item?.id}>
            <Flex gap={20}>
              <div>{item?.id}</div>
              <div>{item?.title}</div>
            </Flex>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default ListItem;
