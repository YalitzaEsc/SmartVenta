// App.jsx
import { Routes, Route } from 'react-router-dom'
import Dashboard from './paginas/Dashboard/Dashboard.jsx'
import Staff from './paginas/Staff/Staff.jsx'
import Menu from './paginas/Menu/Menu.jsx'
import Reservas from './paginas/Reservas/Reservas.jsx'
import Inventario from './paginas/Inventario/Inventario.jsx'
import Notificationes from './paginas/Notificaciones/Notificaciones.jsx'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.jsx'

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gestion" element={<Staff />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/notificaciones" element={<Notificationes />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}



const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Solo un dia
        </h2>
        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-gray-900 bg-pink-300 rounded-lg hover:bg-pink-400 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
export default App