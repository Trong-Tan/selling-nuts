import { BookA, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-[729px]  p-5 bg-[#141C2F] text-white shadow-md">
      <h2 className="text-2xl font-bold text-center py-4">Admin Panel</h2>
      <nav className="mt-4">
        <ul className='flex flex-col gap-5'>
          <li className='flex hover:bg-gray-700 hover:rounded-lg'>
            <NavLink to="/" className="block p-3 gap-3"><LayoutDashboard />   </NavLink>
            <span className='mt-3'>Dashboard</span></li>
          <li className='flex hover:bg-gray-700 hover:rounded-lg'>
            <NavLink to="/settings" className="block p-3 gap-3"><Settings />   </NavLink>
            <span className='mt-3'>Settings</span></li>
          <li className='flex hover:bg-gray-700 hover:rounded-lg'>
            <NavLink to="/reports" className="block p-3 gap-3"><BookA />  </NavLink>
            <span className='mt-3'>Reports</span> 
          </li>
          <li className='flex hover:bg-gray-700 hover:rounded-lg'>
            <NavLink to="/" className="block p-3 gap-3"><LogOut /> </NavLink>
            <span className='mt-3'>Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
