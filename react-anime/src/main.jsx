import React from 'react';
import ReactDOM from 'react-dom/client';  // Import ReactDOM untuk React 18+
import App from './App'; // Mengimpor komponen App utama
import './index.css'; // Mengimpor styling global

// Mendapatkan elemen root dari index.html dan menyiapkan rendering aplikasi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Memanggil komponen App untuk dirender */}
  </React.StrictMode>
);
