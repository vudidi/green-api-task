import React, { FC } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { ProtectedRouteProps } from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Login from '../Login/Login';

const App: FC = () => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoginError, setLoginError] = React.useState(false);
  const navigate = useNavigate();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isAuthenticated,
    authenticationPath: '/login',
  };

  // Вход в аккаунт
  const loginUser = (data: { waInstance?: string; key?: string }) => {
    setLoginError(false);
    return axios
      .get(
        `https://api.green-api.com/waInstance${data.waInstance}/getSettings/${data.key}`
      )
      .then((res) => {
        setCurrentUser({
          waInstance: data.waInstance,
          key: data.key,
        });
        setAuthenticated(true);
        navigate('/');
        console.log('SUCCESS');
      })
      .catch((err) => {
        setLoginError(true);
        setAuthenticated(false);
        console.log('ERROR');
      });
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Main />}
              />
            }
          />
          <Route
            path="/login"
            element={<Login onLoginUser={loginUser} isError={isLoginError} />}
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
