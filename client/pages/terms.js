import { Layout as AntLayout, Button, Input, Form, Row, Col, Typography, Space } from 'antd';
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
    console.log(valies);
  }

  return (
    <Layout>
      <AntLayout.Content style={{ paddingBottom: 36 }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col span={24} md={12}>
            TODO TERMS
          </Col>
          <Col span={0} md={12}>
            SAME HERE
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  )
}

export default Register;