import React from "react";
import { Input, Button, Space, Table, Tag } from "antd";
import styled from "styled-components";

const BrowseSection = styled.section`
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  margin-top: 40px;
`;

function CsvPreview() {
  const columns = [
    {
      title: 'Names',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '0',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <h1>CSV TO JSON/CSV</h1>

      <BrowseSection>
        <Input
          size="large"
          placeholder="SPLIT,H_rid,Hrid_new,4"
          style={{width: 400}}
        />
        <Button
          size="large"
          type="primary"
        >
          Browse CSV Files
        </Button>
      </BrowseSection>

      <span>Original CSV Data</span>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        pagination={false}
      />

      <Footer>
        Author:
        {" "}
        <a
          href="http://swastikyadav.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Swastik Yadav
        </a>
      </Footer>
    </>
  );
}

export default CsvPreview;