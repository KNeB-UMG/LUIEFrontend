import { Card, Col, Pagination, Row } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph';
import React, { ReactNode, useState } from 'react'

type Props = {
    posts:{
        title:string;
        content:string;
        author:string;
        date:string;
        button?:ReactNode
    }[]
}
export default function Poster(props: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
  
    const currentPosts = props.posts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  
    return (
      <div style={{marginBottom:"10px"}}>
        <Row gutter={[16, 16]}>
          {currentPosts.map((post, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <Card title={post.title} bordered={true} style={{ height: "100%" }}>
                <Paragraph>{post.content}</Paragraph>
                <Paragraph>
                  <strong>Autor:</strong> {post.author} 
                  {post.button}
                </Paragraph>
                <Paragraph>
                  <strong>Data:</strong> {post.date}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          style={{ textAlign: "center", marginTop: "20px" }}
          current={currentPage}
          total={props.posts.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  }
  
