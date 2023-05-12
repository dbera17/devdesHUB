import { Layout as AntLayout, Row, Col, Typography, List } from 'antd';
import Layout from '../components/Layout';

const { Title, Paragraph } = Typography;

function Terms() {
  return (
    <Layout>
      <AntLayout.Content style={{ padding: '0 50px' }}>
        <Row style={{ marginTop: 64 }} justify="center">
          <Col span={24} md={12}>
            <Title level={1}>Terms and Conditions</Title>
            <Paragraph>
              Welcome to DevDesHub! These terms and conditions outline the rules and regulations for the use of DevDesHub's Website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use DevDesHub's website if you do not accept all of the terms and conditions stated on this page.
            </Paragraph>
            <Title level={2}>License</Title>
            <Paragraph>
              Unless otherwise stated, DevDesHub and/or its licensors own the intellectual property rights for all material on DevDesHub. All intellectual property rights are reserved. You may view and/or print pages from https://www.devdeshub.com for your own personal use subject to restrictions set in these terms and conditions.
            </Paragraph>
            <List
              header={<Title level={3}>You must not:</Title>}
              bordered
              dataSource={[
                'Republish material from DevDesHub',
                'Sell, rent or sub-license material from DevDesHub',
                'Reproduce, duplicate or copy material from DevDesHub'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Title level={2}>Hyperlinking to our Content</Title>
            <Paragraph>
              Organizations may link to our home page, to publications or to other Web site information so long as the link:.
            </Paragraph>
            <List
              header={<Title level={3}>You must not:</Title>}
              bordered
              dataSource={[
                'Is not in any way misleading',
                'Does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services',
                'Fits within the context of the linking partys site'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            {/* Continue with your terms and conditions... */}
          </Col>
          <Col span={24} md={12}>
            {/* You might want to add additional information or images here */}
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  )
}

export default Terms;
