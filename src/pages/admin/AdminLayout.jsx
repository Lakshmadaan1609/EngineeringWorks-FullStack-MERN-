import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      {/* Can add Admin Navbar or Sidebar here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 