import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Spin } from 'antd';
import {
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
  StarOutlined,
  FireOutlined,
  RocketOutlined,
  CoffeeOutlined,
  CarOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  ShoppingOutlined,
  GiftOutlined,
  TrophyOutlined,
  WalletOutlined,
  CameraOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  SaveOutlined,
  BookOutlined,
  ReadOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
  CalendarOutlined,
  CalculatorOutlined,
  ToolOutlined,
  ScissorOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { NextStepModal } from '../components/steps/NextStepModal';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { UIViewProps } from '../uiConfig';
import { useNavigation } from '../components/navigation/NavigationContext';
import StandardSpin from '../components/spin/StandardSpin';

const { Content } = Layout;
const { Title } = Typography;

const categories = {
  Emotions: [
    SmileOutlined,
    MehOutlined,
    FrownOutlined,
    HeartOutlined,
    LikeOutlined,
    DislikeOutlined,
  ],
  Objects: [
    StarOutlined,
    FireOutlined,
    RocketOutlined,
    CoffeeOutlined,
    CarOutlined,
    CloudOutlined,
    ThunderboltOutlined,
    BulbOutlined,
  ],
  People: [
    UserOutlined,
    TeamOutlined,
    HomeOutlined,
    BellOutlined,
    ClockCircleOutlined,
    FlagOutlined,
  ],
  DailyLife: [
    ShoppingOutlined,
    GiftOutlined,
    TrophyOutlined,
    WalletOutlined,
    CameraOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    StopOutlined,
    SaveOutlined,
  ],
  Tools: [
    BookOutlined,
    ReadOutlined,
    LaptopOutlined,
    MobileOutlined,
    TabletOutlined,
    CalendarOutlined,
    CalculatorOutlined,
    ToolOutlined,
    ScissorOutlined,
  ],
  Security: [LockOutlined, UnlockOutlined],
};

export default function EmojiPage() {

  const [loading, setLoading] = useState<boolean[]>([true, true, true, true, true]);
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
        setLoading([false, false, false, false, false]);
      }
    }
  }, [currentStepData, isSidebar, toggleNavigation]);


  return (
    <>
      <NextStepModal ref={ref} />
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Ant Design Emoji Gallery
        <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Kliknij najładniejszą emotke
        </Title>
      </Title>
      {Object.entries(categories).map(([category, icons], index) => (
        <StandardSpin spinning={loading[index]} theme={theme}>
          <div key={category} style={{ marginBottom: '40px' }}>
            <Title level={4} style={{ marginBottom: '20px' }}>
              {category}
            </Title>
            <Row gutter={[16, 16]}>
              {icons.map((IconComponent, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                    <IconComponent onClick={open} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </StandardSpin>
      ))}
    </>
  );
}
