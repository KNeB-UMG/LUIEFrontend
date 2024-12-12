import React from 'react';
import { Card, Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ReactNode } from 'react'

type Props = {
    project: {
        title: string;
        image: string;
        content: string;
        author: string;
        date: string;
        button?: ReactNode
    }
}

export default function ProjectCard(props: Props) {
    return (
        <div>
            <Card title={props.project.title} bordered={true} style={{ height: "100%", width: '100%', margin: '10px' }}>
                <Row>
                    <Col lg={8} xs={24}>
                        <img
                            src={props.project.image}
                            alt="project"
                            style={{
                                padding: '10px',
                                maxWidth: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    </Col>
                    <Col lg={16} xs={24}>
                        <Paragraph>{props.project.content}</Paragraph>
                        <Paragraph>
                            <strong>Autor:</strong> {props.project.author}
                            {props.project.button}
                        </Paragraph>
                        <Paragraph>
                            <strong>Data:</strong> {props.project.date}
                        </Paragraph>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
