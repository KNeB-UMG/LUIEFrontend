import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Charts = React.lazy(() => import('./pages/Charts'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const EmojiPage = React.lazy(() => import('./pages/Emoji'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProductTable = React.lazy(() => import('./pages/Table'));
const Todo = React.lazy(() => import('./pages/Todo'));
const Finish = React.lazy(() => import('./pages/Finish'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emoji" element={<EmojiPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/table" element={<ProductTable />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;