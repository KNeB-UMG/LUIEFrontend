import React, { useEffect, useRef, useState } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { UIViewProps } from '../uiConfig';
import { useNavigation } from '../components/navigation/NavigationContext';
import { NextStepModal } from '../components/steps/NextStepModal';

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
  const { open, ref } = useNextStepModal();
  const [loading, setLoading] = useState<boolean[]>([true]);
  const [tasks, setTasks] = useState(initialTasks);
  const [isAllDone, setIsAllDone] = useState(false);

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
        setLoading([false]);
      }
    }
  }, [currentStepData, isSidebar, toggleNavigation]);

  const containersRef = useRef([]);

  useEffect(() => {
    const drake = dragula(containersRef.current, {
      moves: () => true,
      accepts: () => true,
    });

    drake.on('drop', () => {
      const updatedTasks = { todo: [], inProgress: [], done: [] };
      containersRef.current.forEach((container, index) => {
        const section = Object.keys(updatedTasks)[index];
        updatedTasks[section] = Array.from(container.children).map((child) => {
          return (child as HTMLElement).textContent || '';
        });
      });
      

      setTasks(updatedTasks);
      drake.cancel(true); 
    });

    return () => drake.destroy();
  }, []);

  useEffect(() => {
    const totalTasks = Object.values(initialTasks).flat().length;
    const doneTasks = tasks.done.length;
    setIsAllDone(doneTasks === totalTasks);
  }, [tasks]);

  const addContainerRef = (ref:any) => {
    if (ref && !containersRef.current.includes(ref)) {
      containersRef.current.push(ref);
    }
  };

  const renderTasks = (tasks:any) =>
    tasks.map((task:any, index:any) => (
      <Card key={index} style={{ marginBottom: '8px' }}>
        {task}
      </Card>
    ));

  return (
    <>
      <NextStepModal ref={ref} />
      <Content style={{ padding: '20px 50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          To-Do Lista Studenta
          <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Zakończ wszystkie zadania i kliknij przycisk
          </Title>
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
              {renderTasks(tasks.todo)}
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
              {renderTasks(tasks.inProgress)}
            </div>
          </Col>
          <Col span={8}>
            {isAllDone && (
              <Button onClick={open} type="primary">
                Wszystko zrobione !!!
              </Button>
            )}
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
              {renderTasks(tasks.done)}
            </div>
          </Col>
        </Row>
      </Content>
    </>
  );
}