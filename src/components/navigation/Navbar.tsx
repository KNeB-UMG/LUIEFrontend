import React from 'react';
import { Menu, Layout, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigation } from './NavigationContext';
import { themes } from '../../theme';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const { theme, setTheme } = useNavigation();

  const toggleTheme = () => {
    setTheme((prevTheme: ThemeType) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Header
      style={{ backgroundColor: themes[theme].backgroundColor, width:'100%' }}
    >
      <Menu
        mode="horizontal"
      >
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
    </Header>
  );
};

export default Navbar;