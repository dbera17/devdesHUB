import { Button, Layout, Space } from "antd";
import Link from 'next/link';
import { useState } from "react";
import { MdBrightness4, MdBrightness7 } from 'react-icons/md';

function Header() {
  const [theme, setTheme] = useState('dark');

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
            LOGO
        </Link>
        <div>
          <Space className="desktop-menu">
            <Link href="/login" passHref>
              <Button type="text">ავტორიზაცია</Button>
            </Link>
            <Button type="text" size="large" shape="circle" className="center-icon-button" onClick={switchTheme} icon={theme === 'dark' ? <MdBrightness7/> : <MdBrightness4/>}/>
          </Space>
        </div>
      </Space>
    </Layout.Header>
  )
}

export default Header;