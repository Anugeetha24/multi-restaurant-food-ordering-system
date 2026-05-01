import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import AuthContext from '../context/AuthContext';

const MainLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const normalizedPath = (location.pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';
  const hideRightPanel = normalizedPath === '/checkout';

  if (loading) {
    return null;
  }

  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div 
      className="main-layout"
      style={{
        gridTemplateColumns: hideRightPanel ? '250px 1fr' : '250px 1fr 350px'
      }}
    >
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      {!hideRightPanel && <RightPanel />}
    </div>
  );
};

export default MainLayout;
