import { Layout as AntLayout, message, Space, Spin } from "antd";
import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";

function Google() {
  const router = useRouter();
  const {
    provider,
    access_token
  } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (access_token && provider) {
      Axios.get(`http://localhost:1337/auth/${provider}/callback`, {
        params: {
          access_token: access_token
        }
      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt);
        router.replace('/me');
      }).catch(({response}) => {
        message.error(response?.data?.message[0]?.messages[0]?.message ?? 'შეცდომა ავტორიზაციისას');
        router.replace('/login');
      })
    }
  }, [access_token]);
  return (
    <Layout>
      <AntLayout.Content>
        <Space direction="vertical" align="center" style={{ width: '100%' }}><Spin /></Space>
      </AntLayout.Content>
    </Layout>
  )
}

export default Google;