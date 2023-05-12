import { FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Button, Input, Form, message, Row, Col, Typography, Divider, Space } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Layout from '@/components/Layout';

function Register({ }) {
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      Router.replace('/me');
    }
  }, []);
  useEffect(() => {
    if (router.query?.confirm) {
      message.success('ელ-ფოსტა წარმატებით დადასტურდა');
    }
  }, [router.query?.confirm])
  function onFormFinish(values) {
    setIsLogging(true);
    }
  return (
    <Layout>
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            <Form layout="vertical" onFinish={onFormFinish} style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
              <Form.Item><Typography.Title level={2}>ავტორიზაცია</Typography.Title></Form.Item>
              <Space size={16} style={{width: '100%', justifyContent: 'center'}} align="center">
                <Button href="https://mystrapi.ge/connect/github"
                  className="dark-button social-button" shape="circle" size="large" icon={<GithubOutlined />} />
                <Button href="https://mystrapi.ge/connect/google"
                  className="dark-button social-button" shape="circle" size="large" icon={<GoogleOutlined />}/>
                <Button href="https://mystrapi.ge/connect/facebook"
                  className="dark-button social-button" shape="circle" size="large" icon={<FacebookOutlined />}/>
              </Space>
              <Divider plain>ან</Divider>
              <Form.Item label="ელ-ფოსტა" name="identifier" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item label="პაროლი" name="password" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ პაროლი' }]}>
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                <Button size="large" loading={isLogging} type="primary" htmlType="submit" className="dark-button" block>ავტორიზაცია</Button>
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  <span>არ გაქვს ანგარიში? </span>
                  <Link href="/register">
                    <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">რეგისტრაცია</Button>
                  </Link></Typography.Text>
                <Link href="/forget-password">
                  <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">დაგავიწყდა პაროლი?</Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
          <Col span={0} md={12}>
            <div className="side-image login-image"></div>
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  )
}

export default Register;