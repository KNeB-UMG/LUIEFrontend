import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Charts from './pages/Charts';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Todo from './pages/Todo';
import ProductTable from './pages/Table';
import EmojiPage from './pages/Emoji';

// /:navigation - parameter specifying the type of navigation on the page (navbar or sidebar)

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/emoji" element={<EmojiPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/table" element={<ProductTable />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;