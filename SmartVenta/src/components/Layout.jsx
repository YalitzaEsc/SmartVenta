// Layout.jsx
import { Outlet } from 'react-router-dom';
import Nav from '@/components/Nav';

function Layout() {
    return (
      <div className="flex flex-col md:flex-row ">
        <Nav />
        <main className=" md:ml-[170px] flex-1 ">
          <Outlet /> 
        </main>
      </div>
    );
  }

export default Layout;
