import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { isAuthenticated, authenticationPath, outlet } = props;

  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};

export default ProtectedRoute;
