import { Layout as AntLayout, Spin, Button, Tabs } from 'antd';
import Layout from '../components/Layout';

function Me() {
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
              {/* TODO */}
              </Tabs.TabPane>
            </Tabs>
          )}
      </AntLayout.Content>
    </Layout>
  )
}