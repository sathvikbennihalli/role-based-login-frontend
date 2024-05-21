import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ userRole, allowedRoles }) => {
  const location = useLocation();

  if (userRole === null) {
    // Optionally, you can show a loading spinner or placeholder while fetching the role
    return <div>Loading...</div>;
  }

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  userRole: PropTypes.string.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;
