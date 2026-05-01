import LandingNavbar from './LandingNavbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <LandingNavbar />
      <div className="public-content">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
