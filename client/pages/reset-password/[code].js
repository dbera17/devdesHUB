import { Layout as AntLayout, Button, Input, Form, message, Row, Col, Typography } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';


function Register({ }) {
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const { code } = router.query;
  console.log(code);
  function onFormFinish(values) {
    console.log('aaaa');
  }
  return (
    <Layout>
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            <Form layout="vertical" onFinish={onFormFinish} style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
              <Form.Item><Typography.Title level={2}>პაროლის აღდგენა</Typography.Title></Form.Item>
              <Form.Item label="ახალი პაროლი" name="password" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ პაროლი' }]}>
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item label="დაადასტურეთ პაროლი" name="passwordConfirmation" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ პაროლი' }]}>
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                <Button size="large" loading={isSending} type="primary" htmlType="submit" className="dark-button" block>პაროლის შეცვლა</Button>
              </Form.Item>
              <Form.Item>
                <Link href="/login">
                  <Button style={{ padding: 0, fontWeight: 'bold' }} type="link">ავტორიზაცია</Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
          <Col span={0} md={12}>
            <div className="side-image reset-image"></div>
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  )
}

export default Register;