// App.jsx
import { Routes, Route } from 'react-router-dom'
import Nav from './Nav.jsx'
import Dashboard from './paginas/Dashboard/Dashboard.jsx'
import Staff from './paginas/Staff/Staff.jsx'
import Menu from './paginas/Menu/Menu.jsx'
import Reservas from './paginas/Reservas/Reservas.jsx'

import './nav.css'

function App() {
  return (
    <div className="app-container">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gestion" element={<Staff />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservas" element={<Reservas />} />
        
        </Routes>
      </main>
    </div>
  )
}

export default App