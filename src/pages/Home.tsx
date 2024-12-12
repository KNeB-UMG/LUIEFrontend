import React, { useState } from 'react';
import { Alert, Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { uiConfigs } from '../uiConfig';

const { Title, Paragraph } = Typography;
const { Option } = Select;

type FormProps = {
  email: string;
  age: number;
  loe: number;
  gender: number;
}

export type CreateEntryProps = {
  status: string;
  currentStep: string;
  token: string
}

export const apiUrl = 'https://luiebackend.raidvm.com/api';

export default function Home() {
  const [error, setError] = useState<any>()
  const navigate = useNavigate()

  const onFinish = (values: FormProps) => {
    fetch(`${apiUrl}/createentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data: CreateEntryProps) => {
        if (data.status === 'succesfully created entry' || data.status === 'succesfully renewed session') {
          localStorage.setItem('token', data.token);

          const currentStepConfig = uiConfigs[data.currentStep];
          if (currentStepConfig) {
            localStorage.setItem('currentStep', JSON.stringify({step:data.currentStep, ...currentStepConfig}));
          }

          if (currentStepConfig?.link) {
            navigate(`/${currentStepConfig.link}`);
          }
        }
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania danych:', error);
        setError(error)
      });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '10px' }}>
            Badanie KNeB UI/UX Experience
          </Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: '30px', marginLeft: 'auto', marginRight: 'auto' }}>
            Celem niniejszej strony jest zebranie danych na temat odczuć użytkowników wobec
            projektowania interfejsów graficznych. Wyniki tego badania pozwolą na lepsze
            zrozumienie wpływu wybranych elementów wizualnych na odbiór stron internetowych.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={12}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <Row>
              <Col lg={24} xs={24}>
                <Form.Item
                  label="Adres Email"
                  name="email"
                  rules={[{ required: true, message: 'Proszę podać poprawny email' }]}
                >
                  <Input type="email" placeholder="Podaj swój email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label="Płeć"
                  name="gender"
                  rules={[{ required: true, message: 'Wybierz jedną z opcji' }]}
                >
                  <Select placeholder="Wybierz płeć">
                    <Option value={0}>Wolę nie podawać</Option>
                    <Option value={1}>Kobieta</Option>
                    <Option value={2}>Mężczyzna</Option>
                    <Option value={3}>Inne</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label="Wiek"
                  name="age"
                  rules={[{ required: true, message: 'Proszę podać swój wiek' }]}
                >
                  <Input type="number" placeholder="Podaj swój wiek" min={0} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={24} xs={24}>
                <Form.Item
                  label="Poziom wykształcenia"
                  name="loe"
                  rules={[{ required: true, message: 'Proszę wybrać poziom wykształcenia' }]}
                >
                  <Select placeholder="Wybierz poziom wykształcenia">
                    <Option value={0}>Wolę nie podawać</Option>
                    <Option value={1}>Podstawowe</Option>
                    <Option value={2}>Zasadnicze zawodowe</Option>
                    <Option value={3}>Średnie</Option>
                    <Option value={4}>Wyższe</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
              <Button type="primary" htmlType="submit">
                Zacznij Test
              </Button>
            </Form.Item>

            {error && (
              <Alert
                message="Wystąpił błąd"
                description={error}
                type="error"
                closable
                onClose={() => setError(null)}
              />
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}
