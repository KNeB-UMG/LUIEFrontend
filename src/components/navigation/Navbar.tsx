import React from 'react';
import { Menu, Layout, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigation } from './NavigationContext';
import { themes, ThemeType } from '../../theme';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const { theme, setTheme } = useNavigation();

  const toggleTheme = () => {
    setTheme((prevTheme: ThemeType) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isDevelopMode = localStorage.getItem('developMode') === 'true';

  const menuItems = [
    { key: '1', label: 'Home', path: '/' },
    { key: '2', label: 'Blog', path: '/blog' },
    { key: '3', label: 'Projects', path: '/projects' },
    { key: '4', label: 'Dashboard', path: '/dashboard' },
    { key: '5', label: 'Emotki', path: '/emoji' },
    { key: '6', label: 'Table', path: '/table' },
    { key: '7', label: 'Todo', path: '/todo' },
    { key: '8', label: 'Charts', path: '/charts' },
  ];

  return (
    <Header style={{ backgroundColor: themes[theme].backgroundColor, width: '100%' }}>
      <Menu mode="horizontal">
        {menuItems.map(({ key, label, path }) => (
          <Menu.Item key={key}>
            {isDevelopMode ? (
              <Link to={path}>{label}</Link>
            ) : (
              <span>{label}</span>
            )}
          </Menu.Item>
        ))}
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
