import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: '60px 40px',
      maxWidth: '1200px',
    },
    title: {
      color: '#ffffff',
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    subtitle: {
      color: '#858585',
      fontSize: '1.1rem',
      marginBottom: '50px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#252526',
      border: '1px solid #333333',
      padding: '30px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    },
    icon: {
      fontSize: '2rem',
      display: 'block',
      marginBottom: '15px',
    },
    cardTitle: {
      color: '#ffffff',
      fontSize: '1.3rem',
      marginBottom: '10px',
    },
    cardText: {
      color: '#858585',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      marginBottom: '20px',
    },
    btn: {
      backgroundColor: '#007acc',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '2px',
      cursor: 'pointer',
      width: '100%',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vizsgaremek 2026</h1>
      <p style={styles.subtitle}>Válassz egy szekciót a fejlesztői dokumentáció felfedezéséhez.</p>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/frontend')} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#007acc'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333333'}>
          <span style={styles.icon}>🎨</span>
          <h2 style={styles.cardTitle}>Webes Frontend</h2>
          <p style={styles.cardText}>React, TypeScript és Modern UI komponensek dokumentációja.</p>
          <button style={styles.btn}>Megnyitás</button>
        </div>

        <div style={styles.card} onClick={() => navigate('/backend')} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#007acc'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333333'}>
          <span style={styles.icon}>⚡</span>
          <h2 style={styles.cardTitle}>Webes Backend</h2>
          <p style={styles.cardText}>NestJS API, Prisma ORM és adatbázis séma részletei.</p>
          <button style={styles.btn}>Megnyitás</button>
        </div>

        <div style={styles.card} onClick={() => navigate('/asztali')} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#007acc'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333333'}>
          <span style={styles.icon}>💻</span>
          <h2 style={styles.cardTitle}>Asztali Alkalmazás</h2>
          <p style={styles.cardText}>C# .NET WPF architektúra és statisztikai számítások.</p>
          <button style={styles.btn}>Megnyitás</button>
        </div>
      </div>
    </div>
  );
};

export default Home;