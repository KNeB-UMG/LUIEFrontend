import React from 'react'; 
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table } from 'antd'
import Title from 'antd/es/typography/Title';

export default function Dashboard() {
  const dataSource = [
    { key: '1', name: 'John Doe', age: 32, address: 'New York' },
    { key: '2', name: 'Jane Smith', age: 28, address: 'London' },
    { key: '3', name: 'Sam Green', age: 45, address: 'Sydney' },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Dashboard
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={1128} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Sessions" value={93} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Server Load" value={75} suffix="%" />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="User Data">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
