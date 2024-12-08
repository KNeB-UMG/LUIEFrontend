import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
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
  SettingOutlined,
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
  return (
    <Layout style={{ padding: '20px 50px' }}>
      <Content>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Ant Design Emoji Gallery
        </Title>
        {Object.entries(categories).map(([category, icons]) => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <Title level={4} style={{ marginBottom: '20px' }}>
              {category}
            </Title>
            <Row gutter={[16, 16]}>
              {icons.map((IconComponent, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                    <IconComponent />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Content>
    </Layout>
  );
}
