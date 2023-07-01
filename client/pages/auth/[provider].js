import { Layout as AntLayout, Space, Spin } from "antd";
import { useRouter } from "next/router";

function Google() {
  const router = useRouter();
  console.log(router.query);
 
  return (
    <Layout>
      <AntLayout.Content>
        <Space direction="vertical" align="center" style={{ width: '100%' }}><Spin /></Space>
      </AntLayout.Content>
    </Layout>
  )
}

export default Google;