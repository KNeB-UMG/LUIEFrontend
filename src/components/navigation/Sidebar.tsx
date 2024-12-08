import React from 'react';
import { Menu, Layout, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigation } from './NavigationContext';
import { themes, ThemeType } from '../../theme';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useNavigation();

  const toggleTheme = () => {
    setTheme((prevTheme: ThemeType) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Sider
      width={200}
      style={{
        backgroundColor: themes[theme].primaryColor,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Menu mode="vertical" theme={theme === 'light' ? 'light' : 'dark'}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/blog">Blog</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/emoji">Emotki</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/table">Table</Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/todo">Todo</Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Link to="/charts">Charts</Link>
        </Menu.Item>
        <Menu.Item key="9">
          <div style={{ textAlign: 'center' }}>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
        </div>
        </Menu.Item>
      </Menu>
      
    </Sider>
  );
};

export default Sidebar;