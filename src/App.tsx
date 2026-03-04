import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import BackendDocs from './components/BackendDocs';
import FrontendDocs from './components/FrontendDocs';
import DesktopDocs from './components/DesktopDocs';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  const styles = {
    layout: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      color: '#cccccc',
      fontFamily: "'Segoe UI', sans-serif",
      overflow: 'hidden',
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#252526',
      borderRight: '1px solid #333333',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    sidebarHeader: {
      padding: '10px 20px',
      fontSize: '0.7rem',
      textTransform: 'uppercase' as const,
      color: '#858585',
      letterSpacing: '1px',
    },
    navItem: (path: string) => ({
      padding: '8px 20px',
      textDecoration: 'none',
      color: location.pathname === path ? '#ffffff' : '#858585',
      backgroundColor: location.pathname === path ? '#37373d' : 'transparent',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'background 0.2s',
    }),
    main: {
      flex: 1,
      overflowY: 'auto' as const,
      backgroundColor: '#1e1e1e',
    }
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Explorer: Project</div>
        <Link to="/" style={styles.navItem('/')}>🏠 Home</Link>
        <Link to="/frontend" style={styles.navItem('/frontend')}>🎨 Frontend</Link>
        <Link to="/backend" style={styles.navItem('/backend')}>⚡ Backend</Link>
        <Link to="/asztali" style={styles.navItem('/asztali')}>💻 Desktop App</Link>
      </aside>
      
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/frontend" element={<FrontendDocs />} />
          <Route path="/backend" element={<BackendDocs />} />
          <Route path="/asztali" element={<DesktopDocs />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;