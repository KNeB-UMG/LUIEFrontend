import React, { useState } from 'react';
import { Tag, Checkbox, Row, Col, Typography, Table } from 'antd';

const { Title } = Typography;

const products = [
  {
    key: '1',
    name: 'Jabłka',
    price: '3.50 zł/kg',
    availability: 'Dostępne',
    promotion: '10% taniej',
  },
  {
    key: '2',
    name: 'Chleb',
    price: '4.20 zł/szt.',
    availability: 'Dostępne',
    promotion: 'Brak promocji',
  },
  {
    key: '3',
    name: 'Masło',
    price: '7.50 zł/200g',
    availability: 'Niedostępne',
    promotion: '5% taniej',
  },
  {
    key: '4',
    name: 'Mleko',
    price: '2.90 zł/l',
    availability: 'Dostępne',
    promotion: 'Kup 3, zapłać za 2',
  },
  {
    key: '5',
    name: 'Banany',
    price: '5.20 zł/kg',
    availability: 'Dostępne',
    promotion: 'Brak promocji',
  },
];

export default function ProductTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys:any) => {
      setSelectedKeys(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'Produkt',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cena',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Dostępność',
      dataIndex: 'availability',
      key: 'availability',
      render: (text:string) => (
        <Tag color={text === 'Dostępne' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    {
      title: 'Promocja',
      dataIndex: 'promotion',
      key: 'promotion',
      render: (text:string) =>
        text === 'Brak promocji' ? (
          <Tag color="default">{text}</Tag>
        ) : (
          <Tag color="blue">{text}</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: '20px 50px' }}>
      <Row>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Produkty w supermarkecie
          </Title>
        </Col>
      </Row>
      <Table
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}
