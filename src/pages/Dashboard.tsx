import React, { useEffect, useState } from 'react'; 
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table, Spin, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigation } from '../components/navigation/NavigationContext';
import { UIViewProps } from '../uiConfig';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { NextStepModal } from '../components/steps/NextStepModal';

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean[]>([true, true, true, true]);
  const { open, ref } = useNextStepModal();

  const currentStepData: UIViewProps | null = JSON.parse(localStorage.getItem('currentStep') || 'null');

  const { isSidebar, toggleNavigation } = useNavigation();

  useEffect(() => {
    if (currentStepData) {
      if (
        (isSidebar && currentStepData.nav === 'navbar') || 
        (!isSidebar && currentStepData.nav === 'sidebar')
      ) {
        toggleNavigation();
      }

      if (currentStepData.laggs) {
        const loadingDurations = loading.map(() => Math.random() * (6000 - 4000) + 4000);
        const timeouts: NodeJS.Timeout[] = [];

        loadingDurations.forEach((duration, index) => {
          const timeoutId = setTimeout(() => {
            setLoading((prev) => {
              const newLoading = [...prev];
              newLoading[index] = false;
              return newLoading;
            });
          }, duration);
          timeouts.push(timeoutId);
        });

        return () => {
          timeouts.forEach(clearTimeout);
        };
      } else {
        setLoading([false, false, false, false]);
      }
    }
  }, [currentStepData, isSidebar, toggleNavigation]);

  const dataSource = [
    { key: '1', name: 'John Doe', age: 32, address: 'New York', action: <Button type='primary'>Wybierz</Button> },
    { key: '2', name: 'Jane Smith', age: 28, address: 'London', action: <Button onClick={open} type='primary'>Wybierz</Button>},
    { key: '3', name: 'Sam Green', age: 45, address: 'Sydney', action: <Button type='primary'>Wybierz</Button>},
  ];

  const columns = [
    { title: 'Imię i Nazwisko', dataIndex: 'name', key: 'name' },
    { title: 'Wiek', dataIndex: 'age', key: 'age' },
    { title: 'Adres', dataIndex: 'address', key: 'address' },
    { title: '', dataIndex: 'action', key: 'action' },
  ];

  return (
    <>
    <NextStepModal ref={ref} />
      <Row>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Dashboard
          </Title>
          <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Wybierz osobę z nazwiskiem "Kowalski"
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Spin spinning={loading[0]} tip="Loading...">
            <Card>
              <Statistic title="Total Users" value={1128} prefix={<UserOutlined />} />
            </Card>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading[1]} tip="Loading...">
            <Card>
              <Statistic title="Active Sessions" value={93} />
            </Card>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading[2]} tip="Loading...">
            <Card>
              <Statistic title="Server Load" value={75} suffix="%" />
            </Card>
          </Spin>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Spin spinning={loading[3]} tip="Loading...">
            <Card title="User Data">
              <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Card>
          </Spin>
        </Col>
      </Row>
    </>
  );
}
