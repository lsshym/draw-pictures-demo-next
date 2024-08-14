import React, { useState } from 'react';
import { Transfer, Button } from 'antd';

const TransferExample = () => {
  // 模拟数据源
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    key: i.toString(),
    title: `Item ${i + 1}`,
  }));

  // 存储已选中的key
  const [targetKeys, setTargetKeys] = useState([]);

  // 存储选中的key
  const [selectedKeys, setSelectedKeys] = useState([]);

  // 数据移动的处理函数
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  // 选中数据的处理函数
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div>
      <Transfer
        dataSource={mockData}
        titles={['源列表', '目标列表']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => item.title}
        pagination={{
          pageSize: 5,
        }}
      />
      <Button
        onClick={() => {
          console.log('Selected Items: ', targetKeys.map(key => mockData.find(item => item.key === key)));
        }}
        style={{ marginTop: 16 }}
      >
        打印选中的数据
      </Button>
    </div>
  );
};

export default TransferExample;
