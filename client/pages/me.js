import { useEffect, useState } from 'react';
import { Layout as AntLayout, Spin, Button, Tabs, Space, Row, Col, Form, Input, Divider, Popconfirm } from 'antd';
import Layout from '../components/Layout';
import Router from 'next/router';


function Me() {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsChecking(false)
        }, 1000);
    }, []);

    function onLogout() {
        // TODO JWT
        Router.replace('/');
    }

    return (
        <Layout>
            <AntLayout.Content style={{ paddingBottom: 36 }}>
                {isChecking ? (
                    <Space direction="vertical" align="center" style={{ width: '100%' }}><Spin /></Space>
                ) : (
                    <Tabs size="large" tabBarStyle={{ marginBottom: 48 }} tabBarExtraContent={{
                        right: <Button onClick={onLogout} style={{ marginLeft: 8 }}>გასვლა</Button>
                    }}>
                        <Tabs.TabPane tab="ჩემი რეზუმე" key="application">
                            {/* TODO */}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="პროფილის ცვლილება" key="profile">
                            <Profile></Profile>
                        </Tabs.TabPane>
                    </Tabs>
                )}
            </AntLayout.Content>
        </Layout>
    )
}

function Profile() {
    const [isDestroying, setisDestroying] = useState(false);

    useEffect(() => {
        setisDestroying(true)
        setTimeout(() => {
            setisDestroying(false)
        }, 2000);
    }, []);

    return (
        <Row gutter={[16, 16]}>
            <Col span={24} md={12}>
                <Form layout="vertical" style={{ maxWidth: 380, margin: '0 auto' }} requiredMark={false}>
                    <Form.Item label="ელ-ფოსტა" name="email" rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა' }]}>
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="ახალი პაროლი" name="password">
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item label="დაადასტურეთ პაროლი" name="passwordConfirmation" dependencies={['password']}>
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" className="dark-button" block>შეცვლა</Button>
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <Popconfirm title="ნამდვილად გსურთ პროფილის დეაქტივაცია?" okText="კი" cancelText="არა" cancelButtonProps={{ size: 'large' }} okButtonProps={{ size: 'large' }}>
                            <Button loading={isDestroying} size="large" danger type="primary" htmlType="submit" block>დეაქტივაცია</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={0} md={12}>
                <div className="side-image login-image"></div>
            </Col>
        </Row>
    )
}

export default Me;