import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Finish() {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/')
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={2}>Dziękujemy za wykonanie testu</Title>
            <Title level={3}>KNeB UI/UX Experience</Title>
            <Paragraph style={{ marginTop: '20px' }}>
                Twoje odpowiedzi są dla nas bardzo ważne i pomogą nam udoskonalić nasze produkty. 😊
            </Paragraph>
            <Button type="primary" size="large" style={{ marginTop: '30px' }} onClick={handleHomeRedirect}>
                Wróć do strony głównej
            </Button>
        </div>
    );
}