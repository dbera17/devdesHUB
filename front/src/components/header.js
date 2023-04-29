import { Button, Dropdown, Layout, Menu, Space } from "antd";
import { MdBrightness4, MdBrightness7, MdMenu } from 'react-icons/md';

function Header() {
  return (
    <Layout.Header className="layout-header">
      <Space style={{ justifyContent: "space-between" }}>
        <a href="/" passHref>
          <a>
            <img className="logo" />
          </a>
        </a>
        <div>
          <Space className="desktop-menu">
            {!isProfileFetching && <a href="/me" passHref>
              <Button type="text">{userData ? userData.email : 'ავტორიზაცია'}</Button>
            </a>}
            <a href="/terms" passHref>
              <Button type="text">ჩვენ შესახებ</Button>
            </a>
            <Button type="text">დიზაინერებისთვის</Button>
            <Button type="text" target="_blank" >კონტაქტი</Button>
            <Button type="text" size="large" shape="circle" className="center-icon-button" icon={theme === 'dark' ? <MdBrightness7/> : <MdBrightness4/>}/>
          </Space>
          <Dropdown className="mobile-menu" trigger={['click']} overlay={
            <Menu>
              
              <Menu.Item>
                <a >დიზაინერებისთვის</a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank">კონტაქტი</a>
              </Menu.Item>
              <Menu.Item>
              {/* <Switch onChange={onThemeSwitch} checked={theme === 'dark'}></Switch> */}
              <Button type="text" size="large" shape="circle" className="center-icon-button" icon={theme === 'dark' ? <MdBrightness7/> : <MdBrightness4/>}/>
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