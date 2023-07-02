import { Layout as AntLayout, Button, Input, Form, message, Row, Col, Typography } from 'antd';
import Axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';


function ForgetPassword({ }) {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  function onFormFinish(values) {
    setIsSending(true);
    Axios.post('http://localhost:1337/auth/forgot-password', values)
      .then(({ data }) => {
        setIsSending(false);
        setIsSuccess(true);
      }).catch(({ response }) => {
        setIsSending(false);
        message.error(response.data.message[0].messages[0].message);
      })
  }
  return (
    <Layout>
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            <Form layout="vertical" onFinish={onFormFinish} style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
              <Form.Item><Typography.Title level={2}>პაროლის აღდგენა</Typography.Title></Form.Item>
              {isSuccess ?
                <Form.Item><Typography.Title level={5}>პაროლის აღდგენის ინსტრუქცია გაგზავნილია თქვენს ელ-ფოსტაზე</Typography.Title></Form.Item>
                :
                <>
                  <Form.Item label="ელ-ფოსტა" name="email" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' }]}>
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button size="large" loading={isSending} type="primary" htmlType="submit" className="dark-button" block>გაგზავნა</Button>
                  </Form.Item>
                </>}
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

export default ForgetPassword;