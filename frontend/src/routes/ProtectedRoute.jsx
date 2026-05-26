import { Navigate, Outlet, useOutletContext } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const context = useOutletContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user.householdId) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet context={context} />;
};

export default ProtectedRoute;
