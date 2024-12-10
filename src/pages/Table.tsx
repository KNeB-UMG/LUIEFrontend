import React, { useEffect, useState } from 'react';
import { Tag, Checkbox, Row, Col, Typography, Table, Spin } from 'antd';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { UIViewProps } from '../uiConfig';
import { useNavigation } from '../components/navigation/NavigationContext';
import { NextStepModal } from '../components/steps/NextStepModal';

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

  const { open, ref } = useNextStepModal();

  const [loading, setLoading] = useState<boolean[]>([true]);

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
        const loadingDurations = loading.map(() => Math.random() * (8000 - 4000) + 4000);
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
        setLoading([false]);
      }
    }
  }, [currentStepData, isSidebar, toggleNavigation]);


  const [selectedKeys, setSelectedKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedKeys(selectedRowKeys);
      open
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
      render: (text: string) => (
        <Tag color={text === 'Dostępne' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    {
      title: 'Promocja',
      dataIndex: 'promotion',
      key: 'promotion',
      render: (text: string) =>
        text === 'Brak promocji' ? (
          <Tag color="default">{text}</Tag>
        ) : (
          <Tag color="blue">{text}</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: '20px 50px' }}>
      <NextStepModal ref={ref} />
      <Row>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Produkty w supermarkecie
            <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
              Zaznacz natańszy produkt
            </Title>
          </Title>
        </Col>
      </Row>
      <Spin spinning={loading[0]} tip="Loading...">
        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={products}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Spin>
    </div>
  );
}
