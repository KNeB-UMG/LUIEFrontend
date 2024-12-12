import React, { useState, useEffect } from 'react';
import { Menu, Layout, Switch, Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigation } from './NavigationContext';
import { themes, ThemeType } from '../../theme';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useNavigation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <Button
            style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
            onClick={showDrawer}
            type="primary"
          >
            ☰ Menu
          </Button>
          <Drawer
            title="Menu"
            placement="left"
            onClose={closeDrawer}
            visible={isDrawerVisible}
            bodyStyle={{ padding: 0 }}
            style={{ backgroundColor: themes[theme].backgroundColor }}
          >
            <Menu mode="vertical" theme={theme === 'light' ? 'light' : 'dark'} style={{ backgroundColor: themes[theme].backgroundColor }}>
              {menuItems.map(({ key, label, path }) => (
                <Menu.Item key={key} onClick={closeDrawer}>
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
          </Drawer>
        </>
      ) : (
        <Sider
          width={120}
          style={{
            backgroundColor: themes[theme].backgroundColor,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Menu mode="vertical" theme={theme === 'light' ? 'light' : 'dark'} style={{ backgroundColor: themes[theme].backgroundColor }}>
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
        </Sider>
      )}
    </>
  );
};

export default Sidebar;