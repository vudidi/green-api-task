import React, { FC } from 'react';
import { Input, Button } from '@chakra-ui/react';

export interface IDataUser {
  waInstance?: string;
  key?: string;
}

interface ILoginUser {
  onLoginUser(args: IDataUser): void;
  isError: boolean;
}

const Login: FC<ILoginUser> = (props) => {
  const { onLoginUser, isError } = props;
  const [userData, setUserData] = React.useState<IDataUser>({});

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newData = { ...userData, [e.target.name]: e.target.value };
    setUserData(newData);

    document
      .querySelector('.login__error')
      ?.classList.remove('login__error_visible');
  };

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onLoginUser({
      waInstance: userData.waInstance,
      key: userData.key,
    });
    setUserData({});
  };

  return (
    <div className="login">
      <div className="login__container">
        <span className={`login__error ${isError && 'login__error_visible'}`}>
          Такого аккаунта не существует. Проверьте корректность введенных данных
        </span>
        <h1 className="login__title">Вход в аккаунт</h1>
        <form onSubmit={handleLogin} className="login__form" id="login">
          <label className="login__form-label">
            Номер аккаунта
            <Input
              onChange={handleChange}
              name="waInstance"
              value={userData.waInstance || ''}
              className="login__form-input"
              placeholder="idInstance..."
              focusBorderColor="teal.500"
              minLength={1}
              maxLength={20}
              type="number"
              required
            />
          </label>
          <label className="login__form-label">
            Ключ доступа
            <Input
              onChange={handleChange}
              name="key"
              value={userData.key || ''}
              className="login__form-input"
              placeholder="apiTokenInstance..."
              focusBorderColor="teal.500"
              minLength={1}
              maxLength={200}
              type="text"
              required
            />
          </label>
          <Button
            type="submit"
            form="login"
            colorScheme="teal"
            className="login__form-button"
            pr={10}
            pl={10}
            mt={2}
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
