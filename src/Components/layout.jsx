import React from 'react'
import Wheel from './wheel';

const Layout = ({ children }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎡 React Spinner Game</h1>
      <div style={{ margin: '2rem auto', maxWidth: '400px' }}>
        <Wheel />
      </div>
      {children}
    </div>
  );
};

export default Layout;