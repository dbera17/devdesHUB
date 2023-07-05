import { Button, Dropdown, Layout, Menu, Space, Switch } from "antd";
import Axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { MdBrightness4, MdBrightness7, MdMenu } from 'react-icons/md';

function Header() {
  const [isProfileFetching, setIsProfileFetching] = useState(true);
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setTheme('light');
    }
    if (localStorage.getItem('jwt')) {
      Axios.get('http://localhost:1337/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }).then(({ data }) => {
        setUserData(data);
        setIsProfileFetching(false);
      }).catch(err => {
        setIsProfileFetching(false);
      })
    } else {
      setIsProfileFetching(false);
    }
  }, []);

  function switchTheme() {
    const checked = theme === 'light';
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    setTheme(checked ? 'dark' : 'light');
    if (checked) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }
  return (
    <Layout.Header className="layout-header">
      <Space style={{ justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <a>
            <img className="logo" />
          </a>
        </Link>
        <div>
          <Space className="desktop-menu">
            {!isProfileFetching && <Link href="/me" passHref>
              <Button type="text">{userData ? userData.email : 'ავტორიზაცია'}</Button>
            </Link>}
            <Link href="/terms" passHref>
              <Button type="text">ჩვენ შესახებ</Button>
            </Link>
            <Link href="/materials" passHref>
              <Button type="text">სასწავლო მასალა</Button>
            </Link>
            <Button type="text" size="large" shape="circle" className="center-icon-button" onClick={switchTheme} icon={theme === 'dark' ? <MdBrightness7 /> : <MdBrightness4 />} />
          </Space>
          <Dropdown className="mobile-menu" trigger={['click']} overlay={
            <Menu>
              {!isProfileFetching &&
                <Menu.Item>
                  <Link href="/me" passHref>
                    <a>{userData ? userData.email : 'ავტორიზაცია'}</a>
                  </Link>
                </Menu.Item>
              }
              <Menu.Item>
                <Link href="/materials" passHref>
                  <a>სასწავლო მასალა</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Button type="text" size="large" shape="circle" className="center-icon-button" onClick={switchTheme} icon={theme === 'dark' ? <MdBrightness7 /> : <MdBrightness4 />} />
              </Menu.Item>
            </Menu>
          }>
            <Button type="text" icon={<MdMenu />} />
          </Dropdown>
        </div>
      </Space>
    </Layout.Header>
  )
}

export default Header;