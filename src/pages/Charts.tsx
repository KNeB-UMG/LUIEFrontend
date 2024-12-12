import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from '@ant-design/charts';
import { Button, Col, Layout, Row, Spin, Typography } from 'antd';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { useNavigation } from '../components/navigation/NavigationContext';
import { UIViewProps } from '../uiConfig';
import { NextStepModal } from '../components/steps/NextStepModal';
import StandardSpin from '../components/spin/StandardSpin';
import { themes } from '../theme';

const { Content } = Layout;
const { Title } = Typography;

export default function Charts() {

  const [loading, setLoading] = useState<boolean[]>([true, true, true, true]);
  const { open, ref } = useNextStepModal();

  const currentStepData: UIViewProps | null = JSON.parse(localStorage.getItem('currentStep') || 'null');

  const { isSidebar, toggleNavigation, theme } = useNavigation();

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


  const lineData = [
    { month: 'Jan', value: 35 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 60 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 75 },
    { month: 'Jul', value: 85 },
    { month: 'Aug', value: 70 },
    { month: 'Sep', value: 60 },
    { month: 'Oct', value: 65 },
    { month: 'Nov', value: 55 },
    { month: 'Dec', value: 45 },
  ];

  const pieData1 = [
    { type: 'Toyota', value: 30 },
    { type: 'Volkswagen', value: 25 },
    { type: 'Hyundai', value: 20 },
    { type: 'Ford', value: 15 },
    { type: 'Tesla', value: 10 },
  ];

  const barData = [
    { type: 'Toyota Corolla', value: 180 },
    { type: 'Volkswagen Golf', value: 150 },
    { type: 'Ford F-150', value: 140 },
    { type: 'Honda Civic', value: 120 },
    { type: 'Tesla Model Y', value: 110 },
  ];

  const pieData2 = [
    { type: 'Europa', value: 400 },
    { type: 'Ameryka Północna', value: 350 },
    { type: 'Azja', value: 450 },
    { type: 'Ameryka Południowa', value: 150 },
    { type: 'Afryka', value: 100 },
  ];

  return (
    <>
      <NextStepModal ref={ref} />
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Wykresy
          <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Kliknij przycisk przy jednym z wykresów
          </Title>
        </Title>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <StandardSpin spinning={loading[0]} theme={theme} >
              <h2>Roczna sprzedaż samochodów</h2>
              <Line data={lineData} xField="month" yField="value" autoFit height={400} />
            </StandardSpin>
          </Col>
          <Col lg={12} xs={24}>
            <StandardSpin spinning={loading[1]} theme={theme}>
              <h2>Udział marek samochodowych na rynku</h2>
              <Pie data={pieData1} angleField="value" colorField="type" autoFit height={400} />
            </StandardSpin>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <StandardSpin spinning={loading[2]} theme={theme}>
              <h2>Najczęściej wybierane modele</h2>
              <Bar data={barData} xField="type" yField="value" autoFit height={400} />
            </StandardSpin>
          </Col>
          <Col lg={12} xs={24}>
            <StandardSpin spinning={loading[3]} theme={theme}>
              <h2>Sprzedaż w regionach</h2>
              <Pie data={pieData2} angleField="value" colorField="type" autoFit height={400} />
              <Button onClick={open} type='primary'>Kliknij mnie</Button>
            </StandardSpin>
          </Col>
        </Row>
    </>
  );
}