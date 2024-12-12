import React from 'react';
import { Layout, ConfigProvider, Button } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { NavigationProvider, useNavigation } from './components/navigation/NavigationContext';
import Sidebar from './components/navigation/Sidebar';
import Navbar from './components/navigation/Navbar';
import { themes } from './theme';
import './app.css'
import { NextStepModalProvider } from './components/steps/NextStepContext';

const { Content } = Layout;

const NavigationLayout: React.FC = () => {
  const { isSidebar, theme } = useNavigation();

  const currentTheme = {
    token: {
      colorPrimary: themes[theme].primaryColor,
      colorBgBase: themes[theme].backgroundColor,
      colorTextBase: themes[theme].textColor,
    },
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
        <Layout style={{ backgroundColor: themes[theme].backgroundColor }}>
          <NextStepModalProvider>
            <Content style={{ padding: '20px' }}>
              <AppRoutes />
            </Content>
          </NextStepModalProvider>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <NavigationLayout />
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default App;