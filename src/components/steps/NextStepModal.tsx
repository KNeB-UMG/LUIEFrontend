import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { Modal, Form, Radio, Button, Alert } from 'antd';
import Title from 'antd/es/typography/Title';
import { apiUrl } from '../../pages/Home';
import { useNavigate } from 'react-router-dom';
import { uiConfigs, UIViewProps } from '../../uiConfig';
import { jwtDecode } from 'jwt-decode';

type NextStepModalRef = {
    open: () => void;
    close: () => void;
};

type NextStepModalProps = {
    children?: React.ReactNode;
};

type SendEvaluationProps = Record<string, any>;

type FormProps = {
    grade1: number;
    grade2: number;
    grade3: number;
};

export const NextStepModal = forwardRef<NextStepModalRef, NextStepModalProps>(({ }, ref) => {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStepData: UIViewProps | null = JSON.parse(localStorage.getItem('currentStep') || 'null');

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));

    const [form] = Form.useForm();

    const getUserIdFromToken = (): string | null => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded: any = jwtDecode(token);
                return decoded?.user_id || null;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
        return null;
    };

    const onFinish = async (values: FormProps) => {
        const userId = getUserIdFromToken();
        if (!userId) {
            console.error('User ID not found in token');
            return;
        }

        const finalValues = {
            userId,
            interfaceName: currentStepData?.step,
            ...values,
        };

        setIsSubmitting(true);

        try {
            const response = await fetch(`${apiUrl}/sendevaluation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalValues),
            });

            const data: SendEvaluationProps = await response.json();
            if(data.status && data.status === 'test completed'){
                navigate(`/finish`);
            }
            if (data.status && !data.status.includes('invalid')) {
                const currentStepConfig = uiConfigs[data.status];
                if (currentStepConfig) {
                  localStorage.setItem('currentStep', JSON.stringify({step:data.status, ...currentStepConfig}));
                }
                navigate(`/${currentStepConfig.link}`);
            }
            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Error sending data:', error);
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormIncomplete = () => {
        const values = form.getFieldsValue();
        return !(values.grade1 && values.grade2 && values.grade3);
    };

    return (
        <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                Oceń stronę
            </Title>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="grade1"
                    label="Jak oceniasz wygląd strony (1 - podoba mi się, 5 - nie podoba mi się)"
                    rules={[{ required: true, message: 'Proszę wybrać ocenę' }]}
                >
                    <Radio.Group>
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                        <Radio value={5}>5</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="grade2"
                    label="Jak oceniasz kolorystykę (1 - podoba mi się, 5 - nie podoba mi się)"
                    rules={[{ required: true, message: 'Proszę wybrać ocenę' }]}
                >
                    <Radio.Group>
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                        <Radio value={5}>5</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="grade3"
                    label="Jak oceniasz jej przejrzystość (1 - podoba mi się, 5 - nie podoba mi się)"
                    rules={[{ required: true, message: 'Proszę wybrać ocenę' }]}
                >
                    <Radio.Group>
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                        <Radio value={5}>5</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isFormIncomplete()}
                        loading={isSubmitting}
                    >
                        Wyślij
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
        </Modal>
    );
});
