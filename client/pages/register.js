import { Layout as AntLayout, Button, Input, Form, message, Row, Col, Typography, Space } from 'antd';
import Axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';


function Register({ }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      Router.replace('/me');
    }
  }, []);
  function onFormFinish(values) {
    setIsRegistering(true);
    values.username = values.email;
    Axios.post('http://localhost:1337/auth/local/register', values)
      .then(({ data }) => {
        setIsRegistering(false);
        setIsSuccess(true);
      }).catch(({ response }) => {
        setIsRegistering(false);
        message.error(response?.data?.message[0]?.messages[0]?.message ?? 'შეცდომა რეგისტრაციისას');
      })
  }
  return (
    <Layout>
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            {!isSuccess ? <Form layout="vertical" onFinish={onFormFinish} style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
              <Form.Item><Typography.Title level={2}>რეგისტრაცია</Typography.Title></Form.Item>
              <Form.Item label="ელ-ფოსტა" name="email" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item label="პაროლი" name="password" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ პაროლი' }]}>
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                <Button size="large" loading={isRegistering} type="primary" htmlType="submit" className="dark-button" block>რეგისტრაცია</Button>
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  <p>
                    <span>რეგისტრაციაზე დაკლიკვით თქვენ შექმნით თქვენს ანგარიშს და ეთანხმებით </span>
                    <Link href="/terms">
                      <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">წესებს და პირობებს</Button>
                    </Link>
                  </p>
                </Typography.Text>
                <Typography.Text>
                  <p>
                    <span>გაქვს ანგარიში? </span>
                    <Link href="/login">
                      <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">ავტორიზაცია</Button>
                    </Link>
                  </p>
                </Typography.Text>
                <Link href="/forget-password">
                  <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">დაგავიწყდა პაროლი?</Button>
                </Link>
              </Form.Item>
            </Form> :
              <>
                <Space direction="vertical" style={{ display: 'flex', maxWidth: 380, margin: '0 auto' }}>
                  <Typography.Title level={2}>წარმატებით დარეგისტრირდი</Typography.Title>
                  <Typography.Text>დასადასტურებეი შეტყობინება გამოგზავნილია ელ-ფოსტაზე</Typography.Text>
                  <Link href="/login">
                    <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">ავტორიზაცია</Button>
                  </Link>
                </Space>
              </>
            }
          </Col>
          <Col span={0} md={12}>
            <div className="side-image register-image"></div>
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  )
}

export default Register;