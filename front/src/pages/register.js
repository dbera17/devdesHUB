import React from 'react';
import { Layout as AntLayout, Button, Input, Form, Row, Col, Typography } from 'antd';

export const Register = () => {
  return (
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            <Form layout="vertical" style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
              <Form.Item><Typography.Title level={2}>რეგისტრაცია</Typography.Title></Form.Item>
              <Form.Item label="ელ-ფოსტა" name="email" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item label="პაროლი" name="password" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ პაროლი' }]}>
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit" className="dark-button" block>რეგისტრაცია</Button>
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  <p>
                    <span>რეგისტრაციაზე დაკლიკვით თქვენ შექმნით თქვენს ანგარიშს და ეთანხმებით </span>
                    <a href="/login">
                      <Button style={{ padding: 0, fontWeight: 'bold' }} type="a">წესებს და პირობებს</Button>
                    </a>
                  </p>
                </Typography.Text>
                <Typography.Text>
                  <p>
                    <span>გაქვს ანგარიში? </span>
                    <a href="/login">
                      <Button style={{ padding: 0, fontWeight: 'bold' }} type="a">ავტორიზაცია</Button>
                    </a>
                  </p>
                </Typography.Text>
                <a href="/forget-password">
                  <Button style={{ padding: 0, fontWeight: 'bold' }} type="a">დაგავიწყდა პაროლი?</Button>
                </a>
              </Form.Item>
            </Form> 
          </Col>
          <Col span={0} md={12}>
            <div className="side-image register-image"></div>
          </Col>
        </Row>
      </AntLayout.Content>
  )
}

export default Register;