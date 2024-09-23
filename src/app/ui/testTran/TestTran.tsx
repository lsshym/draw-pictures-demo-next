"use client";
import React, { useState } from "react";
import { Transfer, Button, Modal, Table } from "antd";
import "./TestTran.scss"; // 引入样式文件
import useGetState from "../useGetState";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const TransferExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [test, setTest] = useState(false);
  const [value, setValue, getValue] = useGetState(true);
  const handleAsync = async () => {
    await handleAsync1()
    console.log(0)

  };
  async function handleAsync1() {
    await console.log(1)
  }

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        打开 Modal
      </Button>
      <Modal
        title="翻转 Modal"
        open={isModalOpen}
        footer={null}
        className={`modal-transform ${test ? "flipped" : ""}`}
        onCancel={() => setIsModalOpen(false)} // 关闭 Modal 的控制
      >
        <div className="flipper">
          <div className="front">
            <Transfer
              dataSource={[
                {
                  key: "1",
                  title: "标题1",
                  description: "描述1",
                },
                {
                  key: "2",
                  title: "标题2",
                  description: "描述2",
                },
                {
                  key: "3",
                  title: "标题3",
                  description: "描述3",
                },
              ]}
              targetKeys={["1", "2"]}
              render={(item) => item.title}
            />
          </div>
          <div className="back">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
        <Button
          onClick={() => {
            setValue(!value)
            handleAsync()
            setTest(!test); // 通过切换状态触发翻转
          }}
        >
          翻转
        </Button>
      </Modal>
    </div>
  );
};

export default TransferExample;
