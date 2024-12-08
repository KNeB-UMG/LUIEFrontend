import React, { useEffect, useRef } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import { Card, Col, Layout, Row, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const initialTasks = {
  todo: [
    'Zrobić notatki z wykładu',
    'Kupić jedzenie do akademika',
    'Napisać projekt na zajęcia',
  ],
  inProgress: [
    'Uczyć się na kolokwium',
  ],
  done: [
    'Oddać pracę domową',
  ],
};

export default function TodoListWithDragula() {
  const containersRef = useRef([]);

  useEffect(() => {
    dragula(containersRef.current);
  }, []);

  const addContainerRef = (ref:any) => {
    if (ref && !containersRef.current.includes(ref)) {
      containersRef.current.push(ref);
    }
  };

  const renderTasks = (tasks:string[]) =>
    tasks.map((task, index) => (
      <Card key={index} style={{ marginBottom: '8px' }}>
        {task}
      </Card>
    ));

  return (
    <Content style={{ padding: '20px 50px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        To-Do Lista Studenta
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4}>Do zrobienia</Title>
          <div
            ref={addContainerRef}
            style={{
              border: '#f5f5f5 3px solid',
              padding: '10px',
              borderRadius: '8px',
              minHeight: '400px',
            }}
          >
            {renderTasks(initialTasks.todo)}
          </div>
        </Col>
        <Col span={8}>
          <Title level={4}>W trakcie</Title>
          <div
            ref={addContainerRef}
            style={{
              border: '#f5f5f5 3px solid',
              padding: '10px',
              borderRadius: '8px',
              minHeight: '400px',
            }}
          >
            {renderTasks(initialTasks.inProgress)}
          </div>
        </Col>
        <Col span={8}>
          <Title level={4}>Skończone</Title>
          <div
            ref={addContainerRef}
            style={{
              border: '#f5f5f5 3px solid',
              padding: '10px',
              borderRadius: '8px',
              minHeight: '400px',
            }}
          >
            {renderTasks(initialTasks.done)}
          </div>
        </Col>
      </Row>
    </Content>
  );
}