import { useEffect, useState } from 'react';
import { Layout as AntLayout, Spin, Button, Tabs, Affix, Space, Row, Col, Form, Input, Divider, Popconfirm, Typography, Upload, Select } from 'antd';
import Layout from '../components/Layout';
import Router from 'next/router';
import SingleUser from '../components/SingleUser'
import { PlusOutlined } from '@ant-design/icons';

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
              <ApplicationForm />
            </Tabs.TabPane>
            <Tabs.TabPane tab="პროფილის ცვლილება" key="profile">
              <Profile />
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

function ApplicationForm() {
  const [isChecking, setIsChecking] = useState(true);
  const [antFormData, setAntFormData] = useState({});
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setIsChecking(false)
    }, 2000);
  }, []);

  return (
    <>
      {isChecking ? (
        <Space direction="vertical" align="center" style={{ width: '100%' }}><Spin /></Space>
      ) : (
        <Row gutter={16}>
          <Col span={24} md={12}>
            <Form form={form} requiredMark={false} layout="vertical">
              <Form.Item hidden name="id">
                <Input size="large" />
              </Form.Item>
              <Typography.Title level={4}>პირადი ინფორმაცია
                {antFormData.hasOwnProperty('published') ? (
                  <Badge status={antFormData.published ? 'success' : 'warning'} text={antFormData.published ? 'აქტიური' : 'მუშავდება'} style={{ marginLeft: 8 }} />
                ) : null}</Typography.Title>
              <Form.Item name="avatar" rules={[{ required: true, message: 'გთხოვთ აირჩიოთ პროფილის სურათი' }]}>
                <Space align="start">
                  <Upload
                    accept="image/png;image/jpg;image/jpeg"
                    className="avatar-uploader"
                    listType="picture-card"
                    showUploadList={false}>
                    <>
                      {file || antFormData.avatar ? <img src="https://picsum.photos/500" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <PlusOutlined />}
                    </>
                  </Upload>
                  <Space direction="vertical">
                    <Typography.Text strong>
                      <span>პროფილის ფოტო </span>
                    </Typography.Text>
                    <Typography.Text>სასურველია ჰქონდეს 990x870 გაფართოება</Typography.Text>
                    <Typography.Text>ფორმატი: PNG,JPG</Typography.Text>
                  </Space>
                </Space>
              </Form.Item>
              <Form.Item>
                <Row gutter={16}>
                  <Col span={24} md={12}>
                    <Form.Item
                      label="სახელი და გვარი"
                      name="Fullname" style={{ margin: 0 }}
                      rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სახელი და გვარი' }]}>
                      <Input size="large" />
                    </Form.Item></Col>
                  <Col span={24} md={12}>
                    <Form.Item
                      label="სამუშაო ქალაქი"
                      name="Location" style={{ margin: 0 }}
                      rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სამუშაო ქალაქი' }]}>
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Typography.Title level={4}>სამუშაო გამოცდილება</Typography.Title>
              <Form.Item>
                <Row gutter={16}>
                  <Col span={24} md={8}>
                    <Form.Item style={{ margin: 0 }}
                      label="გამოცდილება"
                      name="experience"
                      rules={[{ required: true, message: 'გთხოვთ აირჩიოთ გამოცდილება' }]}>
                      <Select size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={8}>
                    <Form.Item style={{ margin: 0 }}
                      label="მიმართულება"
                      name="direction"
                      rules={[{ required: true, message: 'გთხოვთ აირჩიოთ მიმართულება' }]}>
                      <Select size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={8}>
                    <Form.Item
                      label="სამუშაო მდგომარეობა"
                      name="employment_status" style={{ margin: 0 }}
                      rules={[{ required: true, message: 'გთხოვთ აირჩიოთ სამუშაო მდგომარეობა' }]}>
                      <Select size="large" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                label="კარიერის დახასიათება"
                name="Summary"
                extra="მაქსიმუმ 130 სიმბოლო"
                rules={[
                  { required: true, message: 'გთხოვთ შეიყვანოთ კარიერის დახასიათება' },
                  { max: 130, message: 'მაქსიმუმ 130 სიმბოლო' }
                ]}>
                <Input.TextArea rows={4} maxLength={130} />
              </Form.Item>
              <Form.Item
                label="შესაძლებლობები"
                name="skills"
                extra="შეგიძლია სურვილისამებრ დაამატო შესაძლებლობები"
                rules={[{ required: true, message: 'გთხოვთ აირჩიოთ შესაძლებლობები' }]}>
                <Select size="large" mode="tags">
                  <Select.Option value="javascript">javascript</Select.Option>
                  <Select.Option value="html">html</Select.Option>
                  <Select.Option value="css">css</Select.Option>
                  <Select.Option value="git">git</Select.Option>
                  <Select.Option value="python">python</Select.Option>
                  <Select.Option value="java">java</Select.Option>
                  <Select.Option value="php">php</Select.Option>
                  <Select.Option value="nodejs">nodejs</Select.Option>
                  <Select.Option value="swift">swift</Select.Option>
                  <Select.Option value="kotlin">kotlin</Select.Option>
                  <Select.Option value="sql">sql</Select.Option>
                  <Select.Option value="mongodb">mongodb</Select.Option>
                  <Select.Option value="mysql">mysql</Select.Option>
                  <Select.Option value="react">react</Select.Option>
                  <Select.Option value="vue">vue</Select.Option>
                  <Select.Option value="angular">angular</Select.Option>
                  <Select.Option value="C#.NET">C#.NET</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="სოციალური ქსელის ბმული"
                extra="ვებსაიტის ტიპი შეიძლება იყოს Facebook, Linkedin, Twitter ან Instagram"
                name="website1">
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="ვებსაიტის ბმული"
                extra="ვებსაიტის ტიპი შეიძლება იყოს პერსონალური ვებსაიტი, Github, Toptal,Upwork"
                name="website2">
                <Input size="large" />
              </Form.Item>
              <Button size="large" type="primary" htmlType="submit" className="dark-button" block>დადასტურება</Button>
            </Form>
          </Col>
          <Col span={0} md={12}>
            <Row justify="center">
              <Col style={{ minWidth: 348 }}>
                <Affix offsetTop={50}>
                  <SingleUser
                    style={{ maxWidth: 348 }}
                    imageUrl={file ? URL.createObjectURL(file) : (antFormData.avatar ? antFormData.avatar : '/imgs/profile.png')}
                    Fullname={antFormData.Fullname}
                    Location={antFormData.Location}
                    directionName={'ტესტი ტექსტი'}
                    Summary={antFormData.Summary}
                    skills={antFormData.skills}
                    website1={antFormData.website1}
                    website2={antFormData.website2} />
                </Affix>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Me;